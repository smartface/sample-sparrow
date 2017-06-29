const extend         = require('js-base/core/extend');
const Page           = require('sf-core/ui/page');
const PageDesign     = require("../ui/ui_pgProductDetail");
const Color          = require('sf-core/ui/color');
const ListView       = require('sf-core/ui/listview');
const ListViewItem   = require('sf-core/ui/listviewitem');
const FlexLayout     = require('sf-core/ui/flexlayout');
const Font           = require('sf-core/ui/font');
const Image          = require('sf-core/ui/image');
const ImageView      = require('sf-core/ui/imageview');
const Label          = require('sf-core/ui/label');
const HeaderBarItem  = require('sf-core/ui/headerbaritem');
const Router         = require("sf-core/ui/router");
const PageConstants  = require("pages/PageConstants");
const Timer          = require("sf-core/timer");
const Shopify		 = require("sf-extension-shopify");
const Product  	     = require('../objects/Category');
const ItemSmallThumb = require("../components/ItemSmallThumb");
const Animator       = require('sf-core/ui/animator');
const System         = require('sf-core/device/system');
const Screen         = require('sf-core/device/screen');
const ShoppingCart   = require("../objects/ShoppingCart");
const TextAlignment  = require('sf-core/ui/textalignment');


const Page_ = extend(PageDesign)(
	// Constructor
	function(_super){
		_super(this);
		this.shownBefore = false;
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		//this.onHide = onHide(this);
});

function initHeaderBar(headerBar) {
	headerBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
	headerBar.leftImage.onTouch = function()
	{
		Router.goBack();
	}
	headerBar.rightImage.image = Image.createFromFile("images://icon_cart.png");
	headerBar.rightContainer.onTouch = function()
	{
		Router.go(PageConstants.PAGE_SHOPPING_CART, null, true);
	}
	
	headerBar.headerTitle.textAlignment = TextAlignment.MIDLEFT;
	ShoppingCart.updateBasket(headerBar);

}

function onShow(parentOnShow,params) {
    parentOnShow();
    Router.sliderDrawer.enabled = false;
    initHeaderBar(this.customHeaderBar);

    if (params && params.id) {
        Shopify.Product.getProduct(params.id).exec(function(response) {
        	var productItem = new Product();
            productItem = response.product;
            initProduct(this,productItem);
            this.layout.applyLayout();
        }.bind(this));
        
        this.customHeaderBar.headerTitle.text = params.title;
        this.btnAddToCart.button1.text = lang["pgProductDetail.addToCart"]
    }
  
}

function onLoad(parentOnLoad) {
    parentOnLoad();
}

// function onHide(page) {
//     page.itemSmallThumb1.imageSmall.image = null;
//     page.itemSmallThumb2.imageSmall.image = null;
//     page.itemSmallThumb3.imageSmall.image = null;
//     page.bigImage.image = null;
//     page.layout.applyLayout();
// }

function initProduct(page,product) {
    page.bodyText.htmlText = "<head><meta charset=\"UTF-8\"></head>" + product.body_html;
    page.priceText.text = "$" + product.variants[0].price;
    page.bigImage.loadFromUrl(product.image.src);
    page.effectImage.loadFromUrl(product.image.src);
    
    var smallImageContainers = [];
    smallImageContainers.push(page.itemSmallThumb1);
    smallImageContainers.push(page.itemSmallThumb2);
    smallImageContainers.push(page.itemSmallThumb3);
    
    initSmallImages(page,smallImageContainers,product.images);
    
    
    var pickerContainers = [];
    pickerContainers.push(page.itemPicker1);
    pickerContainers.push(page.itemPicker2);
    initOptions(page,pickerContainers,product.options);
    
    page.btnAddToCart.button1.onPress = function() {
        ShoppingCart.addProduct(product);
        resetEffectImage(page)
        page.effectImage.visible = true;
        var animationRootView = page.layout;//System.OS === "iOS" ? page.layout : page.image.parent;
                Animator.animate(animationRootView, 200, function() {
                    page.effectImage.height = 60;
                    page.effectImage.top = 40;
                    page.effectImage.left = Screen.width/2;
                }).then(200, function() {
                    page.effectImage.height = 30;
                    page.effectImage.top = 20;
                    page.effectImage.left = Screen.width;
                    if (Device.deviceOS === "iOS") 
                    {
                        page.effectImage.alpha = 0;
                    } else {
                        page.effectImage.visible = false;
                    }
                }).then(200, function() {
                    ShoppingCart.updateBasket(page.customHeaderBar);
                    if (Device.deviceOS === "iOS") {
                        Animator.animate(animationRootView, 200, function() {
                            page.customHeaderBar.rightContainer.width = 40;
                            page.customHeaderBar.rightContainer.height = 40;
                            }).then(200, function() {
                                page.customHeaderBar.rightContainer.width = 30;
                                page.customHeaderBar.rightContainer.height = 30;
                            })
                    }
                     
                }).complete(function() {
                    resetEffectImage(page);
                });
    };
    
function resetEffectImage(page)   
{
    page.effectImage.visible = false;
    page.effectImage.alpha = 1;
    page.effectImage.height = 250;
    page.effectImage.top = 70;
    page.effectImage.left = 0;
    page.effectImage.right = 0;
    page.layout.applyLayout();
}
    
    
function initSmallImages(page,containers,images) {
        var selectedImage = null;
        
        for (var i = 0; i< images.length;i++ ) {
            if (i === 3) { break; }
                
                containers[i].visible = true;
                containers[i].imageSmall.loadFromUrl(images[i].src);
                containers[i].onTouchEnded =  function(param) {
                        Animator.animate(page.layout, 300, function() {
                            if (Device.deviceOS === "iOS") {
                                page.bigImage.alpha = 0;
                                //page.bigImage.image = new Image();
                                
                            } else {
                                page.bigImage.visible = false;
                            }
                        }).then(300, function() {
                            
                            page.bigImage.loadFromUrl(param.image.src);
                            page.effectImage.loadFromUrl(param.image.src);
                            if (Device.deviceOS === "iOS") {
                                page.bigImage.alpha = 1;
                            } else {
                                page.bigImage.visible = true;
                            }
                        });
                }.bind(this, {image:images[i], index: i});
           
        }

}


    
    function initOptions(page,containers,options) {
        var actualOptionsCount = 0;
        
        for (var i =0; i< options.length;i++ ) {
            if(i>1) break;
            var option = options[i];
            var pickerLayout = containers[i];
            pickerLayout.visible = true;
            pickerLayout.pickerLabel.text = option.name;
            pickerLayout.onTouchEnded = function()
            {
                const Picker = require("sf-core/ui/picker");
                        var myPicker = new Picker({
                            items: this.option.values,
                            index: 2
                        });
                        myPicker.show(function(e) {
                            pickerLayout.pickerLabel.textColor = Color.BLACK;
                            pickerLayout.pickerLabel.text = option.values[e.index];
                            //uiComponents.buttonAddCart.backgroundColor = Color.create("#579e0c"); // fix after AND-2790
                            //uiComponents.buttonAddCart.enabled = true;
                        },function() {});
            }.bind({option:option})
            actualOptionsCount++;
        }
        
        if (actualOptionsCount == 0) {
            page.pickerContainer.visible = false;
        }
    }
};


module && (module.exports = Page_);