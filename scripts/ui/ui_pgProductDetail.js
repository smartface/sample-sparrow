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
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');
const Button = require('sf-core/ui/button');
const ActivityIndicator = require('sf-core/ui/activityindicator');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const PgDetail_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		});

		var topLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 17,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(topLayout);
		this.topLayout = topLayout;
		var divide = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(32, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(divide);
		this.divide = divide;
		var bottomLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 13,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(bottomLayout);
		this.bottomLayout = bottomLayout;
		var imageLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 13,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		topLayout.addChild(imageLayout);
		this.imageLayout = imageLayout;
		var descriptionLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 9,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		bottomLayout.addChild(descriptionLayout);
		this.descriptionLayout = descriptionLayout;
		var priceAndOtherImages = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 4,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		topLayout.addChild(priceAndOtherImages);
		this.priceAndOtherImages = priceAndOtherImages;
		var divider1 = new FlexLayout({
			height: 0,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(33, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: false
		}); 
		bottomLayout.addChild(divider1);
		this.divider1 = divider1;
		var pickersLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: false
		}); 
		bottomLayout.addChild(pickersLayout);
		this.pickersLayout = pickersLayout;
		var divider2 = new FlexLayout({
			height: 1,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 0,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(32, 0, 0, 0),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		bottomLayout.addChild(divider2);
		this.divider2 = divider2;
		var buttonLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 4,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		bottomLayout.addChild(buttonLayout);
		this.buttonLayout = buttonLayout;
		var smallImagesLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 2,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			marginLeft: 10,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		priceAndOtherImages.addChild(smallImagesLayout);
		this.smallImagesLayout = smallImagesLayout;
		var labelDescription = new Label({
			left: 10,
			top: 5,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 10,
			bottom: 5,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#000000"),
			textAlignment: TextAlignment.MIDLEFT,
			visible: true,
			multiline: true
		});
		labelDescription.font = Font.create("Lato", 14, Font.NORMAL); 
		descriptionLayout.addChild(labelDescription);
		this.labelDescription = labelDescription;
		var optionLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			paddingLeft: 5,
			paddingRight: 5,
			paddingBottom: 5,
			paddingTop: 5,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		pickersLayout.addChild(optionLayout);
		this.optionLayout = optionLayout;
		var saleImageView = new ImageView({
			left: 305,
			top: 10,
			width: 60,
			height: 60,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 10,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: false,
			image: Image.createFromFile("images://sale.png"),
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		imageLayout.addChild(saleImageView);
		this.saleImageView = saleImageView;
		var buttonAddCart = new Button({
			width: 300,
			height: 50,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create(255, 65, 117, 10),
			alpha: 1,
			borderColor: Color.create(0, 0, 0, 0),
			borderWidth: 1,
			textColor: Color.create("#FFFFFF"),
			textAlignment: TextAlignment.MIDCENTER,
			borderRadius: 25,
			visible: true,
			text: "ADD TO CART"
		});
		buttonAddCart.font = Font.create("Lato", 16, Font.NORMAL); 
		buttonLayout.addChild(buttonAddCart);
		this.buttonAddCart = buttonAddCart;
		var activityindicator1 = new ActivityIndicator({
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.CENTER,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			color: Color.create(255, 65, 117, 5)
		}); 
		imageLayout.addChild(activityindicator1);
		this.activityindicator1 = activityindicator1;
		var priceLayout = new FlexLayout({
			alignContent: FlexLayout.AlignContent.AUTO,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		priceAndOtherImages.addChild(priceLayout);
		this.priceLayout = priceLayout;
		var productImageBig = new ImageView({
			left: 0,
			top: 0,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		imageLayout.addChild(productImageBig);
		this.productImageBig = productImageBig;
		var facebookShareImage = new ImageView({
			top: 10,
			width: 60,
			height: 40,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 10,
			backgroundColor: Color.create(0, 255, 255, 255),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true,
			image: Image.createFromFile("images://share_facebook.png"),
			imageFillType: ImageFillType.ASPECTFIT
		}); 
		imageLayout.addChild(facebookShareImage);
		this.facebookShareImage = facebookShareImage;
		var labelPrice = new Label({
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.STRETCH,
			flexGrow: 1,
			marginLeft: 3,
			marginRight: 10,
			backgroundColor: Color.create("#FFFFFF"),
			alpha: 1,
			borderColor: Color.create(25500, 0, 0, 0),
			borderWidth: 0,
			textColor: Color.create("#000000"),
			textAlignment: TextAlignment.MIDRIGHT,
			visible: true,
			text: "0TL"
		});
		labelPrice.font = Font.create("Lato", 20, Font.BOLD); 
		priceLayout.addChild(labelPrice);
		this.labelPrice = labelPrice;
		
		//assign the children to page 
		this.children = Object.assign({}, {
			topLayout: topLayout,
			divide: divide,
			bottomLayout: bottomLayout
		});
		
		//assign the children of topLayout
		topLayout.children =  Object.assign({}, {
			imageLayout: imageLayout,
			priceAndOtherImages: priceAndOtherImages
		});
		
		//assign the children of bottomLayout
		bottomLayout.children =  Object.assign({}, {
			descriptionLayout: descriptionLayout,
			divider1: divider1,
			pickersLayout: pickersLayout,
			divider2: divider2,
			buttonLayout: buttonLayout
		});
		
		//assign the children of imageLayout
		imageLayout.children =  Object.assign({}, {
			saleImageView: saleImageView,
			activityindicator1: activityindicator1,
			productImageBig: productImageBig,
			facebookShareImage: facebookShareImage
		});
		
		//assign the children of descriptionLayout
		descriptionLayout.children =  Object.assign({}, {
			labelDescription: labelDescription
		});
		
		//assign the children of priceAndOtherImages
		priceAndOtherImages.children =  Object.assign({}, {
			smallImagesLayout: smallImagesLayout,
			priceLayout: priceLayout
		});
		
		//assign the children of pickersLayout
		pickersLayout.children =  Object.assign({}, {
			optionLayout: optionLayout
		});
		
		//assign the children of buttonLayout
		buttonLayout.children =  Object.assign({}, {
			buttonAddCart: buttonAddCart
		});
		
		//assign the children of priceLayout
		priceLayout.children =  Object.assign({}, {
			labelPrice: labelPrice
		});

});

function onLoad() { 

  this.headerBar.titleColor = Color.create(255, 255, 255, 255);
  this.headerBar.backgroundColor = Color.create(255, 65, 117, 10);
  this.headerBar.visible = true;
  this.statusBar.visible = true;this.statusBar.android && (this.statusBar.android.color = Color.create(255, 65, 117, 10));this.statusBar.ios && (this.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT);
  this.layout.flexWrap = FlexLayout.FlexWrap.NOWRAP;
  this.layout.alignItems = FlexLayout.AlignItems.STRETCH;
  this.layout.alignContent = FlexLayout.AlignContent.FLEX_START;
  this.layout.justifyContent = FlexLayout.JustifyContent.FLEX_START;
  this.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
  this.layout.direction = FlexLayout.Direction.LTR;
  this.layout.backgroundColor = Color.create(255, 255, 255, 255);

}

module && (module.exports = PgDetail_);