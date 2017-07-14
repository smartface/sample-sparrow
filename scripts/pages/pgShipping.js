const extend			= require('js-base/core/extend');
const Page				= require('sf-core/ui/page');
const Color 			= require('sf-core/ui/color');
const PageDesign		= require("../ui/ui_pgShipping");
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
		_super(this);
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));		
		initTextes.call(this);
		
		var inputArr = [this.firstName,this.lastName,this.city,this.zip,this.phone,this.address,this.email];
		
		this.btnPayment.button1.onPress = function(){
			if(checkFields(inputArr))
			{
				Router.go(PageConstants.PAGE_PAYMENT,undefined,true);
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
        this.customHeaderBar.headerTitle.text = lang["pgShipping.title"];
        this.customHeaderBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
		this.customHeaderBar.leftImage.onTouch = function()
		{
			Router.goBack();
		}
		Router.sliderDrawer.enabled = false;
		
		this.totalPrice.onTouchEnded = function()
		{
			autoFill(this);
		}.bind(this)
		
		updateInputProps(inputArr);
});

function onLoad(parentOnShow) {
    parentOnShow();
}

function onShow(parentOnLoad) {
    parentOnLoad();
}

function autoFill(page)
{
	page.firstName.text = "Darrell";
	page.lastName.text = "Gray";
	page.city.text = "Maasdriel";
	page.zip.text = "69217";
	page.phone.text = "656-976-4980";
	page.address.text = "1861 jan pieterszoon coenstraat";
	page.email.text = "darrel.gray@myemail.com";
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
	
	this.firstName.hint = "First Name";
	this.firstName.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTPERSONNAME : KeyboardType.DEFAULT;
	this.firstName.actionKeyType = ActionKeyType.NEXT;
	this.firstName.onActionButtonPress = function(){
		this.lastName.requestFocus();
	}.bind(this);
	
	this.lastName.hint = "Last Name";
	this.lastName.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTPERSONNAME : KeyboardType.DEFAULT;
	this.lastName.actionKeyType = ActionKeyType.NEXT;
	this.lastName.onActionButtonPress = function(){
		this.address.requestFocus();
	}.bind(this);

	this.address.hint = "Address";
	this.address.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTCAPWORDS : KeyboardType.DEFAULT;
	this.address.actionKeyType = ActionKeyType.NEXT;
	this.address.onActionButtonPress = function(){
		this.city.requestFocus();
	}.bind(this);
	
	this.city.hint = "City";
	this.city.keyboardType = System.OS === "Android" ? KeyboardType.android.TEXTCAPWORDS : KeyboardType.DEFAULT;
	this.city.actionKeyType = ActionKeyType.NEXT;
	this.city.onActionButtonPress = function(){
		this.zip.requestFocus();
	}.bind(this);
	
	this.zip.hint = "Zip";
	this.zip.keyboardType = KeyboardType.NUMBER;
	this.zip.actionKeyType = ActionKeyType.NEXT;
	this.zip.onActionButtonPress = function(){
		this.phone.requestFocus();
	}.bind(this);
	
	this.phone.hint = "Phone";
	this.phone.keyboardType = KeyboardType.PHONE;
	this.phone.actionKeyType = ActionKeyType.NEXT;
	this.phone.onActionButtonPress = function(){
		this.email.requestFocus();
	}.bind(this);
	
	
	this.email.hint = "Email";
	this.email.keyboardType = KeyboardType.EMAILADDRESS;
	this.email.actionKeyType = ActionKeyType.SEND;
	this.email.onActionButtonPress = function(){
		this.email.removeFocus();
	}.bind(this);
	
	this.btnPayment.button1.text = lang["pgShipping.payment"];
}

module && (module.exports = Page_);