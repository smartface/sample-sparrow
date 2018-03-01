/* globals lang, requireClass */
const extend = require('js-base/core/extend');
const PageDesign = require("../ui/ui_pgShoppingCart");
const Router = require("sf-core/ui/router");
const PageConstants = require('pages/PageConstants');
const Image = require('sf-core/ui/image');
const ItemCart = require("../components/ItemCart");
const ListViewItem = require('sf-core/ui/listviewitem');
const ShoppingCart = require("../objects/ShoppingCart");
const ActionKeyType = require('sf-core/ui/actionkeytype');
const System = require("sf-core/device/system");
const Color = require("sf-core/ui/color");
const AlertView = require('sf-core/ui/alertview');
const Direction = require('sf-core/ui/listview/direction');
const addChild = require("@smartface/contx/lib/smartface/action/addChild");

const Page_ = extend(PageDesign)(
    // Constructor
    function(_super) {
        _super(this);

        this.inputPromoCode.hint = lang["pgShoppingCart.promocode"];
        this.inputPromoCode.actionKeyType = ActionKeyType.SEND;
        this.inputPromoCode.onActionButtonPress = function() {
            this.inputPromoCode.removeFocus();
        }.bind(this);
        this.inputPromoCode.onEditEnds = function(e1, e2) {
            this.inputPromoCode.text = this.inputPromoCode.text.toLocaleUpperCase();
        }.bind(this);
        this.inputPromoCode.onTextChanged = function(e1, e2) {
            this.inputPromoCode.text = this.inputPromoCode.text.toLocaleUpperCase();
        }.bind(this);

        this.btnCheckout.inenrButton.onPress = function() {
            if (ShoppingCart.getTotal() > 0) {
                this.inputPromoCode.removeFocus();
                Router.go(PageConstants.PAGE_SHIPPING, {
                    fillLocation: true
                }, true);
            }
            else {
                alert(lang["pgShoppingCart.checkout.error"]);
            }
        }.bind(this);
        this.customHeaderBar.headerTitle.text = lang["pgShoppingCart.title"];
        this.customHeaderBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
        this.customHeaderBar.leftImage.onTouchEnded = function() {
            this.inputPromoCode.removeFocus();
            Router.goBack();
        }.bind(this);

        this.btnCheckout.inenrButton.text = lang["pgShoppingCart.checkout"];
        Router.sliderDrawer.enabled = false;

        this.onShow = onShow.bind(this, this.onShow.bind(this));
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.refreshList = refreshList.bind(this);
        this.updateFields = updateFields.bind(this);

        initListView(this, this.listView);
        this.updateFields();

    });

function onLoad(parentOnShow) {
    parentOnShow();
}

function onShow(parentOnLoad) {
    parentOnLoad();
    var page = this;
    changeLookByCartCount(page);
    this.inputPromoCode.removeFocus();
}

function initListView(page, listView) {

    listView.rowHeight = 100;
    listView.refreshEnabled = false;
    listView.verticalScrollBarEnabled = false;
    if (ShoppingCart.products.length > 0) {
        listView.ios.rightToLeftSwipeEnabled = true;
        listView.itemCount = ShoppingCart.products.length;
        var itemIndex = 0;
        listView.onRowCreate = function() {
            var myListViewItem = new ListViewItem();
            var item = new ItemCart();
            item.id = 200;
            myListViewItem.item = item;

            this.dispatch(addChild("item" + (++itemIndex), myListViewItem));
            myListViewItem.addChild(item, "item", "", function(style) {
                style.width = null;
                return style;
            });

            return myListViewItem;
        };
        listView.onRowBind = function(listViewItem, index) {
            var item = listViewItem.findChildById(200);
            item.product = ShoppingCart.products[index];

            item.btnPlus.onTouchEnded = function() { // plus
                ShoppingCart.products[index].amount += 1;
                page.refreshList();
            };
            item.btnMinus.onTouch = function() { // minus
                // if (ShoppingCart.products[index].amount > 1) {
                if (ShoppingCart.products[index].amount > 1) {
                    ShoppingCart.products[index].amount -= 1;
                    page.refreshList();
                }
            };
            if (System.OS === "Android") {
                const NativeView = requireClass("android.view.View");
                listViewItem.nativeObject.setOnLongClickListener(NativeView.OnLongClickListener.implement({
                    onLongClick: function(view) {
                        var confirmationAlert = new AlertView({
                            title: lang["alertView.confirmation"],
                            message: lang["pgShoppingCart.delete"]
                        });
                        confirmationAlert.addButton({
                            text: lang["delete"],
                            type: AlertView.Android.ButtonType.POSITIVE,
                            onClick: function() {
                                ShoppingCart.products.splice(index, 1);
                                page.refreshList();
                            }
                        });
                        confirmationAlert.addButton({
                            text: lang["cancel"],
                            type: AlertView.Android.ButtonType.NEGATIVE
                        });
                        confirmationAlert.show();
                        return true; // Returns always true to solve AND-2713 bug.
                    }
                }));
            }
        };
        listView.ios.onRowSwiped = function(direction, expansionSettings) {
            if (direction == Direction.RIGHTTOLEFT) {
                expansionSettings.fillOnTrigger = true; //if true the button fills the cell on trigger, else it bounces back to its initial position
                expansionSettings.threshold = 1.5; //Size proportional threshold to trigger the expansion button. Default value 1.5
                var deleteAction = new listView.ios.swipeItem(lang.delete, Color.RED, 15, function(e) {
                    ShoppingCart.products.splice(e.index, 1);
                    listView.itemCount = ShoppingCart.products.length;
                    listView.deleteRow(e.index);
                });
                return [deleteAction];
            }
        };
    }
}

function changeLookByCartCount(page) {
    if (ShoppingCart.products.length > 0) {
        hideElement(page.layoutLabel);
        showElement(page.layoutListView);
    }
    else {
        hideElement(page.layoutListView);
        showElement(page.layoutLabel);
        page.labelEmpty.text = lang["pgShoppingCart.empty"];
    }
}

function refreshList() {
    var page = this;
    this.listView.itemCount = ShoppingCart.products.length;
    this.listView.refreshData();
    this.updateFields();
    if (ShoppingCart.products.length === 0) {
        changeLookByCartCount(page);
    }
}

function updateFields() {
    var totalPrice = 0;
    var totalAmount = 0;

    ShoppingCart.products.forEach(function(product) {
        totalPrice += (product.amount * product.unit_price);
        totalAmount += product.amount;
    });

    this.btnCheckout.enabled = (ShoppingCart.products.length > 0);
    this.totalAmount.text = "$" + ShoppingCart.getTotal().toFixed(2);
}

function showElement(element) {
    element.flexGrow = 1;
    element.minHeight = NaN;
    element.minWidth = NaN;
    element.visible = true;
    element.parent.applyLayout();
}

function hideElement(element) {
    element.flexGrow = 0;
    element.minHeight = 0;
    // element.height = 0;
    element.minWidth = 0;
    element.visible = false;
    element.parent.applyLayout();
}

module && (module.exports = Page_);
