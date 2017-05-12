const extend = require("js-base/core/extend");

const Color         = require('sf-core/ui/color');
const ListView      = require('sf-core/ui/listview');
const ListViewItem  = require('sf-core/ui/listviewitem');
const Label         = require('sf-core/ui/label');
const FlexLayout    = require('sf-core/ui/flexlayout');
const TextAlignment = require('sf-core/ui/textalignment');
const Font          = require('sf-core/ui/font');
const Image         = require('sf-core/ui/image');
const ImageView     = require('sf-core/ui/imageview');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Router        = require("sf-core/ui/router");
const PageConstants = require("pages/PageConstants");
const KeyboardType  = require('sf-core/ui/keyboardtype');
const AlertView = require('sf-core/ui/alertview');

// Get generetad UI code
var PagePaymentDesign = require("../ui/ui_pgPayment");
var ShoppingCart = require("../ShoppingCart");

const credits = [
    {
        name: "American Express",
        src: "images://icon_payment_amex.png",
        iin: ["34", "37"]
    },
    {
        name: "Diners Club",
        src: "images://icon_payment_diners.png",
        iin: ["300", "301", "302", "303", "304", "305", "36", "54"]
    },
    {
        name: "Discover",
        src: "images://icon_payment_discover.png",
        iin: ["6011", "622", "622", "644", "645", "646", "647", "648", "649", "65"]
    },
    {
        name: "JCB",
        src: "images://icon_payment_jcb.png",
        iin: ["35"]
    },
    {
        name: "Laser",
        src: "images://icon_payment_laser.png",
        iin: ["6304", "6706", "6771", "6709"]
    },
    {
        name: "Maestro",
        src: "images://icon_payment_maestro.png",
        iin: ["5018", "5020", "5038", "5893", "6304", "6759", "6761", "6762", "6763"]
    },
    {
        name: "MasterCard",
        src: "images://icon_payment_mastercard.png",
        iin: ["51", "52", "53", "54", "55"]
    },
    {
        name: "Visa",
        src: "images://icon_payment_visa.png",
        iin: ["4"]
    },
];

const PagePayment = extend(PagePaymentDesign)(
    function(_super) {
        var self = this;
        _super(self);
        this._superOnLoad = this.onLoad;
        var uiComponents = this;
               
        this.onShow = onShow.bind(this);
        this.onLoad = onLoad.bind(this);
 
        initHeaderBar(this.headerBar);
        initBackButton(self);
});

function initHeaderBar(headerBar) {
    headerBar.title = lang["pgPayment.title"];
     var leftItem = new HeaderBarItem({
        color: Color.WHITE,
        text: "",
        image: Image.createFromFile("images://arrow_left.png"),
        onPress: function() {
            Router.goBack();
        }
    });
    headerBar.setLeftItem(leftItem);
};

function onLoad() {
    this._superOnLoad();
    
    var uiComponents = this;
    setupTextBoxes(uiComponents);
    setupCardNumberBox(uiComponents);
};

function setupTextBoxes(uiComponents) {
    uiComponents.textboxCardNumber.hint = "XXXX";
    uiComponents.textboxCardNumber.text = "";
    uiComponents.textboxCardNumber.ios.clearButtonEnabled = true;
    uiComponents.textboxCardNumber.keyboardType = KeyboardType.NUMBER;
    
    uiComponents.textboxExpireDate.hint = "Expire Date";
    uiComponents.textboxExpireDate.text = "";
    uiComponents.textboxExpireDate.ios.clearButtonEnabled = true;
    
    uiComponents.textboxSecurity.hint = "Security Code";
    uiComponents.textboxSecurity.text = "";
    uiComponents.textboxSecurity.ios.clearButtonEnabled = true;
    uiComponents.textboxSecurity.keyboardType = KeyboardType.NUMBER;

    uiComponents.textboxCardOwner.hint = "Name on Card";
    uiComponents.textboxCardOwner.text = "";
    uiComponents.textboxCardOwner.ios.clearButtonEnabled = true;
}

function setupCardNumberBox(uiComponents) {
    uiComponents.textboxCardNumber.onTextChanged = function(e) {
        var enteredNumber = uiComponents.textboxCardNumber.text;
        var cardSource = "images://icon_payment_default.png";
        
        credits.forEach(function(card){
            card.iin.forEach(function(iin) {
                if (enteredNumber.substring(0, iin.length) === iin) {
                    cardSource = card.src;
                }
            });
        });

        uiComponents.cardLogo.image = Image.createFromFile(cardSource);
    };
}

function onShow() {
    var uiComponents = this;

    Router.sliderDrawer.enabled = false;
    setupCardButton(uiComponents);
};

function setupCardButton(uiComponents) {
    uiComponents.buttonPayCredit.text = "PAY " + ShoppingCart.getTotal() + "TL WITH CREDIT CARD"; // TODO: use lang!
    uiComponents.buttonPayPaypal.text = "CONTINUE WITH PAYPAL"; // TODO: use lang!
    
    uiComponents.buttonPayCredit.onTouchEnded = function() {
        completePayment(uiComponents);
    };
    uiComponents.buttonPayPaypal.onTouchEnded = function() {
        completePayment(uiComponents);
    };
};

function completePayment(uiComponents) {
    ShoppingCart.clearProducts();
    var alertView = new AlertView({
        message: "This feature is not implemented yet, you will be redirected to Categories"
    });
    alertView.addButton({
        index: AlertView.ButtonType.POSITIVE,
        text: "Ok",
        onClick: function() {
            Router.goBack(PageConstants.PAGE_CATEGORIES, null, true);
        }
    });
    alertView.show();
}

function initBackButton(page) {
	page.android.onBackButtonPressed = function() {
		Router.goBack();
	};
};

module && (module.exports = PagePayment);