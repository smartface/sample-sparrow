/*globals lang*/
const extend = require('js-base/core/extend');
const PageDesign = require("../ui/ui_pgPayment");
const Router = require("sf-core/ui/router");
const PageConstants = require('pages/PageConstants');
const Image = require('sf-core/ui/image');
const ShoppingCart = require("../objects/ShoppingCart");
const AlertView = require('sf-core/ui/alertview');
const KeyboardType = require('sf-core/ui/keyboardtype');
const System = require('sf-core/device/system');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const knownCreditCardTypes = ["amex", "dinersclub", "discover", "jcb", "maestro", "mastercard", "mastercard", "visa", "visaelectron"];
const validDateRegex = /([01][0-9])\/([0-9]{2})/;
const creditcardutils = require('creditcardutils');

const Page_ = extend(PageDesign)(
	// Constructor
	function(_super) {
		_super(this);

		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		initTextes.call(this);

		var inputArr = [this.totalPrice, this.cardNumber, this.expiryDate, this.securityCode, this.nameOnCard];


		this.btnPay.inenrButton.onPress = function() {
			var alertOptions = {
				buttons: [{
					index: AlertView.Android.ButtonType.POSITIVE,
					text: lang.ok
				}]
			};

			switch (checkFields.call(this, inputArr)) {
				case "missing fields":
					alert(Object.assign({
						title: lang["pgPayment.missingFields.title"],
						message: lang["pgPayment.missingFields.message"]
					}, alertOptions));
					break;
				case "invalid creditcard":
					alert(Object.assign({
						title: lang["pgPayment.creditCard.title"],
						message: lang["pgPayment.creditCard.message"]
					}, alertOptions));
					break;
				case "invalid expire":
					alert(Object.assign({
						title: lang["pgPayment.expire.title"],
						message: lang["pgPayment.expire.message"]
					}, alertOptions));
					break;
				case "invalid securityCode":
					alert(Object.assign({
						title: lang["pgPayment.securityCode.title"],
						message: lang["pgPayment.securityCode.message"]
					}, alertOptions));
					break;
				default:
					this.cardNumber.removeFocus();
					Router.go(PageConstants.PAGE_PAYMENT_RESULT, null, true);
			}
		}.bind(this);
		this.customHeaderBar.headerTitle.text = lang["pgPayment.title"];
		this.customHeaderBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
		this.customHeaderBar.leftImage.onTouchEnded = function() {
			this.cardNumber.removeFocus();
			Router.goBack();
		}.bind(this);

		this.android.onBackButtonPressed = function() {
			this.cardNumber.removeFocus();
			Router.goBack();
		}.bind(this);
		
		this.totalPrice.onTouchEnded = function() {
 				
  			autoFill(this);	
  			assignCreditCardImage.call(this);
  		}.bind(this);

		this.btnPay.inenrButton.text = lang["pgPayment.pay"];
		Router.sliderDrawer.enabled = false;


		updateInputProps(inputArr);
	});

function onLoad(parentOnLoad) {
	parentOnLoad();
}

function onShow(parentOnShow) {
	parentOnShow();
}


function updateInputProps(inputArr) {
	for (var i = 0; i < inputArr.length; i++) {
		inputArr[i].ios.clearButtonEnabled = true;
	}
}

function checkFields(inputArr) {
	for (var i = 0; i < inputArr.length; i++) {
		if (inputArr[i].text === "") {
			return "missing fields";
		}
	}
	if (!creditcardutils.validateCardNumber(this.cardNumber.text))
		return "invalid creditcard";
	validDateRegex.lastIndex = 0;
	var dateExecResult = validDateRegex.exec(this.expiryDate.text);
	if (!dateExecResult)
		return "invalid expire";
	if (!creditcardutils.validateCardExpiry(dateExecResult[1], dateExecResult[2]))
		return "invalid expire";
	if (!creditcardutils.validateCardCVC(this.securityCode.text, creditcardutils.parseCardType(this.cardNumber.text)))
		return "invalid securityCode";
}

function initTextes() {
	this.totalPrice.text = "$" + ShoppingCart.getTotal().toFixed(2);

	this.cardNumber.hint = lang["pgPayment.cardNumber"];
	this.cardNumber.keyboardType = KeyboardType.NUMBER;
	this.cardNumber.actionKeyType = ActionKeyType.NEXT;
	this.cardNumber.onActionButtonPress = function() {
		this.expiryDate.requestFocus();
	}.bind(this);
	this.cardNumber.onTextChanged = function() {
		this.cardNumber.text = creditcardutils.formatCardNumber(this.cardNumber.text);
		assignCreditCardImage.call(this);
	}.bind(this);



	this.expiryDate.hint = lang["pgPayment.expiryDate"];
	this.expiryDate.keyboardType = System.OS === "Android" ? KeyboardType.android.DATETIME : KeyboardType.DEFAULT;
	this.expiryDate.actionKeyType = ActionKeyType.NEXT;
	this.expiryDate.onActionButtonPress = function() {
		this.securityCode.requestFocus();
	}.bind(this);
	this.expiryDate.onTextChanged = function(e) {
		if (e.insertedText.length === 0 && this.expiryDate.text.indexOf("/") === -1) { // delete
			this.expiryDate.text.substring(0, this.expiryDate.text.length - 1); //remove additional 1
		}
		else if (this.expiryDate.text.indexOf("/") === -1 && this.expiryDate.text.length >= 2) {
			this.expiryDate.text = this.expiryDate.text.substr(0, 2) + "/" + this.expiryDate.text.substr(2);
		}
	}.bind(this);

	this.securityCode.hint = lang["pgPayment.securityCode"];
	this.securityCode.keyboardType = KeyboardType.NUMBER;
	this.securityCode.actionKeyType = ActionKeyType.NEXT;
	this.securityCode.onActionButtonPress = function() {
		this.nameOnCard.requestFocus();
	}.bind(this);

	this.nameOnCard.hint = lang["pgPayment.nameOnCard"];
	this.nameOnCard.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTPERSONNAME : KeyboardType.DEFAULT;
	this.nameOnCard.actionKeyType = ActionKeyType.NEXT;
	this.nameOnCard.onActionButtonPress = function() {
		this.nameOnCard.removeFocus();
	}.bind(this);
}

function assignCreditCardImage() {
	var creditCardType = creditcardutils.parseCardType(this.cardNumber.text);
	var creaditCardImage = knownCreditCardTypes.indexOf(creditCardType) > -1 ?
		Image.createFromFile("images://" + creditCardType + ".png") :
		null;
	this.imgCreditCard.image = creaditCardImage;
}

function autoFill(page) {
  	page.cardNumber.text = "5555555555554444";
  	page.expiryDate.text = "05/20";	
  	page.securityCode.text = "889";		 
  	page.nameOnCard.text = "Darrell Gray";		  	
}


module && (module.exports = Page_);
