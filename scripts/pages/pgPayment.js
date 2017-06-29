const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const PageDesign = require("../ui/ui_pgPayment");
const Router = require("sf-core/ui/router")
const PageConstants = require('pages/PageConstants');
const Image          = require('sf-core/ui/image');
const ShoppingCart		= require("../objects/ShoppingCart");
const AlertView         = require('sf-core/ui/alertview');


const Page_ = extend(PageDesign)(
	// Constructor
	function(_super){
		_super(this, {
		    
		});
		
		this.totalPrice.text = "$" + ShoppingCart.getTotal().toFixed(2);
		this.cardNumber.hint = "Card Number";
		this.expiryDate.hint = "Expiry Date";
		this.securityCode.hint = "Security Code";
		this.nameOnCard.hint = "Name on Card";
		
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
	page.cardNumber.text = "8565-6892-8734-8459";
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


module && (module.exports = Page_);