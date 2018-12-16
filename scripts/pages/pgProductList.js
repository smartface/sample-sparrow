const extend = require('js-base/core/extend');
const PageDesign = require("../ui/ui_pgProductList");
const ListViewItem = require('sf-core/ui/listviewitem');
const FlexLayout = require('sf-core/ui/flexlayout');
const Image = require('sf-core/ui/image');
const PageConstants = require("pages/PageConstants");
const Timer = require("sf-core/timer");
const Shopify = require("sf-extension-shopify");
const Product = require('../objects/Category');
const ItemProductList = require("../components/ItemProductList");
const ShoppingCart = require("../objects/ShoppingCart");
const addChild = require("@smartface/contx/lib/smartface/action/addChild");
const Application = require("sf-core/application");

const Page_ = extend(PageDesign)(
    function(_super, pageProps = {}, router, route) {
        _super(this, pageProps);
        this.shownBefore = false;
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.productList = [];
        this.data = this.productList;
        initListView(this.listView, this);
        this.onShowData = route.getState().routeData.value;
    });

function initHeaderBar(page, headerBar) {
    headerBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
    headerBar.leftImage.onTouchEnded = function() {
        page.router.goBack();
    }
    headerBar.rightImage.image = Image.createFromFile("images://icon_cart.png");
    headerBar.rightContainer.onTouchEnded = function() {
        page.router.push("/stack/cartstack/shoppingcart");
    }
    ShoppingCart.updateBasket(headerBar);
}


function onShow(parentOnShow, params) {
    parentOnShow();
    initHeaderBar(this, this.customHeaderBar);

    Application.sliderDrawer.enabled = false;

    if (this.onShowData && this.onShowData.id) {
        Timer.setTimeout({
            delay: 300,
            task: function() {
                Shopify.Product.getAllProducts().collectionID(this.onShowData.id).fields(["id", "title", "variants", "image"]).exec(function(response) {
                    var arr = []
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
        this.customHeaderBar.headerTitle.text = this.onShowData.title;
    }

}

function onLoad(parentOnLoad, params) {
    parentOnLoad();
}

function initListView(listView, dataHolder) {
    var itemIndex = 0;
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
        itemLeft.id = 200;
        myListViewItem.leftItem = itemLeft;
        this.dispatch(addChild("item" + (++itemIndex), myListViewItem));
        myListViewItem.addChild(itemLeft, "itemLeft", "", function(style) {
            style.width = null;
            style.flexGrow = 1;
            return style;
        });

        var itemRight = new ItemProductList();
        itemRight.id = 201;
        myListViewItem.rightItem = itemRight;
        myListViewItem.addChild(itemRight, "itemRight", "", function(style) {
            style.width = null;
            style.flexGrow = 1;
            style.marginLeft = 10;
            return style;
        });

        return myListViewItem;
    };
    listView.onRowBind = function(listViewItem, index) {
        listViewItem.leftItem.page = dataHolder;
        listViewItem.rightItem.page = dataHolder;
        
        listViewItem.leftItem.product = dataHolder.data[index * 2];
        listViewItem.rightItem.product = dataHolder.data[(index * 2) + 1];
    };

}

module && (module.exports = Page_);
