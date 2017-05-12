/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const Button = require('sf-core/ui/button');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');
const Label = require('sf-core/ui/label');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');
const TextBox = require('sf-core/ui/textbox');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const PgShipping_ = extend(Page)(
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
		var flexlayout5 = new FlexLayout({
			height: 65,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 194, 56, 42),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(flexlayout5);
		this.flexlayout5 = flexlayout5;
		var flexlayout5_1 = new FlexLayout({
			height: 50,
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
		rootLayout.addChild(flexlayout5_1);
		this.flexlayout5_1 = flexlayout5_1;
		var flexlayout6 = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginBottom: 90,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(51, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(flexlayout6);
		this.flexlayout6 = flexlayout6;
		var buttonPayment = new Button({
			left: 20,
			height: 50,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 20,
			bottom: 20,
			backgroundColor: Color.create(255, 253, 161, 40),
			alpha: 1,
			borderColor: Color.create(0, 0, 0, 0),
			borderWidth: 1,
			textColor: Color.create("#FFFFFF"),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 25,
			visible: true,
			text: "PAYMENT"
		});
		buttonPayment.font = Font.create("Lato", 16, Font.NORMAL); 
		rootLayout.addChild(buttonPayment);
		this.buttonPayment = buttonPayment;
		var label2 = new Label({
			left: 0,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#000000"),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "Your Shipping Address & Contact Info"
		});
		label2.font = Font.create("Lato", 14, Font.NORMAL); 
		flexlayout5_1.addChild(label2);
		this.label2 = label2;
		var line_2 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(51, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(255, 155, 155, 155),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(line_2);
		this.line_2 = line_2;
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
			image: Image.createFromFile("images://steps2.png"),
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		flexlayout5.addChild(imageview1);
		
		var flexlayout7 = new FlexLayout({
			height: 50,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(flexlayout7);
		this.flexlayout7 = flexlayout7;
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
			borderColor: Color.create(255, 155, 155, 155),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(line);
		this.line = line;
		var textboxAddress = new TextBox({
			height: 50,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginLeft: 10,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxAddress.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout6.addChild(textboxAddress);
		this.textboxAddress = textboxAddress;
		var line_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(255, 155, 155, 155),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(line_1);
		this.line_1 = line_1;
		var flexlayout7_2 = new FlexLayout({
			height: 50,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(flexlayout7_2);
		this.flexlayout7_2 = flexlayout7_2;
		var line_1_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(51, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(line_1_1);
		this.line_1_1 = line_1_1;
		var textboxPhone = new TextBox({
			height: 50,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginLeft: 10,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxPhone.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout6.addChild(textboxPhone);
		this.textboxPhone = textboxPhone;
		var line_1_1_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(255, 155, 155, 155),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(line_1_1_1);
		this.line_1_1_1 = line_1_1_1;
		var flexlayout7_1_1 = new FlexLayout({
			height: 50,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(flexlayout7_1_1);
		this.flexlayout7_1_1 = flexlayout7_1_1;
		var line_1_1_1_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(255, 155, 155, 155),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(line_1_1_1_1);
		this.line_1_1_1_1 = line_1_1_1_1;
		var flexlayout7_1_1_1 = new FlexLayout({
			height: 50,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(flexlayout7_1_1_1);
		this.flexlayout7_1_1_1 = flexlayout7_1_1_1;
		var line_1_1_1_1_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(51, 0, 0, 0),
			alpha: 0.2,
			borderColor: Color.create(51, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout6.addChild(line_1_1_1_1_1);
		this.line_1_1_1_1_1 = line_1_1_1_1_1;
		var labelShipType = new Label({
			left: 10,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(128, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
			text: "Express Delivery (45 TL)"
		});
		labelShipType.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout7_1_1.addChild(labelShipType);
		this.labelShipType = labelShipType;
		var textboxName = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginLeft: 10,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxName.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout7.addChild(textboxName);
		this.textboxName = textboxName;
		var textboxCity = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginLeft: 10,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxCity.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout7_2.addChild(textboxCity);
		this.textboxCity = textboxCity;
		var label1 = new Label({
			left: 10,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(128, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
			text: "Total:"
		});
		label1.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout7_1_1_1.addChild(label1);
		this.label1 = label1;
		var flexlayout1_1 = new FlexLayout({
			width: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 155, 155, 155),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout7_2.addChild(flexlayout1_1);
		this.flexlayout1_1 = flexlayout1_1;
		var labelPrice = new Label({
			left: 0,
			top: -1,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 10,
			bottom: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDRIGHT,
			visible: true,
		});
		labelPrice.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout7_1_1_1.addChild(labelPrice);
		this.labelPrice = labelPrice;
		var flexlayout1 = new FlexLayout({
			width: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 155, 155, 155),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout7.addChild(flexlayout1);
		this.flexlayout1 = flexlayout1;
		var textboxZip = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginLeft: 10,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxZip.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout7_2.addChild(textboxZip);
		this.textboxZip = textboxZip;
		var textboxLastname = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginLeft: 10,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
		});
		textboxLastname.font = Font.create("Lato", 16, Font.NORMAL); 
		flexlayout7.addChild(textboxLastname);
		this.textboxLastname = textboxLastname;
		
		//assign the children to page 
		this.children = Object.assign({}, {
			rootLayout: rootLayout
		});
		
		//assign the children of rootLayout
		rootLayout.children =  Object.assign({}, {
			flexlayout5: flexlayout5,
			flexlayout5_1: flexlayout5_1,
			flexlayout6: flexlayout6,
			buttonPayment: buttonPayment
		});
		
		//assign the children of flexlayout5
		flexlayout5.children =  Object.assign({}, {
			imageview1: imageview1
		});
		
		//assign the children of flexlayout5_1
		flexlayout5_1.children =  Object.assign({}, {
			label2: label2
		});
		
		//assign the children of flexlayout6
		flexlayout6.children =  Object.assign({}, {
			line_2: line_2,
			flexlayout7: flexlayout7,
			line: line,
			textboxAddress: textboxAddress,
			line_1: line_1,
			flexlayout7_2: flexlayout7_2,
			line_1_1: line_1_1,
			textboxPhone: textboxPhone,
			line_1_1_1: line_1_1_1,
			flexlayout7_1_1: flexlayout7_1_1,
			line_1_1_1_1: line_1_1_1_1,
			flexlayout7_1_1_1: flexlayout7_1_1_1,
			line_1_1_1_1_1: line_1_1_1_1_1
		});
		
		//assign the children of flexlayout7
		flexlayout7.children =  Object.assign({}, {
			textboxName: textboxName,
			flexlayout1: flexlayout1,
			textboxLastname: textboxLastname
		});
		
		//assign the children of flexlayout7_2
		flexlayout7_2.children =  Object.assign({}, {
			textboxCity: textboxCity,
			flexlayout1_1: flexlayout1_1,
			textboxZip: textboxZip
		});
		
		//assign the children of flexlayout7_1_1
		flexlayout7_1_1.children =  Object.assign({}, {
			labelShipType: labelShipType
		});
		
		//assign the children of flexlayout7_1_1_1
		flexlayout7_1_1_1.children =  Object.assign({}, {
			label1: label1,
			labelPrice: labelPrice
		});

});

function onLoad() { 

  this.headerBar.title = "Shipping";
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

module && (module.exports = PgShipping_);