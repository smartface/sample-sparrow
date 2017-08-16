/* globals lang */
const extend = require('js-base/core/extend');
const PageDesign = require("../ui/ui_pgShipping");
const Router = require("sf-core/ui/router");
const PageConstants = require('pages/PageConstants');
const Image = require('sf-core/ui/image');
const ShoppingCart = require("../objects/ShoppingCart");
const AlertView = require('sf-core/ui/alertview');
const KeyboardType = require('sf-core/ui/keyboardtype');
const System = require('sf-core/device/system');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const AsYouTypeFormatter = require('google-libphonenumber').AsYouTypeFormatter;
var langCode = global.Device.language;
if (langCode === "en") langCode = "us";
const formatter = new AsYouTypeFormatter(langCode);
const reNumber = /[0-9]/;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const location = require("sf-extension-utils").location;
const Http = require("sf-core/net/http");
const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
const Page_ = extend(PageDesign)(
	// Constructor
	function(_super) {
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		initTextes.call(this);

		var inputArr = [this.firstName, this.lastName, this.city, this.zip, this.phone, this.address, this.email];

		this.btnPayment.inenrButton.onPress = function() {
			var alertOptions = {
				buttons: [{
					index: AlertView.Android.ButtonType.POSITIVE,
					text: lang.ok
				}]
			};
			switch (checkFields.call(this, inputArr)) {
				case "missing fields":
					alert(Object.assign({
						title: lang["pgShipping.missingFields.title"],
						message: lang["pgShipping.missingFields.message"]
					}, alertOptions));
					break;
				case "invalid phone":
					alert(Object.assign({
						title: lang["pgShipping.invalidPhone.title"],
						message: lang["pgShipping.invalidPhone.message"]
					}, alertOptions));

					break;
				case "invalid email":
					alert(Object.assign({
						title: lang["pgShipping.invalidEmail.title"],
						message: lang["pgShipping.invalidEmail.message"]
					}, alertOptions));
					break;
				default: //everything is OK!
					this.firstName.removeFocus();
					Router.go(PageConstants.PAGE_PAYMENT, null, true);
			}
		}.bind(this);
		this.customHeaderBar.headerTitle.text = lang["pgShipping.title"];
		this.customHeaderBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
		this.customHeaderBar.leftImage.onTouchEnded = function() {
			this.firstName.removeFocus();
			Router.goBack();
		}.bind(this);
		Router.sliderDrawer.enabled = false;

		this.android.onBackButtonPressed = function() {
			this.firstName.removeFocus();
			Router.goBack();
		}.bind(this);

		this.totalPrice.onTouchEnded = function() {
			autoFill(this);
		}.bind(this);

		updateInputProps(inputArr);
	});

function onLoad(parentOnShow) {
	parentOnShow();
}

function onShow(parentOnLoad, data) {
	const page = this;
	parentOnLoad();
	if (data) {
		if (data.fillLocation) {
			location.getLocation(function(err, location) {
				if (err) {
					console.log("location err");
					return;
				}
				var requestOptions = {
					'url': 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.latitude + ',' + location.longitude + '&sensor=true',
					'method': 'GET'
				};
				Http.request(requestOptions,
					function(response) {
						if (response.headers["Content-Type"] && response.headers["Content-Type"].indexOf("application/json") > -1) {
							var locationResponse = JSON.parse(response.body.toString());
							if (locationResponse.status === "OK" && locationResponse.results &&
								locationResponse.results[0]
							) {
								var result = locationResponse.results[0];
								var zip = lookupAddressComponent(result.address_components, "postal_code");
								var city = lookupAddressComponent(result.address_components, "locality") ||
									lookupAddressComponent(result.address_components, "administrative_area_level_1");
								var fullAddress = result.formatted_address;

								page.city.text = page.city.text || city;
								page.zip.text = page.zip.text || zip;
								page.address.text = page.address.text || fullAddress;
							}
						}
					},
					function() {
						console.log("failure http");
					}
				);
			});
		}
	}
}

function autoFill(page) {
	page.firstName.text = "Darrell";
	page.lastName.text = "Gray";
	page.city.text = "Maasdriel";
	page.zip.text = "69217";
	page.phone.text = "656-976-4980";
	page.address.text = "1861 jan pieterszoon coenstraat";
	page.email.text = "darrel.gray@myemail.com";
}

function updateInputProps(inputArr) {
	for (var i = 0; i < inputArr.length; i++) {
		inputArr[i].ios.clearButtonEnabled = true;
	}
}

//returns errors
function checkFields(inputArr) {
	for (var i = 0; i < inputArr.length; i++) {
		if (inputArr[i].text === "") {
			return "missing fields";
		}
	}
	try {
		phoneUtil.parse(this.phone.text, langCode);
	}
	catch (ex) {
		return "invalid phone";
	}

	emailRegex.lastIndex = 0;
	if (!emailRegex.test(this.email.text)) {
		return "invalid email";
	}

}

function initTextes() {
	this.totalPrice.text = "$" + ShoppingCart.getTotal().toFixed(2);

	this.firstName.hint = lang["pgShipping.firstName"];
	this.firstName.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTPERSONNAME : KeyboardType.DEFAULT;
	this.firstName.actionKeyType = ActionKeyType.NEXT;
	this.firstName.onActionButtonPress = function() {
		this.lastName.requestFocus();
	}.bind(this);

	this.lastName.hint = lang["pgShipping.lastName"];
	this.lastName.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTPERSONNAME : KeyboardType.DEFAULT;
	this.lastName.actionKeyType = ActionKeyType.NEXT;
	this.lastName.onActionButtonPress = function() {
		this.address.requestFocus();
	}.bind(this);

	this.address.hint = lang["pgShipping.address"];
	this.address.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTCAPWORDS : KeyboardType.DEFAULT;
	this.address.actionKeyType = ActionKeyType.NEXT;
	this.address.onActionButtonPress = function() {
		this.city.requestFocus();
	}.bind(this);

	this.city.hint = lang["pgShipping.city"];
	this.city.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTCAPWORDS : KeyboardType.DEFAULT;
	this.city.actionKeyType = ActionKeyType.NEXT;
	this.city.onActionButtonPress = function() {
		this.zip.requestFocus();
	}.bind(this);

	this.zip.hint = lang["pgShipping.zip"];
	this.zip.keyboardType = KeyboardType.NUMBER;
	this.zip.actionKeyType = ActionKeyType.NEXT;
	this.zip.onActionButtonPress = function() {
		this.phone.requestFocus();
	}.bind(this);

	this.phone.hint = lang["pgShipping.phone"];
	this.phone.keyboardType = KeyboardType.PHONE;
	this.phone.actionKeyType = ActionKeyType.NEXT;
	this.phone.onActionButtonPress = function() {
		this.email.requestFocus();
	}.bind(this);

	this.phone.onTextChanged = function() {
		formatter.clear();
		var latest = "";
		for (var i in this.phone.text) {
			var char = this.phone.text[i];
			reNumber.lastIndex = 0;
			if (!reNumber.test(char))
				continue;
			latest = formatter.inputDigit(char);
		}
		this.phone.text = latest;
	}.bind(this);


	this.email.hint = lang["pgShipping.email"];
	this.email.keyboardType = KeyboardType.EMAILADDRESS;
	this.email.actionKeyType = ActionKeyType.SEND;
	this.email.onActionButtonPress = function() {
		this.email.removeFocus();
	}.bind(this);

	this.btnPayment.inenrButton.text = lang["pgShipping.payment"];
}

module && (module.exports = Page_);

function lookupAddressComponent(address_components, type) {
	for (var i in address_components) {
		var c = address_components[i];
		if (c.types && c.types.indexOf(type) > -1) {
			return c.long_name;
		}
	}
	return "";
}
