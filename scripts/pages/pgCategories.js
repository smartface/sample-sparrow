/*globals lang */
const extend = require('js-base/core/extend');
const PageDesign = require("../ui/ui_pgCategories");
const PageConstants = require("pages/PageConstants");
const Image = require('sf-core/ui/image');
const Shopify = require("sf-extension-shopify");
const ItemCategory = require("../components/ItemCategory");
const Timer = require("sf-core/timer");
const ListViewItem = require('sf-core/ui/listviewitem');
const Category = require('../objects/Category');
const SliderDrawer = require('sf-core/ui/sliderdrawer');
const ShoppingCart = require("../objects/ShoppingCart");
const addChild = require("@smartface/contx/lib/smartface/action/addChild");


const Page_ = extend(PageDesign)(
    // Constructor
    function(_super, pageProps = {}, router, route) {
        _super(this, pageProps);
        this.shownBefore = false;
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.categoryList = [];
        this.data = this.categoryList;
        initListView(this, this.listView, this);

    });

function onShow(parentOnShow) {
    parentOnShow();
    this.sliderDrawer.enabled = true;
    this.sliderDrawer.currentPage = this;
    initHeaderBar(this, this.customHeaderBar);

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
                        var arr = [];
                        for (var i = 0; i < collections["custom_collections"].length; i++) {
                            var categoryItem = new Category();
                            categoryItem = collections["custom_collections"][i];
                            arr.push(categoryItem);
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

function initHeaderBar(page, headerBar) {
    headerBar.leftImage.image = Image.createFromFile("images://icon_menu.png");
    headerBar.leftImage.onTouchEnded = function() {
        if (page.sliderDrawer.state === SliderDrawer.State.OPEN) {
            page.sliderDrawer.hide();
        }
        else if (page.sliderDrawer.state === SliderDrawer.State.CLOSED) {
            page.sliderDrawer.show();
        }
    };
    headerBar.rightImage.image = Image.createFromFile("images://icon_cart.png");
    headerBar.rightContainer.onTouchEnded = function() {
        page.router.push("/stack/cartstack/shoppingcart");
    };
    headerBar.headerTitle.text = lang["pgCategories.title"];
    ShoppingCart.updateBasket(headerBar);
}


function initListView(page, listView, dataHolder) {
    var itemIndex = 0;
    listView.rowHeight = 180;
    listView.itemCount = dataHolder.data.length;
    listView.refreshEnabled = false;
    listView.verticalScrollBarEnabled = false;
    listView.onRowCreate = function() {
        var myListViewItem = new ListViewItem();
        var item = new ItemCategory();
        item.id = 200;
        item.page = page;
        myListViewItem.item = item;

        this.dispatch(addChild("item" + (++itemIndex), myListViewItem));
        myListViewItem.addChild(item, "item", "", function(style) {
            style.width = null;
            return style;
        });
        return myListViewItem;
    };
    listView.onRowBind = function(listViewItem, index) {
        listViewItem.item.category = dataHolder.data[index];
    };

    listView.onRowSelected = function(listViewItem, index) {
        page.router.push("/stack/productlist", {value : dataHolder.data[index]});
    };
}


module && (module.exports = Page_);
