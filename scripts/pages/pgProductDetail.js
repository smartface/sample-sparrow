const extend = require("js-base/core/extend");

const Color         = require('sf-core/ui/color');
const Label         = require('sf-core/ui/label');
const Image         = require('sf-core/ui/image');
const ImageView     = require('sf-core/ui/imageview');
const HeaderBarItem = require('sf-core/ui/headerbaritem');
const Router        = require("sf-core/ui/router");
const Animator      = require('sf-core/ui/animator');
const FlexLayout    = require("sf-core/ui/flexlayout");
const Font          = require("sf-core/ui/font");
const http          = require("sf-core/net/http");

const Shopify = require("sf-extension-shopify");
const PageConstants = require("pages/PageConstants");
const AddedPopup = require("lib/added_popup");

// Get generetad UI code
var PageProductDetailDesign = require("../ui/ui_pgProductDetail");
var ShoppingCart = require("../ShoppingCart");

const PageProductDetail = extend(PageProductDetailDesign)(
    function(_super) {
        var self = this;
        _super(self);
        this._superOnLoad = this.onLoad;
        
        this.onShow = onShow.bind(this);
        this.onLoad = onLoad.bind(this);
        
        initHeaderBar(this.headerBar);
        initBackButton(self);
});

function onLoad() {
    this._superOnLoad();
    
    this.buttonAddCart.text = lang["pgProductDetail.addToCart"];
    this.buttonAddCart.backgroundColor = Color.create("#579e0c"); // fix after AND-2790
    this.facebookShareImage.visible = false;
}

function onShow(params) {
    var uiComponents = this;

    Router.sliderDrawer.enabled = true;
    
    if (params && params.productID) {
        Shopify.Product.getProduct(params.productID).exec(function(response) {
            initProduct.call(this, response.product, uiComponents);
            initShareButton.call(this, response.product);
            this.layout.applyLayout();
        }.bind(this));
    }
}

function initHeaderBar(headerBar) {
    headerBar.title = lang["pgProductDetail.title"];
    var leftItem = new HeaderBarItem({
        color: Color.WHITE,
        text: "",
        image: Image.createFromFile("images://arrow_left.png"),
        onPress: function() {
            Router.goBack();
        }
    });
    var shoppingCartItem = new HeaderBarItem({
        image: Image.createFromFile("images://cart.png"),
        color : Color.WHITE,
        onPress: function() {
            Router.go(PageConstants.PAGE_SHOPPING_CART, null, true);
        }
    });
    headerBar.setLeftItem(leftItem);
    headerBar.setItems([shoppingCartItem]);
};

function initProduct(product, uiComponents) {
    this.headerBar.title = product.title;
    
    var pageLayout = this.layout;
    pageLayout.justifyContent = FlexLayout.JustifyContent.CENTER;

    uiComponents.labelDescription.htmlText = "<head><meta charset=\"UTF-8\"></head>" + product.body_html;
    uiComponents.labelPrice.text = product.variants[0].price + " TL";
    uiComponents.productImageBig.loadFromUrl(product.image.src);
    
    initSmallImages(product.images);
    initOptions(product.options);
    
    uiComponents.buttonAddCart.onPress = function() {
        ShoppingCart.addProduct(product);
        uiComponents.buttonAddCart.enabled = false;
        uiComponents.buttonAddCart.backgroundColor = { // fix after AND-2790
            disabled: Color.create("#77915d")
        };
        AddedPopup.show(pageLayout, function() {
            uiComponents.buttonAddCart.enabled = true;
            uiComponents.buttonAddCart.backgroundColor = Color.create("#579e0c");
        });
    };
    
    function initSmallImages(images) {
        var selectedImage = null;
        images.forEach(function(image) {
            var smallImageLayout = new FlexLayout({
                marginLeft:10,
                height:50, width:50,
                borderWidth: 1, borderRadius: 5,
                borderColor: Color.create(210, 210, 210),
                padding:2
            });
        
            if (!selectedImage) {
                selectedImage = smallImageLayout;
                selectedImage.borderColor = Color.RED;
            }
        
            var smallImage = new ImageView({
                flexGrow: 1,
                imageFillType: ImageView.FillType.ASPECTFIT,
                onTouchEnded: function() {
                    selectedImage.borderColor = Color.create(210, 210, 210);
                    selectedImage = smallImageLayout;
                    selectedImage.borderColor = Color.RED;
        
                    Animator.animate(pageLayout, 500, function() {
                        if (Device.deviceOS === "iOS") {
                            uiComponents.productImageBig.alpha = 0;
                        } else {
                            uiComponents.productImageBig.visible = false;
                        }
                    }).then(500, function() {
                        uiComponents.productImageBig.image = smallImage.image;
                        if (Device.deviceOS === "iOS") {
                            uiComponents.productImageBig.alpha = 1;
                        } else {
                            uiComponents.productImageBig.visible = true;
                        }
                    });
                }
            });
            smallImage.loadFromUrl(image.src);
            smallImageLayout.addChild(smallImage);
            uiComponents.smallImagesLayout.addChild(smallImageLayout);
        });
    }
    
    function initOptions(options) {
        var actualOptionsCount = 0;
        options.forEach(function(option) {
            if (option.name != "Title") {
                var optionLabel = new Label({
                    marginLeft:10,
                    width: 100,
                    text: option.name,
                    onTouchEnded: function() {
                        const Picker = require("sf-core/ui/picker");
                        var myPicker = new Picker({
                            items: option.values,
                            index: 2
                        });
                        myPicker.show(function(e) {
                            optionLabel.textColor = Color.BLACK;
                            optionLabel.text = option.values[e.index];
                            uiComponents.buttonAddCart.backgroundColor = Color.create("#579e0c"); // fix after AND-2790
                            uiComponents.buttonAddCart.enabled = true;
                        },function() {});
                    }
                });
                optionLabel.font = Font.create("Lato", 12, Font.NORMAL);
                uiComponents.optionLayout.addChild(optionLabel);
                uiComponents.optionLayout.addChild(new ImageView({
                    width: 10,
                    image: Image.createFromFile("images://arrows.png")
                }));
                uiComponents.buttonAddCart.enabled = false;
                uiComponents.buttonAddCart.backgroundColor = { // fix after AND-2790
                    disabled: Color.create("#77915d")
                };
                actualOptionsCount++;
            }
        });
        
        if (actualOptionsCount !== 0) {
            uiComponents.descriptionLayout.flexGrow = 6;
            uiComponents.pickersLayout.flexGrow = 3;
            uiComponents.pickersLayout.visible = true;
            uiComponents.divider1.height = 1;
            uiComponents.divider1.visible = true;
        }
    }
};

function initShareButton(product) {
    var page = this;
    if (global.facebookEnabled) {
        const Facebook = require("sf-plugin-facebook");
        if (Facebook.AccessToken.getCurrentToken()) {
            page.facebookShareImage.visible = true;
            page.facebookShareImage.touchEnabled = true;
            page.facebookShareImage.onTouchEnded = function() {
                Facebook.shareLinkContent({
                    page: page,
                        shareHashtag: new Facebook.ShareHashtag({
                            hashTag: "#HashTag"
                        }),
                        contentUrl: product.image.src,
                        onSuccess: function(data) {},
                        onCancel: function() {},
                        onFailure: function(error) {}
                    });
            };
        } else {
            page.facebookShareImage.visible = false;
        }
    }
};

function initBackButton(page) {
	page.android.onBackButtonPressed = function() {
		Router.goBack();
	};
};

module && (module.exports = PageProductDetail);