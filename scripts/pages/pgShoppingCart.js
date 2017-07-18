const extend				= require('js-base/core/extend');
const PageDesign			= require("../ui/ui_pgShoppingCart");
const Router				= require("sf-core/ui/router");
const PageConstants 		= require('pages/PageConstants');
const Image         		= require('sf-core/ui/image');
const ItemCart				= require("../components/ItemCart");
const ListViewItem  		= require('sf-core/ui/listviewitem');
const ShoppingCart			= require("../objects/ShoppingCart");
const StatusBarStyle        = require('sf-core/ui/statusbarstyle');
const ActionKeyType         = require('sf-core/ui/actionkeytype');
const AlertUtil             = require("sf-extension-utils/alert");
const System                = require("sf-core/device/system");

const Page_ = extend(PageDesign)(
	// Constructor
	function(_super){
		_super(this);

		this.inputPromoCode.hint = lang["pgShoppingCart.promocode"];
		this.inputPromoCode.actionKeyType = ActionKeyType.SEND;
		this.inputPromoCode.onActionButtonPress = function() {
		    this.inputPromoCode.removeFocus();
		}.bind(this);
		this.inputPromoCode.onEditEnds = function(e1,e2) {
		    this.inputPromoCode.text = this.inputPromoCode.text.toLocaleUpperCase();
        }.bind(this);
		
		this.btnCheckout.button1.onPress = function(){
		    if(ShoppingCart.getTotal() > 0){
		        Router.go(PageConstants.PAGE_SHIPPING,undefined,true);
		    }
		    else{
		        AlertUtil.showAlert(lang["pgShoppingCart.checkout.error"]);
		    }
        }
        this.customHeaderBar.headerTitle.text = lang["pgShoppingCart.title"]
        this.customHeaderBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
		this.customHeaderBar.leftImage.onTouch = function()
		{
			Router.goBack();
		}
		
		this.btnCheckout.button1.text = lang["pgShoppingCart.checkout"];
		Router.sliderDrawer.enabled = false;
		
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.refreshList = refreshList.bind(this);
		this.updateFields = updateFields.bind(this);
	
		initListView(this,this.listView);
		this.updateFields();

});

function onLoad(parentOnShow) {
    parentOnShow();
}

function onShow(parentOnLoad) {
    parentOnLoad();
}

function initListView(page,listView) {
    
	listView.rowHeight = 100;
    listView.refreshEnabled = false;
    listView.verticalScrollBarEnabled = false;
    if(ShoppingCart.products.length > 0){
        page.labelEmpty.parent.removeChild(page.labelEmpty);
        listView.parent.applyLayout();
        listView.itemCount = ShoppingCart.products.length;
        
        listView.onRowCreate = function() {
            var myListViewItem = new ListViewItem();
            var item = new ItemCart();
            item.id = 200;
            myListViewItem.item = item;
            myListViewItem.addChild(item);
            return myListViewItem;
        };
        listView.onRowBind = function(listViewItem, index) {
        	listViewItem.item.product = ShoppingCart.products[index];
    
            listViewItem.item.btnPlus.onTouchEnded = function() { // plus
                ShoppingCart.products[index].amount += 1;
                page.refreshList();
            };
            listViewItem.item.btnMinus.onTouch = function() { // minus
                if (ShoppingCart.products[index].amount > 1) {
                    ShoppingCart.products[index].amount -= 1;
                    page.refreshList();
                }
            };
        };
    }
    else{
        listView.parent.removeChild(listView);
        page.labelEmpty.flexGrow = 1;
        page.labelEmpty.text = "Your Shopping Cart is Empty";
        page.labelEmpty.parent.applyLayout();
    }
}

function refreshList() {
	this.listView.itemCount = ShoppingCart.products.length;
    this.listView.refreshData();
    this.updateFields();
};

function updateFields() {
    var totalPrice = 0;
    var totalAmount = 0;

    ShoppingCart.products.forEach(function(product){
        totalPrice  += (product.amount * product.unit_price);
        totalAmount += product.amount;
    });

	this.btnCheckout.enabled = (ShoppingCart.products.length > 0);
    this.totalAmount.text = "$" + ShoppingCart.getTotal().toFixed(2);
};


module && (module.exports = Page_);