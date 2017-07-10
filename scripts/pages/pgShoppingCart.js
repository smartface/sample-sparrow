const extend				= require('js-base/core/extend');
const Page					= require('sf-core/ui/page');
const Color 				= require('sf-core/ui/color');
const PageDesign			= require("../ui/ui_pgShoppingCart");
const Router				= require("sf-core/ui/router")
const PageConstants 		= require('pages/PageConstants');
const Image         		= require('sf-core/ui/image');
const ItemCart				= require("../components/ItemCart");
const ListView      		= require('sf-core/ui/listview');
const ListViewItem  		= require('sf-core/ui/listviewitem');
const ShoppingCart			= require("../objects/ShoppingCart");
const StatusBarStyle    = require('sf-core/ui/statusbarstyle');

const Page_ = extend(PageDesign)(
	// Constructor
	function(_super){
		_super(this, {
		    onShow: function(){
    			this.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
		    }
		});
		this.inputPromoCode.hint = lang["pgShoppingCart.promocode"]
		this.btnCheckout.button1.onPress = function(){
		    Router.go(PageConstants.PAGE_SHIPPING,undefined,true);
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
    listView.itemCount = ShoppingCart.products.length;
    listView.refreshEnabled = false;
    listView.verticalScrollBarEnabled = false;
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
            
        // // if (index === page.myListView.itemCount-1) {
        // // 	listViewItem.findChildById(13).visible = false;
        // // }
    };

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