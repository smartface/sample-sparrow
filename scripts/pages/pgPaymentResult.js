/* globals lang */
const extend = require('js-base/core/extend');
const PageDesign = require("../ui/ui_pgPaymentResult");
const PageConstants = require('pages/PageConstants');
const Data = require('sf-core/data');
const Notifications = require("sf-core/notifications");
const ShoppingCart = require("../objects/ShoppingCart");

const Page_ = extend(PageDesign)(
	// Constructor
	function(_super) {
		_super(this);
		this.resultText.text = lang["pgPaymentResult.accepted"];
		this.customHeaderBar.headerTitle.text = lang["pgPaymentResult.title"];

		this.btnContinueShopping.inenrButton.text = lang["pgPaymentResult.continue"];

		this.btnContinueShopping.inenrButton.onPress = function() {
			ShoppingCart.clearProducts();
			this.router.dismiss();
		}.bind(this);

		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	});

function onLoad(parentOnShow) {
	parentOnShow();
}

function onShow(parentOnLoad) {
	parentOnLoad();

	if (Data.getBooleanVariable("isNotificationAllowed")) {
		var notification = new Notifications.LocalNotification();
		notification.alertAction = lang["pgPaymentResult.notification.alertAction"];
		notification.alertBody = lang["pgPaymentResult.notification.alertBody"];
		notification.android.vibrate = true;
		notification.ios.hasAction = true;
		notification.present();
	}
}

module && (module.exports = Page_);
