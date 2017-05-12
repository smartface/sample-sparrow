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

// Get generetad UI code
var PageShoppingCartDesign = require("../ui/ui_pgShoppingCart");
var ShoppingCart = require("../ShoppingCart");

const FONT_LATO_NORMAL_14 = Font.create("Lato", 14, Font.NORMAL);

var _superOnLoad;
const PageShoppingCart = extend(PageShoppingCartDesign)(
    function(_super) {
        var self = this;
        _super(self);
        _superOnLoad = self.onLoad;
        
        var uiComponents = this;

        this.onShow = onShow.bind(this);
        this.onLoad = onLoad.bind(this);
        this.refreshList = refreshList.bind(this);
        this.updateFields = updateFields.bind(this);
        
        initHeaderBar(this.headerBar);
        this.updateFields();
        
        this.labelClear.onTouchEnded = function() {
        	ShoppingCart.clearProducts();
        	uiComponents.refreshList();
        };

        uiComponents.buttonCheckout.onPress = function() {
            Router.go(PageConstants.PAGE_SHIPPING, null, true);
        };
});

function onLoad() {
    _superOnLoad();
    var page = this;
    
    page.promoCode.hint = "Promo Code";
    page.promoCode.text = ""; // AND-2785

    page.myListView = new ListView({
        flexGrow:1,
        rowHeight: 90,
        itemCount: ShoppingCart.products.length,
        refreshEnabled: false
    });
    
    page.myListView.onRowCreate = function() {
        var myListViewItem = new ListViewItem({
        	height: 90,
        	alignContent: FlexLayout.AlignContent.STRETCH,
	        alignItems: FlexLayout.AlignItems.STRETCH,
	        justifyContent: FlexLayout.JustifyContent.FLEX_START,
	        flexWrap: FlexLayout.FlexWrap.NOWRAP,
        	flexDirection: FlexLayout.FlexDirection.ROW,
	        positionType: FlexLayout.PositionType.ABSOLUTE,
        	backgroundColor: Color.WHITE,
        });
        var cartItemImage = new ImageView({
            id: 10,
			width: 80,
			height: 80,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.CENTER,
			imageFillType: ImageView.FillType.ASPECTFIT,
			marginLeft: 5,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		myListViewItem.addChild(cartItemImage);
		
		var cartItemInfoLayout = new FlexLayout({
            id: 11,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginLeft: 5,
			marginTop: 5,
			marginBottom: 5,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		myListViewItem.addChild(cartItemInfoLayout);
		
		var cartItemBottomLine = new FlexLayout({
            id: 13,
            left: 0,
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(255, 204, 204, 204),
			alpha: 1,
			visible: true
		}); 
		myListViewItem.addChild(cartItemBottomLine);
		
		var cartItemPriceLabel = new Label({
            id: 14,
			left: 0,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 5,
			bottom: 0,
			marginRight: 5,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 127, 127, 127),
			textAlignment: TextAlignment.MIDRIGHT,
			visible: true,
			touchEnabled: false
		});
		cartItemPriceLabel.font = FONT_LATO_NORMAL_14; 
		myListViewItem.addChild(cartItemPriceLabel);
		
		var cartItemName = new Label({
		    id: 15,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#000000"),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true
		});
		cartItemName.font = FONT_LATO_NORMAL_14; 
		cartItemInfoLayout.addChild(cartItemName);
		
		var cartItemLayout1 = new FlexLayout({
		    id: 16,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		cartItemInfoLayout.addChild(cartItemLayout1);
		
		var flexlayout1 = new FlexLayout({
		    id: 17,
			width: 90,
			height: 35,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.CENTER,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 204, 204, 204),
			borderWidth: 1,
			borderRadius: 5,
			visible: true
		}); 
		cartItemLayout1.addChild(flexlayout1);
		
		var cartItemLabelPlus = new Label({
		    id: 18,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			textColor: Color.create(255, 204, 204, 204),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "+"
		});
		cartItemLabelPlus.font = Font.create("Lato", 26, Font.NORMAL); 
		flexlayout1.addChild(cartItemLabelPlus);
		
		var cartItemAmountLabel = new Label({
		    id: 19,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#000000"),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
		});
		cartItemAmountLabel.font = FONT_LATO_NORMAL_14; 
		flexlayout1.addChild(cartItemAmountLabel);
		
		var cartItemLabelMinus = new Label({
		    id: 20,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			textColor: Color.create(255, 204, 204, 204),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "-"
		});
		cartItemLabelMinus.font = Font.create("Lato", 26, Font.NORMAL); 
		flexlayout1.addChild(cartItemLabelMinus);
        return myListViewItem;
    };
    
    page.myListView.onRowBind = function(listViewItem,index) {
    	var cartItemInfoLayout = listViewItem.findChildById(11);
    	listViewItem.findChildById(10).loadFromUrl(ShoppingCart.products[index].image, null);
        cartItemInfoLayout.findChildById(15).text = ShoppingCart.products[index].title;
        listViewItem.findChildById(14).text = (ShoppingCart.products[index].amount * ShoppingCart.products[index].unit_price).toFixed(2) + " TL";
        
        var flexlayout1 = cartItemInfoLayout.findChildById(16)
            .findChildById(17);
        flexlayout1.findChildById(19).text = ShoppingCart.products[index].amount;
         
        flexlayout1.findChildById(18).onTouchEnded = function() { // plus
                ShoppingCart.products[index].amount += 1;
                page.refreshList();
            };
            
        flexlayout1.findChildById(20).onTouch = function() { // minus
                if (ShoppingCart.products[index].amount > 1) {
                    ShoppingCart.products[index].amount -= 1;
                    page.refreshList();
                }
            };
            
        if (index === page.myListView.itemCount-1) {
        	listViewItem.findChildById(13).visible = false;
        }
    };

    page.listviewLayout.addChild(this.myListView);
}

function refreshList() {
	this.myListView.itemCount = ShoppingCart.products.length;
    this.myListView.refreshData();
    this.updateFields();
};

function updateFields() {
    var totalPrice = 0;
    var totalAmount = 0;

    ShoppingCart.products.forEach(function(product){
        totalPrice  += (product.amount * product.unit_price);
        totalAmount += product.amount;
    });

	this.buttonCheckout.enabled = (ShoppingCart.products.length > 0);
    this.labelTotalPrice.text = ShoppingCart.getTotal().toFixed(2) + " TL";
	this.labelListAmount.text = totalAmount + " Item/s in Your Cart"; // TODO: language support!
};

function onShow() {
    Router.sliderDrawer.enabled = true;
}

function initHeaderBar(headerBar) {
    headerBar.title = lang["pgShoppingCart.title"];
    
    var leftItem = new HeaderBarItem({
        color: Color.WHITE,
        text: "",
        image: Image.createFromFile("images://icon_menu.png"),
        onPress: function() {
            Router.sliderDrawer.show();
        }
    });
    headerBar.setLeftItem(leftItem);

};

module && (module.exports = PageShoppingCart);