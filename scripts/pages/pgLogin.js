/*global lang*/

const extend = require("js-base/core/extend");
const SpriteView = require("sf-extension-spriteview");
const ActionKeyType = require("sf-core/ui/actionkeytype");
const Timer = require("sf-core/global/timer");
const FlexLayout = require('sf-core/ui/flexlayout');
const Image = require('sf-core/ui/image');
const ImageView = require('sf-core/ui/imageview');
const PageConstants = require('pages/PageConstants');
const AlertView = require('sf-core/ui/alertview');
const Network = require('sf-core/device/network');
const Application = require("sf-core/application");
const System = require('sf-core/device/system');
const Animator = require('sf-core/ui/animator');
const pgLoginDesign = require("../ui/ui_pgLogin");
const rau = require("sf-extension-utils").rau;
const fingerprint = require("sf-extension-utils").fingerprint;
var Facebook = {};
try {
    Facebook = require("sf-plugin-facebook");
    Facebook.applicationId = "148225102547918";
    Facebook.packageName = "sparrow";
}
catch (ex) {
    //emulator, or missing plugin
    Facebook.logInWithReadPermissions = () => {
        console.log("Facebook login not supported");
    };
}

var parentOnShow;
var parentOnLoad;
const pgLogin = extend(pgLoginDesign)(
    // Constructor
    function(_super) {
        _super(this);
        parentOnShow = this.onShow.bind(this);
        parentOnLoad = this.onLoad.bind(this);
        this.onShow = onShow.bind(this);
        this.onLoad = onLoad.bind(this);
        setBackgroundSprite.call(this, this.spriteLayout);
    });

function onShow(parameters) {
    parentOnShow();

    initTextFields.call(this);

    this.bottomlayout.findChildById(100).visible = false; //loading image

    this.birdSprite.play(3000);

    restartPage(this);
    this.headerBar.visible = false;
    this.statusBar.visible = false;

    checkInternet();
    rau.checkUpdate({
        url: "https://smf.to/mcommerce"
    });
}

function onLoad() {
    parentOnLoad();
    const page = this;
    this.btnSignIn.inenrButton.text = lang["pgLogin.signin"];
    this.facebookText.text = lang["pgLogin.facebookSignin"];
    this.btnSignIn.alpha = 0;
    this.inputLayout.height = 0;
    this.inputLayout.alpha = 0;
    this.layout.applyLayout();
    this.btnSignIn.inenrButton.onPress = function() {
        this.btnSignIn.inenrButton.enabled = false;
        login(this);
    }.bind(this);

    var imageView = new ImageView();
    imageView.positionType = FlexLayout.PositionType.ABSOLUTE;
    imageView.height = 50;
    imageView.right = 0;
    imageView.top = 40;
    imageView.left = 0;
    imageView.id = 100;
    imageView.touchEnabled = false;
    imageView.alpha = 1;
    this.bottomlayout.addChild(imageView);

    this.facebookBtnfl.onTouch = onPress_FacebookBtn.bind(this);

    this.imageviewLogo.onTouchEnded = function() {
        this.emailTextBox.text = "anthony.bell@smartcompany.email";
        this.passwordTextBox.text = "123456";
    }.bind(this);

    fingerprint.init({
        userNameTextBox: this.emailTextBox,
        passwordTextBox: this.passwordTextBox,
        autoLogin: true,
        callback: function(err, fingerprintResult) {
            var password;
            if (err) {
                password = page.passwordTextBox.text;
            }
            else {
                password = fingerprintResult.password;
            }
            if (!password) {
                page.btnSignIn.inenrButton.enabled = true;
                return alert(lang["pgLogin.inputs.password.error"]);
            }
            loading(page, page.emailTextBox.text, password, function(err) {
                page.btnSignIn.inenrButton.enabled = true;
                if (err)
                    return alert(lang.loginErrorInvalid, lang.loginErrorTitle);
                fingerprintResult && fingerprintResult.success(); //Important!
                page.router.push("/stack/categories");
                page.passwordTextBox.text = "";
            });
        }
    });
}

function initTextFields() {
    this.emailTextBox.hint = lang["pgLogin.username"];
    this.emailTextBox.actionKeyType = ActionKeyType.NEXT;
    this.emailTextBox.onActionButtonPress = function(e) {
        this.passwordTextBox.requestFocus();
    }.bind(this);

    this.passwordTextBox.hint = lang["pgLogin.password"];
    this.passwordTextBox.actionKeyType = ActionKeyType.GO;
    this.passwordTextBox.onActionButtonPress = function(e) {
        this.passwordTextBox.removeFocus();
        login(this);
    }.bind(this);
    this.emailTextBox.ios.clearButtonEnabled = true;
    this.passwordTextBox.ios.clearButtonEnabled = true;
    this.emailTextBox.text = "";
    this.passwordTextBox.text = "";
}

function setBackgroundSprite(spriteLayout) {
    this.birdSprite = new SpriteView({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        positionType: FlexLayout.PositionType.ABSOLUTE,
        imageFillType: ImageView.FillType.STRETCH
    });
    spriteLayout.addChild(this.birdSprite);

    this.birdSprite.setSprite({
        sheet: Image.createFromFile("images://nature3.png"),
        frameX: 9,
        frameY: 6,
        frameCount: 54
    });
}

function login(page) {
    if (!page.emailTextBox.text) {
        page.btnSignIn.inenrButton.enabled = true;
        return alert(lang["pgLogin.inputs.username.error"]);
    }

    fingerprint.loginWithFingerprint();
}

function loading(page, username, password, callback) {
    page.btnSignIn.inenrButton.text = "";
    var layout;
    if (System.OS == 'Android') {
        layout = page.mainlayout;
    }
    else {
        layout = page.layout;
    }

    Animator.animate(layout, 100, function() {

        page.btnSignIn.width = 50;
        if (System.OS == 'Android') {

        }
        else {
            page.btnSignIn.alpha = 0.2;
        }

    }).complete(function() {
        var imageView = page.bottomlayout.findChildById(100);
        imageView.visible = true; //loading image

        page.btnSignIn.alpha = 0;
        //this.facebookButton.alpha = 0;
        rotateImage(imageView, page, callback);
        Animator.animate(page.layout, 300, function() {
            page.inputLayout.height = 0;
            page.loadingImage.alpha = 1;
            if (System.OS == 'Android') {

            }
            else {
                page.inputLayout.alpha = 0;
            }
        }).complete(function() {

        });
    });
}

function rotateImage(imageView, page, callback) {
    var image;
    if (System.OS == "Android") {
        const AndroidUnitConverter = require('sf-core/util/Android/unitconverter');
        var pixel = AndroidUnitConverter.dpToPixel(50);
        image = Image.createFromFile("images://loading.png").resize(pixel, pixel);
    }
    else {
        image = Image.createFromFile("images://loading.png").resize(50, 50);
    }

    var counter = 0;
    var myTimer = Timer.setInterval({
        task: function() {
            counter++;
            imageView.image = image.rotate(counter * 7);

            if (counter == 100) {
                Timer.clearTimer(myTimer);
                callback && callback();
                page.birdSprite.stop();
            }
        },
        delay: 20
    });
}

function restartPage(page) {
    if (page.inputLayout.height == 150) {
        return;
    }
    page.btnSignIn.inenrButton.text = "";
    //uiComponents.facebookButton.text = "";
    //uiComponents.facebookButton.width = 0;

    var layout;
    if (System.OS == 'Android') {
        layout = page.mainlayout;
    }
    else {
        layout = page.layout;
    }


    Animator.animate(layout, 300, function() {
        page.inputLayout.height = 150;
        page.loadingImage.alpha = 0.2;
        page.inputLayout.alpha = 1;
    }).complete(function() {
        page.loadingImage.alpha = 0;
        page.btnSignIn.width = 180;
        page.btnSignIn.alpha = 1;
        page.btnSignIn.inenrButton.text = lang["pgLogin.signin"];

        // Animator.animate(layout, 100, function() {
        //     page.btnSignIn.width = 180;
        //     page.btnSignIn.alpha = 1;

        //     //uiComponents.facebookButton.width = 180;
        //     //uiComponents.facebookButton.alpha = 1;
        // }).complete(function() {
        //     page.btnSignIn.inenrButton.text = lang["pgLogin.signin"];
        //     //this.facebookButton.text = "Log in with Facebook";
        // });
    });
}

function checkInternet() {
    if (Network.connectionType == Network.ConnectionType.None) {
        alert({
            title: "No Internet",
            message: "Sparrow requires internet to show its content",
            buttons: [{
                index: AlertView.ButtonType.POSITIVE,
                text: lang.ok,
                onClick: function() {
                    Application.exit();
                }
            }]
        });
    }
}
var grantedReadPermissions, grantedPublishPermissions;
var deniedReadPermissions, deniedPublishPermissions;
var accessToken;

function onPress_FacebookBtn() {
    var page = this;
    Facebook.logInWithReadPermissions({
        page: page,
        permissions: ['user_friends'],
        onSuccess: function(data) {
            grantedReadPermissions = data.grantedPermissions;
            deniedReadPermissions = data.deniedPermissions;
            accessToken = data.accessToken;
            global.facebookEnabled = true;
            page.router.push("/stack/categories");
        },
        onFailure: function(e) {
            alert("Failed to login: " + e);
        },
        onCancel: function() {
            //alert("Login canceled");
        }
    });
}

module && (module.exports = pgLogin);
