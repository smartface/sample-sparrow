const extend		 = require('js-base/core/extend');
const Page			 = require('sf-core/ui/page');
const PageDesign	 = require("../ui/ui_pgProductList");
const Color          = require('sf-core/ui/color');
const ListView       = require('sf-core/ui/listview');
const ListViewItem   = require('sf-core/ui/listviewitem');
const FlexLayout     = require('sf-core/ui/flexlayout');
const Font           = require('sf-core/ui/font');
const Image          = require('sf-core/ui/image');
const HeaderBarItem  = require('sf-core/ui/headerbaritem');
const Router         = require("sf-core/ui/router");
const PageConstants  = require("pages/PageConstants");
const Timer          = require("sf-core/timer");
const Shopify		 = require("sf-extension-shopify");
const Product  	     = require('../objects/Category');
const ItemProductList		= require("../components/ItemProductList");
const ShoppingCart		= require("../objects/ShoppingCart");
const StatusBarStyle    = require('sf-core/ui/statusbarstyle');

const Page_ = extend(PageDesign)(
	function(_super){
		_super(this);
		this.shownBefore = false;
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.productList = [];
        this.data = this.productList;
		initListView(this.listView, this);
		
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
	ShoppingCart.updateBasket(headerBar);
}


function onShow(parentOnShow,params) {
    parentOnShow();
    initHeaderBar(this.customHeaderBar);

    Router.sliderDrawer.enabled = false;

    if (params && params.id) {
        Timer.setTimeout({
            delay: 300,
            task: function() {
                Shopify.Product.getAllProducts().collectionID(params.id).fields(["id", "title", "variants", "image"]).exec(function(response) {
                		var arr =[]
                        for (var i = 0; i < response.products.length; i++) {
                            var productItem = new Product();
                            productItem = response.products[i];
                            arr.push(productItem)
                        }
                    	this.productList = arr;
                        this.data = this.productList;
                        this.listView.itemCount = Math.ceil(this.data.length / 2);
                        this.loaderContainer.activityIndicator.visible = false;
                        this.listView.refreshData();
                }.bind(this));
            }.bind(this)
        });
        this.customHeaderBar.headerTitle.text = params.title;
    }

}

function onLoad(parentOnLoad,params) {
    parentOnLoad();
}

function initListView(listView, dataHolder) {
    
	listView.rowHeight = 242;
    listView.itemCount = dataHolder.data.length;
    listView.refreshEnabled = false;
    listView.verticalScrollBarEnabled = true;
    listView.onRowCreate = function() {
        var myListViewItem = new ListViewItem({
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexDirection: FlexLayout.FlexDirection.ROW,
		});
        var itemLeft = new ItemProductList();
        itemLeft.flexGrow = 1;
        itemLeft.id = 200;
        myListViewItem.leftItem = itemLeft;
        myListViewItem.addChild(itemLeft);
        
        var itemRight = new ItemProductList();
        itemRight.flexGrow = 1;
        itemRight.marginLeft = 10;
        itemRight.id = 201;
        myListViewItem.rightItem = itemRight;
        myListViewItem.addChild(itemRight);

        return myListViewItem;
    };
    listView.onRowBind = function(listViewItem, index) {
        listViewItem.leftItem.product = dataHolder.data[index * 2];
        listViewItem.rightItem.product = dataHolder.data[(index * 2) + 1];
    };
    
}

module && (module.exports = Page_);