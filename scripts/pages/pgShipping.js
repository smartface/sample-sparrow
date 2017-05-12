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
const ActionKeyType = require('sf-core/ui/actionkeytype');
const KeyboardType  = require('sf-core/ui/keyboardtype');

// Get generetad UI code
var PageShippingDesign = require("../ui/ui_pgShipping");
var ShoppingCart = require("../ShoppingCart")

const PageShipping = extend(PageShippingDesign)(
    function(_super) {
        var self = this;
        _super(self);
        this._superOnLoad = this.onLoad;
        var uiComponents = this;
        
        this.onShow = onShow.bind(this);
        this.onLoad = onLoad.bind(this);
        
        initHeaderBar(this.headerBar);
        initBackButton(self);
        
        uiComponents.buttonPayment.onPress = function()
        {
            Router.go(PageConstants.PAGE_PAYMENT, null, true);
        }
});

function onLoad() {
    this._superOnLoad();

    this.textboxZip.keyboardType = KeyboardType.NUMBER;    
    this.textboxPhone.keyboardType = KeyboardType.PHONE;
    
    this.textboxName.hint     = "Name"; //TODO: use lang!
    this.textboxLastname.hint = "Lastname";
    this.textboxAddress.hint  = "Address";
    this.textboxCity.hint     = "City";
    this.textboxZip.hint      = "Zip";
    this.textboxPhone.hint    = "Phone";
    
    var textboxes = [
        this.textboxName, this.textboxLastname, this.textboxAddress,
        this.textboxCity, this.textboxZip, this.textboxPhone
    ];
    for (let i = 0; i < textboxes.length; ++i) {
        textboxes[i].ios.clearButtonEnabled = true;
        textboxes[i].actionKeyType = ActionKeyType.NEXT;
        textboxes[i].onActionButtonPress = function() {
            if (i !== textboxes.length-1) {
                textboxes[i+1].showKeyboard();
            } else {
                textboxes[i].hideKeyboard();
            }
        }
    }
};

function onShow() {
    Router.sliderDrawer.enabled = false;
    this.labelPrice.text = ShoppingCart.getTotal().toFixed(2) + " TL";
}

function initHeaderBar(headerBar) {
    headerBar.title = lang["pgShipping.title"];
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

function initBackButton(page) {
	page.android.onBackButtonPressed = function() {
		Router.goBack();
	};
};

module && (module.exports = PageShipping);