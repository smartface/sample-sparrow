/* globals lang */
const extend = require('js-base/core/extend');
const pgProductDetailDesign = require("../ui/ui_pgProductDetail");
const Color = require('sf-core/ui/color');
const Image = require('sf-core/ui/image');
const PageConstants = require("pages/PageConstants");
const Shopify = require("sf-extension-shopify");
const Product = require('../objects/Category');
const Animator = require('sf-core/ui/animator');
const System = require('sf-core/device/system');
const ShoppingCart = require("../objects/ShoppingCart");
const TextAlignment = require('sf-core/ui/textalignment');
const Dialog = require("sf-core/ui/dialog");
const ImageView = require('sf-core/ui/imageview');
const Screen = require('sf-core/device/screen');
const Application = require("sf-core/application");

var animationRootView;
var flProd = new ImageView({
    width: 400,
    height: 250,
    top: 70,
    left: 10,
    alpha: 0,
});
flProd.imageFillType = ImageView.FillType.ASPECTFIT;
var myDialog = new Dialog({
    isTransparent: true,
});
var shoppingCartPos;
const pgProductDetail = extend(pgProductDetailDesign)(
    // Constructor
    function(_super, pageProps = {}, router, route) {
        _super(this, pageProps);
        this.shownBefore = false;
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.onShowData = route.getState().routeData.value;
        myDialog.layout.removeAll();
        myDialog.layout.addChild(flProd);
        animationRootView = System.OS === "iOS" ? myDialog.layout : flProd.parent;
        myDialog.layout.applyLayout();
        //this.onHide = onHide(this);
    });

function initHeaderBar(page,headerBar) {
    headerBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
    headerBar.leftImage.onTouchEnded = function() {
        page.router.goBack();
    };
    headerBar.rightImage.image = Image.createFromFile("images://icon_cart.png");
    headerBar.rightContainer.onTouchEnded = function() {
        page.router.push("/stack/cartstack/shoppingcart");
    };
    shoppingCartPos = headerBar.rightContainer.getScreenLocation();
    headerBar.headerTitle.textAlignment = TextAlignment.MIDLEFT;
    ShoppingCart.updateBasket(headerBar);

}

function onShow(parentOnShow, params) {
    parentOnShow();
    
    Application.sliderDrawer.enabled = false;
    initHeaderBar(this, this.customHeaderBar);
    myDialog.android.onShow = function() {
        initProduct.animate();
        flProd.imageFillType = ImageView.FillType.ASPECTFIT;
    };
    
    // if (params && params.id) {
    if (this.onShowData && this.onShowData.id) {
        Shopify.Product.getProduct(this.onShowData.id).exec(function(response) {
            var productItem = new Product();
            productItem = response.product;
            initProduct(this, productItem);
            this.layout.applyLayout();
        }.bind(this));

        this.customHeaderBar.headerTitle.text = this.onShowData.title;
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
    flProd.loadFromUrl(product.image.src);
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
        myDialog.show();
        flProd.visible = true;
        if (System.OS === "iOS") {
            myDialog.layout.backgroundColor = Color.TRANSPARENT;
            animate();
        }

    };

    function animate() {
        Animator.animate(animationRootView, 400, function() {
            flProd.alpha = 0.4;
            flProd.top = 60;
            flProd.left = 12;
            flProd.width = 380;
            flProd.height = 240;
            flProd.alpha = 0.8;
        }).then(1190, function() {
            flProd.alpha = 1;
            flProd.top = 30;
            if (System.OS === "iOS") {
                flProd.left = shoppingCartPos.x + (Screen.width - 15);  //15 = this.headerBar.rightContainer.width / 2
            }
            else {
                flProd.left = shoppingCartPos.x + 15;

            }
            flProd.width = 10;
            flProd.height = 10;
        }).complete(function() {
            flProd.visible = false;
            myDialog.hide();
            ShoppingCart.addProduct(product);
            resetEffectImage(page);
            ShoppingCart.updateBasket(page.customHeaderBar);
            flProd.width = 400;
            flProd.height = 250;
            flProd.top = 70;
            flProd.left = 10;
        });
    }
    initProduct.animate = animate;

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
                    }
                    else {
                        page.bigImage.visible = false;
                    }
                }).then(300, function() {

                    page.bigImage.loadFromUrl(param.image.src);
                    page.effectImage.loadFromUrl(param.image.src);
                    flProd.loadFromUrl(param.image.src);
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
