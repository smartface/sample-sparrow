const extend = require("js-base/core/extend");

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

const Shopify = require("sf-extension-shopify");

const FONT_LATO_NORMAL_12 = Font.create("Lato", 12, Font.NORMAL);
// Get generetad UI code
var PageProductListDesign = require("../ui/ui_pgProductList");

const PageProductList = extend(PageProductListDesign)(
    function(_super) {
        var self = this;
        _super(self);
        this.uiComponents = this;
        
        var tempLoad = this.onLoad;
        
        this.products = [];
        
        this.onLoad = function(){
            tempLoad();
            initListView.call(this, this.products);
        }
        
        this.onShow = onShow.bind(this);
        
        initHeaderBar(this.headerBar);
        initBackButton(self);
});

function onShow(params) {
    Router.sliderDrawer.enabled = true;
    
    if (params && params.collectionID) {
        Timer.setTimeout({
            delay: 300,
            task: function() {
                Shopify.Product.getAllProducts().collectionID(params.collectionID).fields(["id", "title", "variants", "image"]).exec(function(response) {
                    this.products = response.products;
                    this.uiComponents.categoryList.itemCount = Math.ceil(response.products.length / 2);
                    this.uiComponents.categoryList.refreshData();
                }.bind(this));
            }.bind(this)
        });
        this.headerBar.title = params.collectionName;
    }
}

function initHeaderBar(headerBar) {
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
            Router.go(PageConstants.PAGE_SHOPPING_CART, true);
        }
    });
    headerBar.title = lang["pgProductList.title"];
    headerBar.setLeftItem(leftItem);
    headerBar.setItems([shoppingCartItem]);
};

function initListView(products) {
    this.uiComponents.categoryList = new ListView({
        flexGrow:1,
        marginLeft:10, marginTop:10, marginRight:10,
        rowHeight: 232,
        itemCount: Math.ceil(products.length / 2),
        refreshEnabled: false,
        verticalScrollBarEnabled: false,
        backgroundColor: Color.TRANSPARENT
    });
    this.uiComponents.rootLayout.addChild(this.uiComponents.categoryList);
    
    this.uiComponents.categoryList.onRowCreate = function() {
        var listItem = new ListViewItem({
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexDirection: FlexLayout.FlexDirection.ROW,
		});
        listItem.leftBox = new FlexLayout({
            id: 11,
            flexGrow: 1, marginBottom:10,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			backgroundColor: Color.WHITE,
			borderRadius: 6
		});
		listItem.leftBox.productImage = new ImageView({
		    id:21,
		    height: 150,
		    marginLeft: 5, marginTop: 5, marginRight: 5,
			imageFillType: ImageView.FillType.STRETCH,
			positionType: FlexLayout.PositionType.RELATIVE,
		});
		listItem.leftBox.seperator = new FlexLayout({
		    id:23,
		    height: 1,
		    backgroundColor: Color.create(40, 0, 0, 0)
		});
		listItem.leftBox.productName = new Label({
		    id: 31,
			text: "Tortoise Sunglasses",
			textColor: Color.BLACK,
			height: 35,
			marginTop: 5, marginLeft: 5, marginRight: 5,
			textAlignment: TextAlignment.MIDCENTER,
			positionType: FlexLayout.PositionType.RELATIVE,
		});
		listItem.leftBox.productName.font = FONT_LATO_NORMAL_12;
		listItem.leftBox.productPrice = new Label({
		    id: 41,
			text: "$499",
			height: 20, marginBottom: 10,
			textAlignment: TextAlignment.MIDCENTER,
		});
		listItem.leftBox.productPrice.font = FONT_LATO_NORMAL_12;

        listItem.rightBox = new FlexLayout({
            id: 12,
            flexGrow: 1, marginLeft: 10, marginBottom:10,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			backgroundColor: Color.WHITE,
			borderRadius: 6
		});
		listItem.rightBox.productImage = new ImageView({
		    id: 22,
		    height:150,
		    marginLeft: 5, marginTop: 5, marginRight: 5,
			imageFillType: ImageView.FillType.STRETCH,
		});
		listItem.rightBox.seperator = new FlexLayout({
		    id:24,
		    height: 1,
		    backgroundColor: Color.create(40, 0, 0, 0)
		});
		listItem.rightBox.productName = new Label({
		    id: 32,
			text: "Tortoise Sunglasses",
			textColor: Color.BLACK,
			height: 35,
			marginTop: 5, marginLeft: 5, marginRight: 5,
			textAlignment: TextAlignment.MIDCENTER,
		});
		listItem.rightBox.productName.font = FONT_LATO_NORMAL_12;
		listItem.rightBox.productPrice = new Label({
		    id: 42,
			text: "$499",
			height: 20, marginBottom: 10,
			textAlignment: TextAlignment.MIDCENTER,
		});
		listItem.rightBox.productPrice.font = FONT_LATO_NORMAL_12;

        listItem.addChild(listItem.leftBox);
        listItem.leftBox.addChild(listItem.leftBox.productImage);
        listItem.leftBox.addChild(listItem.leftBox.seperator);
        listItem.leftBox.addChild(listItem.leftBox.productName);
        listItem.leftBox.addChild(listItem.leftBox.productPrice);
        listItem.addChild(listItem.rightBox);
        listItem.rightBox.addChild(listItem.rightBox.productImage);
        listItem.rightBox.addChild(listItem.rightBox.seperator);
        listItem.rightBox.addChild(listItem.rightBox.productName);
        listItem.rightBox.addChild(listItem.rightBox.productPrice);
        return listItem;
    };
    this.uiComponents.categoryList.onRowBind = function(listViewItem,index) {
        var leftProduct  = this.products[index * 2];
        var rightProduct = this.products[(index * 2) + 1];

        listViewItem.leftBox = listViewItem.findChildById(11);
        listViewItem.leftBox.findChildById(31).text  = leftProduct.title;
        listViewItem.leftBox.findChildById(41).text  = leftProduct.variants[0].price + " TL";
        listViewItem.leftBox.findChildById(21).loadFromUrl(leftProduct.image.src);
        listViewItem.leftBox.onTouchEnded = function() {
            Router.go(PageConstants.PAGE_PRODUCT_DETAIL, {productID: leftProduct.id}, true);
        };
        if (!rightProduct) {
            listViewItem.findChildById(12).visible = false;
        } else {
            listViewItem.rightBox = listViewItem.findChildById(12);
            listViewItem.rightBox.productID = rightProduct.id;
            listViewItem.rightBox.findChildById(32).text = rightProduct.title;
            listViewItem.rightBox.findChildById(42).text = rightProduct.variants[0].price + " TL";
            listViewItem.rightBox.findChildById(22).loadFromUrl(rightProduct.image.src);
            listViewItem.rightBox.onTouchEnded = function() {
                Router.go(PageConstants.PAGE_PRODUCT_DETAIL, {productID: rightProduct.id}, true);
            };
        }
    }.bind(this);
};

function initBackButton(page) {
	page.android.onBackButtonPressed = function() {
		Router.goBack();
	};
};

module && (module.exports = PageProductList);