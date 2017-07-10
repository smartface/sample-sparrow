const extend			= require('js-base/core/extend');
const Page				= require('sf-core/ui/page');
const Color 			= require('sf-core/ui/color');
const PageDesign		= require("../ui/ui_pgPayment");
const Router			= require("sf-core/ui/router")
const PageConstants 	= require('pages/PageConstants');
const Image         	= require('sf-core/ui/image');
const ShoppingCart		= require("../objects/ShoppingCart");
const AlertView         = require('sf-core/ui/alertview');
const KeyboardType		= require('sf-core/ui/keyboardtype');
const System			= require('sf-core/device/system');
const ActionKeyType 	= require('sf-core/ui/actionkeytype');
const StatusBarStyle    = require('sf-core/ui/statusbarstyle');

const Page_ = extend(PageDesign)(
	// Constructor
	function(_super){
		_super(this, {
		    onShow: function(){
    			this.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
		    }
		});
		
		initTextes.call(this);
		
		var inputArr = [this.totalPrice,this.cardNumber,this.expiryDate,this.securityCode,this.nameOnCard];

		
		this.btnPay.button1.onPress = function(){
			if(checkFields(inputArr))
			{
				Router.go(PageConstants.PAGE_PAYMENT_RESULT,undefined,true);
			}else
			{
				var alertView = new AlertView({
		            title: "Missing Fields",
		            message: "Please fill all required fields."
		        });
		        alertView.addButton({
		            index: AlertView.ButtonType.POSITIVE,
		            text: "OK"
		        });
		        alertView.show();
			}
			
        }
        this.customHeaderBar.headerTitle.text = lang["pgPayment.title"]
        this.customHeaderBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
		this.customHeaderBar.leftImage.onTouch = function()
		{
			Router.goBack();
		}
		this.btnPay.button1.text = lang["pgPayment.pay"];
		Router.sliderDrawer.enabled = false;
		
		this.totalPrice.onTouchEnded = function()
		{
			autoFill(this);
		}.bind(this);
		
		updateInputProps(inputArr);
});

function autoFill(page)
{
	page.cardNumber.text = "8565689287348459";
	page.expiryDate.text = "05/20";
	page.securityCode.text = "889";
	page.nameOnCard.text = "Darrell Gray";
}

function updateInputProps(inputArr)
{
	for(var i = 0; i<inputArr.length; i++)
	{
		inputArr[i].ios.clearButtonEnabled = true;
	}
}

function checkFields(inputArr)
{
	for(var i = 0; i<inputArr.length; i++)
	{
		if(inputArr[i].text === "")
		{
			return false;
		}
	}
	return true;
}

function initTextes(){
	this.totalPrice.text = "$" + ShoppingCart.getTotal().toFixed(2);
	
	this.cardNumber.hint = "Card Number";
	this.cardNumber.keyboardType = KeyboardType.NUMBER;
	this.cardNumber.actionKeyType = ActionKeyType.NEXT;
	this.cardNumber.onActionButtonPress = function(){
		this.expiryDate.requestFocus();
	}.bind(this);
	
	this.expiryDate.hint = "Expiry Date";
	this.expiryDate.keyboardType = System.OS === "Android" ? KeyboardType.android.DATETIME : KeyboardType.DEFAULT;
	this.expiryDate.actionKeyType = ActionKeyType.NEXT;
	this.expiryDate.onActionButtonPress = function(){
		this.securityCode.requestFocus();
	}.bind(this);
	
	this.securityCode.hint = "Security Code";
	this.securityCode.keyboardType = KeyboardType.NUMBER;
	this.securityCode.actionKeyType = ActionKeyType.NEXT;
	this.securityCode.onActionButtonPress = function(){
		this.nameOnCard.requestFocus();
	}.bind(this);
	
	this.nameOnCard.hint = "Name on Card";
	this.nameOnCard.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTPERSONNAME : KeyboardType.DEFAULT;
	this.nameOnCard.actionKeyType = ActionKeyType.NEXT;
	this.nameOnCard.onActionButtonPress =  function(){
		this.nameOnCard.removeFocus();
	}.bind(this);
}


module && (module.exports = Page_);