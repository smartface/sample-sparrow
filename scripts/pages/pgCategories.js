const extend = require("js-base/core/extend");

const Page         = require('sf-core/ui/page');
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
const Timer         = require("sf-core/timer");
const ActivityIndicator = require('sf-core/ui/activityindicator');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');

const Shopify = require("sf-extension-shopify");

// Get generetad UI code
var PageCategoriesDesign = require("../ui/ui_pgCategories");
var uiComponents;

const PageCategories = extend(PageCategoriesDesign)(
    function(_super) {
        var self = this;
        _super(self);
        uiComponents = this;
        this.orientation = Page.Orientation.AUTO;
        this.shownBefore = false;
        this.onShow = onShow.bind(this);

        initHeaderBar(this.headerBar);
       
    });

function onShow() {
    this.headerBar.backgroundColor = Color.create(255, 65, 117, 10);
    this.statusBar.android && (this.statusBar.android.color = Color.create(255, 65, 117, 10));
    this.statusBar.ios && (this.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT);
    Router.sliderDrawer.enabled = true;
    this.layout.applyLayout();
    uiComponents.rootLayout.backgroundColor = Color.createGradient({startColor: Color.create("#41750A"), endColor:Color.create("#88AE12"), direction: Color.GradientDirection.DIAGONAL_LEFT});
    if (!this.shownBefore) {
        this.shownBefore = true;
        Timer.setTimeout({
            delay: 300,
            task: function() {
                Shopify.Collections.getAllCollections().fields(["id", "image", "title"]).exec(function(collections) {
                    initListView.call(this, uiComponents.rootLayout, collections["custom_collections"]);
                }.bind(this));
            }.bind(this)
        });
    }
}

function initHeaderBar(headerBar) {
    var menuItem = new HeaderBarItem({
        image: Image.createFromFile("images://icon_menu.png"),
        color : Color.WHITE,
        onPress: function() {
            Router.sliderDrawer.show();
        }
    });
    var shoppingCartItem = new HeaderBarItem({
        image: Image.createFromFile("images://cart.png"),
        color : Color.WHITE,
        onPress: function() {
            Router.go(PageConstants.PAGE_SHOPPING_CART, null, true);
        }
    });
    headerBar.title = lang["pgCategories.title"];
    headerBar.setLeftItem(menuItem);
    headerBar.setItems([shoppingCartItem]);
};

function initListView(rootLayout, collections) {
    var categoryList = new ListView({
        marginLeft:10, marginTop:10, marginRight:10,
        flexGrow: 1,
        alignSelf : FlexLayout.AlignSelf.STRETCH,
        setPullRefreshColors : [Color.WHITE],
        rowHeight: 200,
        itemCount: collections.length,
        backgroundColor: Color.TRANSPARENT,
        refreshEnabled: false,
        verticalScrollBarEnabled: false
    });
    rootLayout.addChild(categoryList);
    
    categoryList.onRowCreate = function() {
        var categoryItem = new ListViewItem({
            alignItems: FlexLayout.AlignItems.CENTER,
            justifyContent: FlexLayout.JustifyContent.CENTER,
        });
        categoryItem.categoryImage = new ImageView({
            id:10,
            height:200,
            left:0, right:0, 
            imageFillType: ImageView.FillType.STRETCH,
            positionType: FlexLayout.PositionType.ABSOLUTE,
        });
        categoryItem.categoryTitle = new Label({
            left:0, bottom:20,
            alpha:0.9,
            id:11,
            minWidth: 150,
            height: 40,
			text: "CLOTHING",
			font: Font.create("Lato", 14, Font.NORMAL),
			backgroundColor: Color.create(255, 225, 63, 84),
			borderColor: Color.TRANSPARENT,
			borderWidth: 1,
			textColor: Color.WHITE,
			textAlignment: TextAlignment.MIDCENTER,
			positionType: FlexLayout.PositionType.ABSOLUTE,
        });

        categoryItem.addChild(new ActivityIndicator({
            width:50, height:50,
            flexGrow:1,
            color: Color.WHITE,
            ios:{
               type : ActivityIndicator.iOS.Type.WHITELARGE
            }
        }));
        categoryItem.addChild(categoryItem.categoryImage);
        categoryItem.addChild(categoryItem.categoryTitle);
        return categoryItem;
    };
    categoryList.onRowBind = function(listViewItem,index) {
        var collection = collections[index];
        listViewItem.findChildById(11).text = collection.title;
        listViewItem.findChildById(10).loadFromUrl(collection.image.src);
    };
    categoryList.onRowSelected = function(listViewItem,index){
        Router.go(PageConstants.PAGE_PRODUCT_LIST, {
            collectionID: collections[index].id,
            collectionName: collections[index].title,
        }, true);
    };
    categoryList.onPullRefresh = function(){
    };
    this.layout.applyLayout();
};

module && (module.exports = PageCategories);