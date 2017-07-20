const extend			= require('js-base/core/extend');
const Page				= require('sf-core/ui/page');
const Color 			= require('sf-core/ui/color');
const PageDesign		= require("../ui/ui_pgCategories");
const Router			= require("sf-core/ui/router")
const PageConstants 	= require("pages/PageConstants");
const Image         	= require('sf-core/ui/image');
const Shopify			= require("sf-extension-shopify");
const ItemCategory		= require("../components/ItemCategory");
const Timer         	= require("sf-core/timer");
const ListView      	= require('sf-core/ui/listview');
const ListViewItem  	= require('sf-core/ui/listviewitem');
const Category  	    = require('../objects/Category');
const Button  	        = require('sf-core/ui/button');
const SliderDrawer      = require('sf-core/ui/sliderdrawer')
const ShoppingCart		= require("../objects/ShoppingCart");
const StatusBarStyle    = require('sf-core/ui/statusbarstyle');


const Page_ = extend(PageDesign)(
	// Constructor
	function(_super){
		_super(this);
		this.shownBefore = false;
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.categoryList = [];
        this.data = this.categoryList;
		initListView(this.listView, this);
        
});

function onShow(parentOnShow) {
    parentOnShow();
    Router.sliderDrawer.enabled = true;
    initHeaderBar(this.customHeaderBar);

    this.layout.applyLayout();

    if (!this.shownBefore) {
        this.shownBefore = true;
        Timer.setTimeout({
            delay: 300,
            task: function() {
                Shopify
                    .Collections
                    .getAllCollections()
                    .fields(["id", "image", "title"])
                    .exec(function(collections) {
                        var arr =[]
                        for (var i = 0; i < collections["custom_collections"].length; i++) {
                            var categoryItem = new Category();
                            categoryItem = collections["custom_collections"][i];
                            arr.push(categoryItem)
                        }
                    	this.categoryList = arr;
                        this.data = this.categoryList;
                        this.listView.itemCount = this.data.length;
                        this.loaderContainer.activityIndicator.visible = false;
                        this.listView.refreshData();
                        }.bind(this));
            }.bind(this)
        });
    }
}

function onLoad(parentOnLoad) {
    parentOnLoad();
}

function initHeaderBar(headerBar) {
	headerBar.leftImage.image = Image.createFromFile("images://icon_menu.png");
	headerBar.leftImage.onTouchEnded = function()
	{
	    if(Router.sliderDrawer.state === SliderDrawer.State.OPEN){
	        		Router.sliderDrawer.hide();

	    }else if(Router.sliderDrawer.state === SliderDrawer.State.CLOSED){
	        		Router.sliderDrawer.show();

	    }
	}
	headerBar.rightImage.image = Image.createFromFile("images://icon_cart.png");
	headerBar.rightContainer.onTouchEnded = function()
	{
		Router.go(PageConstants.PAGE_SHOPPING_CART, null, true);
	}
    headerBar.headerTitle.text = lang["pgCategories.title"];
    ShoppingCart.updateBasket(headerBar);
}


function initListView(listView, dataHolder) {
    
	listView.rowHeight = 180;
    listView.itemCount = dataHolder.data.length;
    listView.refreshEnabled = false;
    listView.verticalScrollBarEnabled = false;
    listView.onRowCreate = function() {
        var myListViewItem = new ListViewItem();
        var item = new ItemCategory();
        item.id = 200;
        myListViewItem.item = item;
        myListViewItem.addChild(item);
        return myListViewItem;
    };
    listView.onRowBind = function(listViewItem, index) {
        listViewItem.item.category = dataHolder.data[index];
    };
    
    listView.onRowSelected = function(listViewItem,index){
        Router.go(PageConstants.PAGE_PRODUCT_LIST, dataHolder.data[index], true);
    };
}


module && (module.exports = Page_);