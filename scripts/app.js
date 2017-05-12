/* globals lang */
require("i18n/i18n.js"); //generates global lang object
const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");
const Pages = require('sf-core/ui/pages');
const FlexLayout        = require('sf-core/ui/flexlayout');
const Color             = require('sf-core/ui/color');
const ImageView         = require('sf-core/ui/imageview');
const Image             = require('sf-core/ui/image');
const Font              = require('sf-core/ui/font');
const Label             = require("sf-core/ui/label");
const TextAlignment     = require('sf-core/ui/textalignment');
const ListView          = require('sf-core/ui/listview');
const ListViewItem      = require("sf-core/ui/listviewitem");
const SliderDrawer      = require('sf-core/ui/sliderdrawer');
const PageConstants     = require('pages/PageConstants');
const System            = require("sf-core/device/system");

const Shopify  = require("sf-extension-shopify");
const Config = require("config.js");

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

Shopify.Authentication.setAPIKey   (Config.SHOPIFY_APIKey   );
Shopify.Authentication.setPassword (Config.SHOPIFY_PASSWORD );
Shopify.Authentication.setStoreName(Config.SHOPIFY_STORENAME);

// Define routes and go to initial page of application
Router.add(PageConstants.PAGE_LOGIN         , require('pages/pgLogin'), true);
Router.add(PageConstants.PAGE_CATEGORIES    , require('pages/pgCategories'), true);
Router.add(PageConstants.PAGE_PRODUCT_LIST  , require('pages/pgProductList'));
Router.add(PageConstants.PAGE_PRODUCT_DETAIL, require('pages/pgProductDetail'));
Router.add(PageConstants.PAGE_SHOPPING_CART , require('pages/pgShoppingCart'));
Router.add(PageConstants.PAGE_SHIPPING      , require('pages/pgShipping'), true);
Router.add(PageConstants.PAGE_PAYMENT       , require('pages/pgPayment'));
Router.go(PageConstants.PAGE_LOGIN);

initSliderDrawer();

function initSliderDrawer()
{
    
    var iconCatalog    = Image.createFromFile("images://icon_catalog.png");
    var iconcart    = Image.createFromFile("images://cart.png");
    
    var myDataSet = [
        { 
            title: lang["pgCategories.title"], 
            icon: iconCatalog,
            tag : PageConstants.PAGE_CATEGORIES,
            singleton : true
        },
        { 
            title: lang["pgShoppingCart.title"], 
            icon: iconcart,
            tag : PageConstants.PAGE_SHOPPING_CART
        }
        
    ]
    
    var topContainer = new FlexLayout();
    topContainer.flexGrow = 1;
    topContainer.flexBasis = 1;
    topContainer.justifyContent = FlexLayout.JustifyContent.CENTER;
    topContainer.alignItems     = FlexLayout.AlignItems.CENTER;
    topContainer.padding        = 10;
    topContainer.marginTop = 20;
    
    var profileImage = new ImageView();
    profileImage.image = Image.createFromFile("images://sparrow_logo.png");
    profileImage.maxHeight = 60;
    profileImage.imageFillType =  ImageView.FillType.ASPECTFIT;
    
    topContainer.addChild(profileImage);
    
    var dividerTop = new FlexLayout();
    dividerTop.height = 1;
    dividerTop.backgroundColor = Color.create('#20FFFFFF');
    
    
    var listView = new ListView({
        itemCount: myDataSet.length,
        rowHeight: 60,
        flexGrow : 2,
        backgroundColor : Color.TRANSPARENT,
        onRowCreate: function(){
            var rowImage = new ImageView({
                id: 3,
                width : 50,
                imageFillType: ImageView.FillType.ASPECTFIT,
                margin : 10,
            })
            
            var rowTitle = new Label();
            rowTitle.flexGrow = 1;
            rowTitle.flexBasis = 1;
            rowTitle.id = 4;
            rowTitle.font =  Font.create("Lato",18,Font.NORMAL);
            rowTitle.backgroundColor = Color.TRANSPARENT;
            rowTitle.textColor = Color.WHITE;
            rowTitle.textAlignment = TextAlignment.MIDLEFT;
            rowTitle.alignSelf = FlexLayout.AlignSelf.CENTER;
        
            var rowTemplate = new ListViewItem({});
            rowTemplate.alignItems = FlexLayout.AlignItems.STRETCH;
            rowTemplate.flexDirection = FlexLayout.FlexDirection.ROW;
            rowTemplate.paddingLeft = 10;
            rowTemplate.paddingTop = 5;
            rowTemplate.paddingBottom = 5;
            
            rowTemplate.alpha = 0.5;
            rowTemplate.addChild(rowImage);
            rowTemplate.addChild(rowTitle);
        
            return rowTemplate;
        },
        onRowBind: function(listViewItem, index) {
            var rowTitle = listViewItem.findChildById(4);
            rowTitle.text = myDataSet[index].title;
            
            var rowImage = listViewItem.findChildById(3)
            rowImage.image = myDataSet[index].icon;
            
            if(Router.getCurrent() == myDataSet[index].tag)
            {
                listViewItem.alpha = 1;
            }else
            {
                listViewItem.alpha = 0.5;
            }
            
            listViewItem.applyLayout();
        },
        onRowSelected: function(listViewItem, index) {
            if(Router.getCurrent() !== myDataSet[index].tag)
            {
                try {
                    Router.go(myDataSet[index].tag,{},false);
                } catch(e) {
                    Router.goBack(myDataSet[index].tag, false);
                    sliderDrawer.hide();
                }
            }
            listView.refreshData();
            
        }
    });
    
    var dividerBottom = new FlexLayout();
    dividerBottom.height = 1;
    dividerBottom.backgroundColor = Color.create('#20FFFFFF');
    
    var btnSignOut = new Label();
    btnSignOut.height = 60;
    btnSignOut.font =  Font.create("Lato",16,Font.NORMAL);
    btnSignOut.backgroundColor = Color.TRANSPARENT;
    btnSignOut.textColor = Color.WHITE;
    btnSignOut.textAlignment = TextAlignment.MIDLEFT;
    btnSignOut.text = "Sign out";
    btnSignOut.alpha = 0.5;
    btnSignOut.marginLeft = 30;
    btnSignOut.touchEnabled = true;
    
    btnSignOut.onTouchEnded = function () {
        Router.goBack(PageConstants.PAGE_LOGIN);
        Router.sliderDrawer.hide();
        
        if (global.facebookEnabled) {
            const Facebook = require("sf-plugin-facebook");
            Facebook.logOut();
        }
    }
   
    var sliderDrawer = new SliderDrawer();
    sliderDrawer.width = 250;
    Router._superGo = Router.go;
    Router._superGoBack = Router.goBack;

    Router.go = function(tag, parameters, animated) {
        Router._superGo(tag, parameters, animated);
        listView.refreshData();
    }
    
    Router.goBack = function(tag, animated) {
        Router._superGoBack(tag, animated);
        listView.refreshData();
    }
    
    sliderDrawer.onLoad = function()
    {
        sliderDrawer.layout.justifyContent = FlexLayout.JustifyContent.CENTER;
        sliderDrawer.layout.flexDirection =  FlexLayout.FlexDirection.COLUMN;
        sliderDrawer.layout.backgroundColor = Color.createGradient({startColor: Color.create("#41750A"), endColor:Color.create("#88AE12"), direction: Color.GradientDirection.DIAGONAL_LEFT});
        sliderDrawer.layout.addChild(topContainer);      
        sliderDrawer.layout.addChild(dividerTop)     
        sliderDrawer.layout.addChild(listView);
        sliderDrawer.layout.addChild(dividerBottom);   
        sliderDrawer.layout.addChild(btnSignOut);
    }
    Router.sliderDrawer = sliderDrawer;
    Router.sliderDrawer.enabled = false;
}
