const extend = require("js-base/core/extend");
const SpriteView = require("sf-extension-spriteview");

const ActionKeyType = require("sf-core/ui/actionkeytype");
const Timer         = require("sf-core/global/timer");
const Color         = require('sf-core/ui/color');
const FlexLayout    = require('sf-core/ui/flexlayout');
const Font          = require('sf-core/ui/font');
const Image         = require('sf-core/ui/image');
const ImageView     = require('sf-core/ui/imageview');
const PageConstants = require('pages/PageConstants');
const Router        = require("sf-core/ui/router");
const AlertView     = require('sf-core/ui/alertview');
const Network       = require('sf-core/device/network');
const Application   = require("sf-core/application");

const Config = require("../config.js");

// Get generetad UI code
var PageLoginDesign = require("../ui/ui_pgLogin");
const Animator = require('sf-core/ui/animator');

const LoginCredentials = {
    email: "test",
    password: "password"
};

const PageLogin = extend(PageLoginDesign)(
    function(_super) {
        var self = this;
        _super(self);
        var temp = this.onLoad;
        var uiComponents = this;

        this.onLoad = function(){
            temp();
            
            setFacebookLogin(uiComponents);

            var imageView = new ImageView();
            imageView.positionType = FlexLayout.PositionType.ABSOLUTE;
            imageView.height = 50;
            imageView.right = 0;
            imageView.top = 40;
            imageView.left = 0;
            imageView.id = 100;
            imageView.touchEnabled = false;
            imageView.alpha = 1;

            uiComponents.bottomLayout.addChild(imageView);
            uiComponents.loginButton.alpha = 0;
            uiComponents.inputLayout.height = 0;
            uiComponents.inputLayout.alpha = 0;
            uiComponents.passwordTextBox.isPassword = true;
            this.layout.applyLayout();
        }

        setBackgroundSprite.call(this, uiComponents.spriteLayout);
        setLoginButton.call(this, uiComponents);
                
        this.onShow = function() {
            uiComponents.emailTextBox.hint = "Email Address";
            uiComponents.emailTextBox.actionKeyType = ActionKeyType.NEXT;
            uiComponents.emailTextBox.onActionButtonPress = function(e) {
                uiComponents.passwordTextBox.showKeyboard();
            }
            uiComponents.passwordTextBox.hint = "Password";
            uiComponents.passwordTextBox.actionKeyType = ActionKeyType.GO;
            uiComponents.passwordTextBox.onActionButtonPress = function(e) {
                uiComponents.passwordTextBox.hideKeyboard();
                login(uiComponents);
            }
            uiComponents.emailTextBox.ios.clearButtonEnabled = true; //TODO: use the extension
            uiComponents.passwordTextBox.ios.clearButtonEnabled = true;
            uiComponents.emailTextBox.text = ""; // TODO: remove after AND-2785
            uiComponents.passwordTextBox.text = ""; // TODO: remove after AND-2785
            
            this.birdSprite.play(3000);
            restartPage(this,uiComponents);
            this.headerBar.visible = false;
            this.statusBar.visible = false;
            
            checkInternet();
            // TODO: uncomment after AND-2806
            // Network.onConnectionTypeChanged = function(connectionType) {
            //     console.log("connection type");
            //     checkInternet();
            // };
        };
});

function setFacebookLogin(page) {
    page.facebookButton.onPress = function() {
        const Facebook = require("sf-plugin-facebook");
        Facebook.applicationId   = Config.FACEBOOK_APPLICATION_ID; 
        Facebook.applicationName = Config.FACEBOOK_APPLICATION_NAME;

        if (Facebook.AccessToken.getCurrentToken()) {
            loading(page);
        } else {
            Facebook.logInWithReadPermissions({
                page: page, 
                permissions: ['public_profile'],
                onSuccess: function(data){
                    global.facebookEnabled = true;
                    loading(page);
                },
                onFailure: function(e){
                    displayFacebookAlert(e);
                },
                onCancel: function(){}
            });
        }
    };
}

function displayFacebookAlert(e) {
    var alertView = new AlertView({
        title: "Login Fail",
        message: "Failed to login via Facebook: " + e
    });
    alertView.addButton({
        index: AlertView.ButtonType.POSITIVE,
        text: "OK"
    });
    alertView.show();
}

function setBackgroundSprite(spriteLayout) {
    this.birdSprite = new SpriteView({
        top:0,bottom:0,left:0,right:0,
        positionType : FlexLayout.PositionType.ABSOLUTE,
        imageFillType: ImageView.FillType.STRETCH
    });
    spriteLayout.addChild(this.birdSprite);
    
    this.birdSprite.setSprite({
        sheet: Image.createFromFile("images://nature3.png"),
        frameX: 9,
        frameY: 6,
        frameCount: 54
    });
};

function setLoginButton(uiComponents) {
    uiComponents.loginButton.onPress = function() {
        login(uiComponents);
    }.bind(this);
};

function login(uiComponents) {
    if (uiComponents.passwordTextBox.text.toLowerCase() === LoginCredentials.password.toLowerCase()
            && uiComponents.emailTextBox.text.toLowerCase()    === LoginCredentials.email.toLowerCase()) {
        loading(uiComponents);
    } else {
        var alertView = new AlertView({
            title: "Invalid Credentials",
            message: "Email: test\nPassword: password"
        });
        alertView.addButton({
            index: AlertView.ButtonType.POSITIVE,
            text: "OK"
        });
        alertView.show();
    }
}

function rotateImage(imageView,page){
    var image;
    if(Device.deviceOS == "Android"){
        const AndroidUnitConverter = require('sf-core/util/Android/unitconverter');
        var pixel = AndroidUnitConverter.dpToPixel(50);
        image = Image.createFromFile("images://loading.png").resize(pixel,pixel);
    }else{
        image = Image.createFromFile("images://loading.png").resize(50,50);
    }
    
    var counter = 0;
    var myTimer = Timer.setInterval({
                task: function(){
                    counter++;
                    imageView.image = image.rotate(counter*7);
                    
                    if(counter == 100){
                        Timer.clearTimer(myTimer);
                        Router.go(PageConstants.PAGE_CATEGORIES, null, true);
                        page.birdSprite.stop();
                    }
                },
                delay: 20
            });
}

function loading(uiComponents){
    var imageView = uiComponents.bottomLayout.findChildById(100);

    uiComponents.loginButton.text = "";
    uiComponents.facebookButton.text = "";
    
    var layout;
    if(Device.deviceOS == 'Android'){
       layout = uiComponents.bottomLayout;
    }else{
       layout = uiComponents.layout;
    }
    
     Animator.animate(layout, 100, function() {
            uiComponents.loginButton.width = 50;
            uiComponents.facebookButton.width = 50;
            if(Device.deviceOS == 'Android'){

                }else{
                    uiComponents.loginButton.alpha = 0.2;
                    uiComponents.facebookButton.alpha = 0.2;
                }
            
        }).complete(function() {
            uiComponents.loginButton.alpha = 0;
            uiComponents.facebookButton.alpha = 0;
            rotateImage(imageView,uiComponents);
            Animator.animate(uiComponents.layout, 300, function() {
                uiComponents.inputLayout.height = 0;
                imageView.alpha = 1;
                if(Device.deviceOS == 'Android'){

                }else{
                    
                    uiComponents.inputLayout.alpha = 0;
                }
            }).complete(function() {
                
            });
        });
}

function rotateImage(imageView,page){
    var image;
    if(Device.deviceOS == "Android"){
        const AndroidUnitConverter = require('sf-core/util/Android/unitconverter');
        var pixel = AndroidUnitConverter.dpToPixel(50);
        image = Image.createFromFile("images://loading.png").resize(pixel,pixel);
    }else{
        image = Image.createFromFile("images://loading.png").resize(50,50);
    }
    
    var counter = 0;
    var myTimer = Timer.setInterval({
                task: function(){
                    counter++;
                    imageView.image = image.rotate(counter*7);
                    
                    if(counter == 100){
                        Timer.clearTimer(myTimer);
                        Router.go(PageConstants.PAGE_CATEGORIES, null, true);
                        page.birdSprite.stop();
                    }
                },
                delay: 20
            });
}

function restartPage(page,uiComponents){
    if (uiComponents.inputLayout.height == 150){
        return;
    }
    var imageView = uiComponents.bottomLayout.findChildById(100);

    uiComponents.loginButton.text = "";
    uiComponents.facebookButton.text = "";
    uiComponents.facebookButton.width = 0;
    
    var layout;
    if(Device.deviceOS == 'Android'){
       layout = uiComponents.bottomLayout;
    }else{
       layout = page.layout;
    }
    
         Animator.animate(page.layout, 300, function() {
                uiComponents.inputLayout.height = 150;
                imageView.alpha = 0.2;
                uiComponents.inputLayout.alpha = 1;
            }).complete(function() {
                imageView.alpha = 0;
                Animator.animate(layout, 100, function() {
                    uiComponents.loginButton.width = 180;
                    uiComponents.loginButton.alpha = 1;

                    uiComponents.facebookButton.width = 180;
                    uiComponents.facebookButton.alpha = 1;
                }).complete(function() {
                    uiComponents.loginButton.text = "LOG IN";
                    uiComponents.facebookButton.text = "Log in with Facebook";
                });
            });
}

function checkInternet() {
    if (Network.connectionType == Network.ConnectionType.None) {
        var connectionAlert = new AlertView({
            title: "No Internet",
            message: "Sparrow requires internet to show its content"
        });
        connectionAlert.addButton({
            index: AlertView.ButtonType.POSITIVE,
            text: "Okay",
            onClick: function() {
                Application.exit();
            }
        });
        connectionAlert.show();
    }
}

module && (module.exports = PageLogin);