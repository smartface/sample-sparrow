/* globals lang */
const extend = require('js-base/core/extend');
const pgProductDetailDesign = require("../ui/ui_pgProductDetail");
const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');
const Router = require("sf-core/ui/router");
const PageConstants = require("pages/PageConstants");
const Shopify = require("sf-extension-shopify");
const Product = require('../objects/Category');
const Animator = require('sf-core/ui/animator');
const System = require('sf-core/device/system');
const ShoppingCart = require("../objects/ShoppingCart");
const TextAlignment = require('sf-core/ui/textalignment');


const pgProductDetail = extend(pgProductDetailDesign)(
    // Constructor
    function(_super) {
        _super(this);
        this.shownBefore = false;
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        //this.onHide = onHide(this);
    });

function initHeaderBar(headerBar) {
    headerBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
    headerBar.leftImage.onTouchEnded = function() {
        Router.goBack();
    };
    headerBar.rightImage.image = Image.createFromFile("images://icon_cart.png");
    headerBar.rightContainer.onTouchEnded = function() {
        Router.go(PageConstants.PAGE_SHOPPING_CART, null, true);
    };

    headerBar.headerTitle.textAlignment = TextAlignment.MIDLEFT;
    ShoppingCart.updateBasket(headerBar);

}

function onShow(parentOnShow, params) {
    parentOnShow();
    Router.sliderDrawer.enabled = false;
    initHeaderBar(this.customHeaderBar);

    if (params && params.id) {
        Shopify.Product.getProduct(params.id).exec(function(response) {
            var productItem = new Product();
            productItem = response.product;
            initProduct(this, productItem);
            this.layout.applyLayout();
        }.bind(this));

        this.customHeaderBar.headerTitle.text = params.title;
        this.btnAddToCart.inenrButton.text = lang["pgProductDetail.addToCart"];
    }
}

function onLoad(parentOnLoad) {
    parentOnLoad();
}

function initProduct(page, product) {
    page.bodyText.htmlText = "<head><meta charset=\"UTF-8\"></head>" + product.body_html;
    page.priceText.text = "$" + product.variants[0].price;
    page.bigImage.loadFromUrl(product.image.src);
    page.effectImage.loadFromUrl(product.image.src);

    var smallImageContainers = [];
    smallImageContainers.push(page.itemSmallThumb1);
    smallImageContainers.push(page.itemSmallThumb2);
    smallImageContainers.push(page.itemSmallThumb3);

    initSmallImages(page, smallImageContainers, product.images);


    var pickerContainers = [];
    pickerContainers.push(page.itemPicker1);
    pickerContainers.push(page.itemPicker2);
    initOptions(page, pickerContainers, product.options);

    page.btnAddToCart.inenrButton.onPress = function() {
        ShoppingCart.addProduct(product);
        resetEffectImage(page);
        ShoppingCart.updateBasket(page.customHeaderBar);
        var animationRootView = page.layout;
        if (System.OS === "iOS") {
            Animator.animate(animationRootView, 200, function() {
                page.customHeaderBar.rightContainer.width = 40;
                page.customHeaderBar.rightContainer.height = 40;
            }).then(200, function() {
                page.customHeaderBar.rightContainer.width = 30;
                page.customHeaderBar.rightContainer.height = 30;
            });
        }
    };

    function resetEffectImage(page) {
        page.effectImage.visible = false;
        page.effectImage.alpha = 1;
        page.effectImage.height = 250;
        page.effectImage.top = 70;
        page.effectImage.left = 0;
        page.effectImage.right = 0;
        page.layout.applyLayout();
    }


    function initSmallImages(page, containers, images) {

        for (var i = 0; i < images.length; i++) {
            if (i === 3) { break; }

            containers[i].visible = true;
            containers[i].imageSmall.loadFromUrl(images[i].src);
            containers[i].onTouchEnded = function(param) {
                Animator.animate(page.layout, 300, function() {
                    if (System.OS === "iOS") {
                        page.bigImage.alpha = 0;
                        //page.bigImage.image = new Image();

                    }
                    else {
                        page.bigImage.visible = false;
                    }
                }).then(300, function() {

                    page.bigImage.loadFromUrl(param.image.src);
                    page.effectImage.loadFromUrl(param.image.src);
                    if (System.OS === "iOS") {
                        page.bigImage.alpha = 1;
                    }
                    else {
                        page.bigImage.visible = true;
                    }
                });
            }.bind(this, { image: images[i], index: i });

        }

    }



    function initOptions(page, containers, options) {
        var actualOptionsCount = 0;

        for (let i = 0; i < options.length; i++) {
            if (i > 1) break;
            let option = options[i];
            let pickerLayout = containers[i];
            pickerLayout.visible = true;
            pickerLayout.pickerLabel.text = option.name;
            pickerLayout.onTouchEnded = function() {
                const Picker = require("sf-core/ui/picker");
                var myPicker = new Picker({
                    items: this.option.values,
                    index: 2
                });
                myPicker.show(function(e) {
                    pickerLayout.pickerLabel.textColor = Color.BLACK;
                    pickerLayout.pickerLabel.text = option.values[e.index];
                }, function() {});
            }.bind({ option: option });
            actualOptionsCount++;
        }

        if (actualOptionsCount == 0) {
            page.pickerContainer.visible = false;
        }
    }
}


module && (module.exports = pgProductDetail);
