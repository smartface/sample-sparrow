const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const PageDesign = require("../ui/ui_pgShipping");
const Router = require("sf-core/ui/router")
const PageConstants = require('pages/PageConstants');
const Image          = require('sf-core/ui/image');
const ShoppingCart	 = require("../objects/ShoppingCart");
const AlertView         = require('sf-core/ui/alertview');


const Page_ = extend(PageDesign)(
	// Constructor
	function(_super){
		_super(this, {
		    
		});
		
		this.totalPrice.text = "$" + ShoppingCart.getTotal().toFixed(2);
		this.firstName.hint = "First Name";
		this.lastName.hint = "Last Name";
		this.city.hint = "City";
		this.zip.hint = "Zip";
		this.phone.hint = "Phone";
		this.address.hint = "Address";
		this.email.hint = "Email";
		
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
		this.btnPayment.button1.text = lang["pgShipping.payment"];
		Router.sliderDrawer.enabled = false;
		
		this.totalPrice.onTouchEnded = function()
		{
			autoFill(this);
		}.bind(this)
		
		updateInputProps(inputArr);
});

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

module && (module.exports = Page_);