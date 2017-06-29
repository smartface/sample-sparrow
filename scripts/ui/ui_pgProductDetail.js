/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const ImageView = require('sf-core/ui/imageview');
const ImageFillType = require('sf-core/ui/imagefilltype');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');
const Font = require('sf-core/ui/font');

const CustomHeaderBar = require("../components/CustomHeaderBar");
const BtnTransparent = require("../components/BtnTransparent");
const HorizontalDivider = require("../components/HorizontalDivider");
const ItemPickerSelector = require("../components/ItemPickerSelector");
const LoaderContainer = require("../components/LoaderContainer");
const VerticalDivider = require("../components/VerticalDivider");
const ItemSmallThumb = require("../components/ItemSmallThumb");

const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgProductDetail_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const customHeaderBarStyle = getCombinedStyle(".flexLayout", {
			left: null,
			top: null,
			width: null,
			height: 44,
			backgroundColor: Color.create(0, 255, 255, 255),
			paddingLeft: 5,
			paddingTop: 5,
			paddingRight: 5,
			paddingBottom: 5,
			marginTop: 20,
			marginRight: 5,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: null
		});
		var customHeaderBar = new CustomHeaderBar(customHeaderBarStyle, "pgProductDetail");
		this.layout.addChild(customHeaderBar);
		this.customHeaderBar = customHeaderBar;

		const flexlayout3Style = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			marginTop: 10,
			marginLeft: 10,
			marginRight: 10,
			marginBottom: 10,
			borderRadius: 10,
			borderWidth: 1,
			borderColor: Color.create(0, 0, 0, 0),
			flexGrow: 1
		});
		var flexlayout3 = new FlexLayout(flexlayout3Style);
		this.layout.addChild(flexlayout3);
		
		const btnAddToCartStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			left: 0,
			top: null,
			width: 240,
			height: 45,
			borderColor: Color.create(77, 255, 255, 255),
			borderWidth: null,
			marginBottom: 20,
			marginTop: 10,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.CENTER
		});
		var btnAddToCart = new BtnTransparent(btnAddToCartStyle, "pgProductDetail");
		this.layout.addChild(btnAddToCart);
		this.btnAddToCart = btnAddToCart;

		const effectImageStyle = getCombinedStyle(".imageView", {
			imageFillType: ImageFillType.ASPECTFIT,
			top: 70,
			left: 0,
			right: 0,
			width: null,
			height: 250,
			visible: false,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var effectImage = new ImageView(effectImageStyle);
		this.layout.addChild(effectImage);
		this.effectImage = effectImage;

		const flexlayout4Style = getCombinedStyle(".flexLayout", {
			height: null,
			width: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			flexGrow: 4
		});
		var flexlayout4 = new FlexLayout(flexlayout4Style);
		flexlayout3.addChild(flexlayout4);
		
		const flexlayout5Style = getCombinedStyle(".flexLayout", {
			height: null,
			width: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			paddingRight: 10,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW
		});
		var flexlayout5 = new FlexLayout(flexlayout5Style);
		flexlayout3.addChild(flexlayout5);
		
		const horizontaldivider_1Style = getCombinedStyle(".flexLayout", {
			left: 0,
			top: 0,
			width: null,
			height: 1,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.1,
			flexGrow: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var horizontaldivider_1 = new HorizontalDivider(horizontaldivider_1Style, "pgProductDetail");
		flexlayout3.addChild(horizontaldivider_1);
		
		const flexlayout5_1Style = getCombinedStyle(".flexLayout", {
			height: null,
			width: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			paddingLeft: 10,
			paddingTop: 10,
			flexGrow: 2
		});
		var flexlayout5_1 = new FlexLayout(flexlayout5_1Style);
		flexlayout3.addChild(flexlayout5_1);
		
		const horizontalDividerStyle = getCombinedStyle(".flexLayout", {
			left: 0,
			top: 0,
			width: null,
			height: 1,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.1,
			flexGrow: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var horizontalDivider = new HorizontalDivider(horizontalDividerStyle, "pgProductDetail");
		flexlayout3.addChild(horizontalDivider);
		
		const pickerContainerStyle = getCombinedStyle(".flexLayout", {
			height: null,
			width: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW
		});
		var pickerContainer = new FlexLayout(pickerContainerStyle);
		flexlayout3.addChild(pickerContainer);
		this.pickerContainer = pickerContainer;

		const itemPicker1Style = getCombinedStyle(".flexLayout", {
			left: 0,
			top: 0,
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			paddingLeft: 10,
			paddingRight: 10,
			flexDirection: FlexLayout.FlexDirection.ROW,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			alignContent: FlexLayout.AlignContent.CENTER,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var itemPicker1 = new ItemPickerSelector(itemPicker1Style, "pgProductDetail");
		pickerContainer.addChild(itemPicker1);
		this.itemPicker1 = itemPicker1;

		const bodyTextStyle = getCombinedStyle(".label", {
			width: null,
			height: null,
			textAlignment: TextAlignment.TOPLEFT,
			text: "",
			multiline: true,
			flexGrow: 1
		});
		var bodyText = new Label(bodyTextStyle);
		flexlayout5_1.addChild(bodyText);
		this.bodyText = bodyText;

		const loaderContainerStyle = getCombinedStyle(".flexLayout", {
			left: 0,
			top: 0,
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			right: 0,
			bottom: 0,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var loaderContainer = new LoaderContainer(loaderContainerStyle, "pgProductDetail");
		flexlayout4.addChild(loaderContainer);
		
		const flexlayout6Style = getCombinedStyle(".flexLayout", {
			height: null,
			width: null,
			paddingLeft: 10,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.FLEX_START
		});
		var flexlayout6 = new FlexLayout(flexlayout6Style);
		flexlayout5.addChild(flexlayout6);
		
		const priceTextStyle = getCombinedStyle(".label", {
			width: 80,
			textAlignment: TextAlignment.MIDRIGHT,
			height: null,
			text: "",
			font: Font.create("Arial", 20, Font.NORMAL)
		});
		var priceText = new Label(priceTextStyle);
		flexlayout5.addChild(priceText);
		this.priceText = priceText;

		const verticalDividerStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.1,
			left: 0,
			top: 0,
			width: 1,
			height: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var verticalDivider = new VerticalDivider(verticalDividerStyle, "pgProductDetail");
		pickerContainer.addChild(verticalDivider);
		
		const bigImageStyle = getCombinedStyle(".imageView", {
			width: null,
			height: null,
			imageFillType: ImageFillType.ASPECTFIT,
			flexGrow: 1
		});
		var bigImage = new ImageView(bigImageStyle);
		flexlayout4.addChild(bigImage);
		this.bigImage = bigImage;

		const itemPicker2Style = getCombinedStyle(".flexLayout", {
			left: 0,
			top: 0,
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			paddingLeft: 10,
			paddingRight: 10,
			visible: false,
			flexDirection: FlexLayout.FlexDirection.ROW,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER,
			alignContent: FlexLayout.AlignContent.CENTER,
			positionType: FlexLayout.PositionType.RELATIVE,
			flexGrow: 1
		});
		var itemPicker2 = new ItemPickerSelector(itemPicker2Style, "pgProductDetail");
		pickerContainer.addChild(itemPicker2);
		this.itemPicker2 = itemPicker2;

		const itemSmallThumb1Style = getCombinedStyle(".flexLayout .flexLayout-smallThumb.inactive", {
			left: 0,
			top: 0,
			width: 40,
			height: 40,
			borderColor: Color.create(26, 0, 0, 0),
			marginRight: 10,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var itemSmallThumb1 = new ItemSmallThumb(itemSmallThumb1Style, "pgProductDetail");
		flexlayout6.addChild(itemSmallThumb1);
		this.itemSmallThumb1 = itemSmallThumb1;

		const itemSmallThumb2Style = getCombinedStyle(".flexLayout .flexLayout-smallThumb.inactive", {
			left: 0,
			top: 0,
			width: 40,
			height: 40,
			borderColor: Color.create(26, 0, 0, 0),
			marginRight: 10,
			visible: false,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var itemSmallThumb2 = new ItemSmallThumb(itemSmallThumb2Style, "pgProductDetail");
		flexlayout6.addChild(itemSmallThumb2);
		this.itemSmallThumb2 = itemSmallThumb2;

		const itemSmallThumb3Style = getCombinedStyle(".flexLayout .flexLayout-smallThumb.inactive", {
			left: 0,
			top: 0,
			width: 40,
			height: 40,
			borderColor: Color.create(26, 0, 0, 0),
			marginRight: 10,
			visible: false,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var itemSmallThumb3 = new ItemSmallThumb(itemSmallThumb3Style, "pgProductDetail");
		flexlayout6.addChild(itemSmallThumb3);
		this.itemSmallThumb3 = itemSmallThumb3;

		//assign the children to page 
		this.children = Object.assign({}, {
			customHeaderBar: customHeaderBar,
			flexlayout3: flexlayout3,
			btnAddToCart: btnAddToCart,
			effectImage: effectImage
		});
		
		//assign the children of flexlayout3
		flexlayout3.children = Object.assign({}, {
			flexlayout4: flexlayout4,
			flexlayout5: flexlayout5,
			horizontaldivider_1: horizontaldivider_1,
			flexlayout5_1: flexlayout5_1,
			horizontalDivider: horizontalDivider,
			pickerContainer: pickerContainer
		});
		
		//assign the children of flexlayout4
		flexlayout4.children = Object.assign({}, {
			loaderContainer: loaderContainer,
			bigImage: bigImage
		});
		
		//assign the children of flexlayout5
		flexlayout5.children = Object.assign({}, {
			flexlayout6: flexlayout6,
			priceText: priceText
		});
		
		//assign the children of flexlayout5_1
		flexlayout5_1.children = Object.assign({}, {
			bodyText: bodyText
		});
		
		//assign the children of pickerContainer
		pickerContainer.children = Object.assign({}, {
			itemPicker1: itemPicker1,
			verticalDivider: verticalDivider,
			itemPicker2: itemPicker2
		});
		
		//assign the children of flexlayout6
		flexlayout6.children = Object.assign({}, {
			itemSmallThumb1: itemSmallThumb1,
			itemSmallThumb2: itemSmallThumb2,
			itemSmallThumb3: itemSmallThumb3
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
		color: Color.create(255, 157, 27, 85)
	});
	
	Object.assign(this.statusBar, statusBarStyle);
	
	if(statusBarStyle.color)
	  this.statusBar.android && (this.statusBar.android.color = statusBarStyle.color);
	if(statusBarStyle.style)
	  this.statusBar.ios && (this.statusBar.ios.style = statusBarStyle.style);

  //HeaderBar props
  const headerBarStyle = getCombinedStyle(".headerBar", {
		title: "newPage001",
		visible: false
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgProductDetail_);