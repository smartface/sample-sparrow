/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Button = require('sf-core/ui/button');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');
const TextBox = require('sf-core/ui/textbox');
const Switch = require('sf-core/ui/switch');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const PgPayment_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		});

		var rootLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(rootLayout);
		this.rootLayout = rootLayout;
		var stepLayout = new FlexLayout({
			height: 65,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(255, 194, 56, 42),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(stepLayout);
		this.stepLayout = stepLayout;
		var labelDescription = new Label({
			height: 40,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#000000"),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "Pay with Credit Card or PayPal"
		});
		labelDescription.font = Font.create("Lato", 14, Font.NORMAL); 
		rootLayout.addChild(labelDescription);
		this.labelDescription = labelDescription;
		var line = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(line);
		this.line = line;
		var fieldLayout = new FlexLayout({
			height: 250,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(0, 189, 16, 224),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(fieldLayout);
		this.fieldLayout = fieldLayout;
		var buttonPayCredit = new Button({
			left: 0,
			height: 50,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			marginLeft: 20,
			marginRight: 20,
			right: 0,
			bottom: 70,
			backgroundColor: Color.create("#00A1F1"),
			alpha: 1,
			borderColor: Color.create(0, 0, 0, 0),
			borderWidth: 1,
			textColor: Color.create("#FFFFFF"),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 25,
			visible: true,
		});
		buttonPayCredit.font = Font.create("Lato", 16, Font.NORMAL); 
		rootLayout.addChild(buttonPayCredit);
		this.buttonPayCredit = buttonPayCredit;
		var buttonPayPaypal = new Button({
			left: 0,
			height: 50,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			marginLeft: 20,
			marginRight: 20,
			right: 0,
			bottom: 10,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(128, 0, 0, 0),
			borderWidth: 1,
			textColor: Color.create(128, 0, 0, 0),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 25,
			visible: true,
		});
		buttonPayPaypal.font = Font.create("Lato", 16, Font.NORMAL); 
		rootLayout.addChild(buttonPayPaypal);
		this.buttonPayPaypal = buttonPayPaypal;
		var imageview1 = new ImageView({
			left: 20,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 20,
			bottom: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://steps3.png"),
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		stepLayout.addChild(imageview1);
		this.imageview1 = imageview1;
		var cardLayout = new FlexLayout({
			height: 55,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		fieldLayout.addChild(cardLayout);
		this.cardLayout = cardLayout;
		var line_2 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		fieldLayout.addChild(line_2);
		this.line_2 = line_2;
		var cardDetailLayout = new FlexLayout({
			height: 55,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		fieldLayout.addChild(cardDetailLayout);
		this.cardDetailLayout = cardDetailLayout;
		var line_2_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		fieldLayout.addChild(line_2_1);
		this.line_2_1 = line_2_1;
		var cardOwnerLayout = new FlexLayout({
			height: 55,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		fieldLayout.addChild(cardOwnerLayout);
		this.cardOwnerLayout = cardOwnerLayout;
		var line_2_1_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		fieldLayout.addChild(line_2_1_1);
		this.line_2_1_1 = line_2_1_1;
		var saveCardLayout = new FlexLayout({
			height: 55,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		fieldLayout.addChild(saveCardLayout);
		this.saveCardLayout = saveCardLayout;
		var cardLogo = new ImageView({
			top: 0,
			width: 50,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 20,
			bottom: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://icon_payment_default.png"),
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		cardLayout.addChild(cardLogo);
		this.cardLogo = cardLogo;
		var textboxCardOwner = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			marginLeft: 20,
			marginRight: 20,
			flexGrow: 1,
			backgroundColor: Color.create(0, 126, 211, 33),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxCardOwner.font = Font.create("Lato", 14, Font.NORMAL); 
		cardOwnerLayout.addChild(textboxCardOwner);
		this.textboxCardOwner = textboxCardOwner;
		var textboxExpireDate = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginLeft: 20,
			marginRight: 20,
			backgroundColor: Color.create(0, 126, 211, 33),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxExpireDate.font = Font.create("Lato", 14, Font.NORMAL); 
		cardDetailLayout.addChild(textboxExpireDate);
		this.textboxExpireDate = textboxExpireDate;
		var switch1 = new Switch({
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.CENTER,
			marginLeft: 20,
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			thumbOnColor: Color.create("#00e600"),
			thumbOffColor: Color.create("#CCCCCC"),
			toggleOnColor: Color.create("#CCCCCC"),
			toggle: false
		});
		switch1.android = { 
 			toggleOffColor: Color.create("#010101")
		}; 
		saveCardLayout.addChild(switch1);
		this.switch1 = switch1;
		var flexlayout1 = new FlexLayout({
			width: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 155, 155, 155),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		cardDetailLayout.addChild(flexlayout1);
		this.flexlayout1 = flexlayout1;
		var label2 = new Label({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginLeft: 10,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(128, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
			text: "Save for future purchases "
		});
		label2.font = Font.create("Lato", 14, Font.NORMAL); 
		saveCardLayout.addChild(label2);
		this.label2 = label2;
		var label1 = new Label({
			left: 20,
			top: 0,
			width: 100,
			height: 10,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			bottom: 0,
			marginTop: 5,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(128, 0, 0, 0),
			textAlignment: TextAlignment.TOPLEFT,
			visible: true,
			text: "Card Number"
		});
		label1.font = Font.create("Lato", 10, Font.NORMAL); 
		cardLayout.addChild(label1);
		this.label1 = label1;
		var textboxCardNumber = new TextBox({
			left: 0,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			bottom: 0,
			right: 0,
			marginLeft: 20,
			marginTop: 15,
			marginRight: 80,
			marginBottom: 5,
			backgroundColor: Color.create(0, 126, 211, 33),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.BOTTOMLEFT,
			visible: true,
		});
		textboxCardNumber.font = Font.create("Lato", 14, Font.NORMAL); 
		cardLayout.addChild(textboxCardNumber);
		this.textboxCardNumber = textboxCardNumber;
		var textboxSecurity = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginRight: 20,
			marginLeft: 20,
			backgroundColor: Color.create(0, 126, 211, 33),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxSecurity.font = Font.create("Lato", 14, Font.NORMAL); 
		cardDetailLayout.addChild(textboxSecurity);
		this.textboxSecurity = textboxSecurity;
		
		//assign the children to page 
		this.children = Object.assign({}, {
			rootLayout: rootLayout
		});
		
		//assign the children of rootLayout
		rootLayout.children =  Object.assign({}, {
			stepLayout: stepLayout,
			labelDescription: labelDescription,
			line: line,
			fieldLayout: fieldLayout,
			buttonPayCredit: buttonPayCredit,
			buttonPayPaypal: buttonPayPaypal
		});
		
		//assign the children of stepLayout
		stepLayout.children =  Object.assign({}, {
			imageview1: imageview1
		});
		
		//assign the children of fieldLayout
		fieldLayout.children =  Object.assign({}, {
			cardLayout: cardLayout,
			line_2: line_2,
			cardDetailLayout: cardDetailLayout,
			line_2_1: line_2_1,
			cardOwnerLayout: cardOwnerLayout,
			line_2_1_1: line_2_1_1,
			saveCardLayout: saveCardLayout
		});
		
		//assign the children of cardLayout
		cardLayout.children =  Object.assign({}, {
			cardLogo: cardLogo,
			label1: label1,
			textboxCardNumber: textboxCardNumber
		});
		
		//assign the children of cardDetailLayout
		cardDetailLayout.children =  Object.assign({}, {
			textboxExpireDate: textboxExpireDate,
			flexlayout1: flexlayout1,
			textboxSecurity: textboxSecurity
		});
		
		//assign the children of cardOwnerLayout
		cardOwnerLayout.children =  Object.assign({}, {
			textboxCardOwner: textboxCardOwner
		});
		
		//assign the children of saveCardLayout
		saveCardLayout.children =  Object.assign({}, {
			switch1: switch1,
			label2: label2
		});

});

function onLoad() { 

  this.headerBar.title = "Payment";
  this.headerBar.titleColor = Color.create(255, 255, 255, 255);
  this.headerBar.backgroundColor = Color.create(255, 194, 56, 42);
  this.headerBar.visible = true;
  this.statusBar.visible = true;this.statusBar.android && (this.statusBar.android.color = Color.create(255, 194, 56, 42));this.statusBar.ios && (this.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT);
  this.layout.alignContent = FlexLayout.AlignContent.STRETCH;
  this.layout.alignItems = FlexLayout.AlignItems.STRETCH;
  this.layout.direction = FlexLayout.Direction.INHERIT;
  this.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
  this.layout.flexWrap = FlexLayout.FlexWrap.NOWRAP;
  this.layout.justifyContent = FlexLayout.JustifyContent.FLEX_START;
  this.layout.backgroundColor = Color.create("#FFFFFF");

}

module && (module.exports = PgPayment_);