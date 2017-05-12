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
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');
const Label = require('sf-core/ui/label');
const TextBox = require('sf-core/ui/textbox');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const PgShoppingCart_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		});

		var rootLayout = new FlexLayout({
			left: 0,
			top: -2,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 90,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(rootLayout);
		this.rootLayout = rootLayout;
		var buttonCheckout = new Button({
			left: 20,
			height: 50,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 20,
			bottom: 20,
			backgroundColor: Color.create(255, 171, 193, 54),
			alpha: 1,
			borderColor: Color.create(0, 0, 0, 0),
			borderWidth: 1,
			textColor: Color.create("#FFFFFF"),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 25,
			visible: true,
			text: "CHECKOUT"
		});
		buttonCheckout.font = Font.create("Lato", 16, Font.NORMAL); 
		this.layout.addChild(buttonCheckout);
		this.buttonCheckout = buttonCheckout;
		var flexlayout1 = new FlexLayout({
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
		rootLayout.addChild(flexlayout1);
		this.flexlayout1 = flexlayout1;
		var flexlayout2 = new FlexLayout({
			height: 50,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.ROW_REVERSE,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(flexlayout2);
		this.flexlayout2 = flexlayout2;
		var line = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(128, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(line);
		this.line = line;
		var listviewLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(listviewLayout);
		this.listviewLayout = listviewLayout;
		var line_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(128, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(line_1);
		this.line_1 = line_1;
		var flexlayout4 = new FlexLayout({
			height: 60,
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
		rootLayout.addChild(flexlayout4);
		this.flexlayout4 = flexlayout4;
		var line_1_1 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(128, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		rootLayout.addChild(line_1_1);
		this.line_1_1 = line_1_1;
		var imageview1 = new ImageView({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			marginLeft: 20,
			marginRight: 20,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://steps1.png"),
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		flexlayout1.addChild(imageview1);
		this.imageview1 = imageview1;
		var labelListAmount = new Label({
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
			text: "3 Items in Your Cart"
		});
		labelListAmount.font = Font.create("Lato", 14, Font.NORMAL); 
		flexlayout2.addChild(labelListAmount);
		this.labelListAmount = labelListAmount;
		var promoCode = new TextBox({
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(128, 0, 0, 0),
			textAlignment: TextAlignment.MIDCENTER,
			visible: true,
			text: "Promo Code"
		});
		promoCode.font = Font.create("Lato", 14, Font.NORMAL); 
		flexlayout4.addChild(promoCode);
		this.promoCode = promoCode;
		var labelClear = new Label({
			width: 45,
			height: 35,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginRight: 10,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(255, 0, 93, 202),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
			text: "Clear"
		});
		labelClear.font = Font.create("Arial", 14, Font.NORMAL); 
		flexlayout2.addChild(labelClear);
		this.labelClear = labelClear;
		var seperator = new FlexLayout({
			width: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(255, 155, 155, 155),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		flexlayout4.addChild(seperator);
		this.seperator = seperator;
		var flexlayout5 = new FlexLayout({
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
		flexlayout4.addChild(flexlayout5);
		this.flexlayout5 = flexlayout5;
		var label2_1 = new Label({
			left: 10,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			marginLeft: 10,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create(128, 0, 0, 0),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
			text: "Subtotal:"
		});
		label2_1.font = Font.create("Lato", 14, Font.NORMAL); 
		flexlayout5.addChild(label2_1);
		this.label2_1 = label2_1;
		var labelTotalPrice = new Label({
			top: 0,
			width: 100,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 10,
			bottom: 0,
			marginRight: 10,
			alignSelf: FlexLayout.AlignSelf.AUTO,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#000000"),
			textAlignment: TextAlignment.MIDRIGHT,
			visible: true,
			text: "$193"
		});
		labelTotalPrice.font = Font.create("Lato", 14, Font.NORMAL); 
		flexlayout5.addChild(labelTotalPrice);
		this.labelTotalPrice = labelTotalPrice;
		
		//assign the children to page 
		this.children = Object.assign({}, {
			rootLayout: rootLayout,
			buttonCheckout: buttonCheckout
		});
		
		//assign the children of rootLayout
		rootLayout.children =  Object.assign({}, {
			flexlayout1: flexlayout1,
			flexlayout2: flexlayout2,
			line: line,
			listviewLayout: listviewLayout,
			line_1: line_1,
			flexlayout4: flexlayout4,
			line_1_1: line_1_1
		});
		
		//assign the children of flexlayout1
		flexlayout1.children =  Object.assign({}, {
			imageview1: imageview1
		});
		
		//assign the children of flexlayout2
		flexlayout2.children =  Object.assign({}, {
			labelListAmount: labelListAmount,
			labelClear: labelClear
		});
		
		//assign the children of flexlayout4
		flexlayout4.children =  Object.assign({}, {
			promoCode: promoCode,
			seperator: seperator,
			flexlayout5: flexlayout5
		});
		
		//assign the children of flexlayout5
		flexlayout5.children =  Object.assign({}, {
			label2_1: label2_1,
			labelTotalPrice: labelTotalPrice
		});

});

function onLoad() { 

  this.headerBar.title = "Shopping Cart";
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

module && (module.exports = PgShoppingCart_);