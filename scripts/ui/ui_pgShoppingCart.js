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
const Image = require('sf-core/ui/image');
const Label = require('sf-core/ui/label');
const TextAlignment = require('sf-core/ui/textalignment');
const TextBox = require('sf-core/ui/textbox');
const Font = require('sf-core/ui/font');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');

const CustomHeaderBar = require("../components/CustomHeaderBar");
const BtnTransparent = require("../components/BtnTransparent");
const HorizontalDivider = require("../components/HorizontalDivider");

const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgShoppingCart_ = extend(Page)(
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
			marginTop: null,
			marginRight: 5,
			flexDirection: FlexLayout.FlexDirection.ROW,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var customHeaderBar = new CustomHeaderBar(customHeaderBarStyle, "pgShoppingCart");
		this.layout.addChild(customHeaderBar);
		this.customHeaderBar = customHeaderBar;

		const imageview1Style = getCombinedStyle(".imageView", {
			imageFillType: ImageFillType.ASPECTFIT,
			image: Image.createFromFile("images://steps1.png"),
			width: null,
			height: 40,
			flexGrow: null,
			alignSelf: FlexLayout.AlignSelf.STRETCH
		});
		var imageview1 = new ImageView(imageview1Style);
		this.layout.addChild(imageview1);
		
		const flexlayout1Style = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			marginLeft: 10,
			marginRight: 10,
			marginTop: 15,
			marginBottom: 10,
			borderRadius: 5,
			flexGrow: 1,
			alignSelf: FlexLayout.AlignSelf.STRETCH
		});
		var flexlayout1 = new FlexLayout(flexlayout1Style);
		this.layout.addChild(flexlayout1);
		
		const txtTotalStyle = getCombinedStyle(".label .label-small.transparentWhite", {
			textAlignment: TextAlignment.BOTTOMCENTER,
			width: null,
			height: 20,
			marginLeft: 10,
			marginRight: 10,
			text: "TOTAL",
			marginTop: 30,
			alignSelf: FlexLayout.AlignSelf.STRETCH
		});
		var txtTotal = new Label(txtTotalStyle);
		if(txtTotalStyle.scrollEnabled === false)
			txtTotal.ios && (txtTotal.ios.scrollEnabled = false);
		this.layout.addChild(txtTotal);
		this.txtTotal = txtTotal;

		const totalAmountStyle = getCombinedStyle(".label .label-large", {
			width: null,
			left: null,
			right: null,
			marginLeft: 10,
			marginRight: 10,
			textAlignment: TextAlignment.TOPCENTER,
			text: "$0",
			height: 50,
			alignSelf: FlexLayout.AlignSelf.STRETCH
		});
		var totalAmount = new Label(totalAmountStyle);
		if(totalAmountStyle.scrollEnabled === false)
			totalAmount.ios && (totalAmount.ios.scrollEnabled = false);
		this.layout.addChild(totalAmount);
		this.totalAmount = totalAmount;

		const btnCheckoutStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			left: 0,
			top: 0,
			width: 240,
			height: 45,
			borderColor: Color.create(77, 255, 255, 255),
			borderWidth: null,
			marginBottom: 30,
			marginTop: 40,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.CENTER
		});
		var btnCheckout = new BtnTransparent(btnCheckoutStyle, "pgShoppingCart");
		this.layout.addChild(btnCheckout);
		this.btnCheckout = btnCheckout;

		const flexLayoutWrapperStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			flexGrow: 1
		});
		var flexLayoutWrapper = new FlexLayout(flexLayoutWrapperStyle);
		flexlayout1.addChild(flexLayoutWrapper);
		
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
		var horizontalDivider = new HorizontalDivider(horizontalDividerStyle, "pgShoppingCart");
		flexlayout1.addChild(horizontalDivider);
		
		const inputPromoCodeStyle = getCombinedStyle(".textBox .textBox-centered", {
			width: null,
			height: 60,
			textAlignment: TextAlignment.MIDCENTER,
			text: "",
			textColor: Color.create(255, 0, 0, 0),
			font: Font.create("Arial", 16, Font.NORMAL)
		});
		var inputPromoCode = new TextBox(inputPromoCodeStyle);
		if(inputPromoCodeStyle.hintTextColor)
			inputPromoCode.android && (inputPromoCode.android.hintTextColor = inputPromoCodeStyle.hintTextColor);
		if(inputPromoCodeStyle.elevation)
			inputPromoCode.android && (inputPromoCode.android.elevation = inputPromoCodeStyle.elevation);
		if(inputPromoCodeStyle.keyboardAppearance)
			inputPromoCode.ios && (inputPromoCode.ios.keyboardAppearance = inputPromoCodeStyle.keyboardAppearance);
		if(inputPromoCodeStyle.clearButtonEnabled)
			inputPromoCode.ios && (inputPromoCode.ios.clearButtonEnabled = inputPromoCodeStyle.clearButtonEnabled);
		if(inputPromoCodeStyle.minimumFontSize)
			inputPromoCode.ios && (inputPromoCode.ios.minimumFontSize = inputPromoCodeStyle.minimumFontSize);
		if(inputPromoCodeStyle.adjustFontSizeToFit)
			inputPromoCode.ios && (inputPromoCode.ios.adjustFontSizeToFit = inputPromoCodeStyle.adjustFontSizeToFit);
		flexlayout1.addChild(inputPromoCode);
		this.inputPromoCode = inputPromoCode;

		const listViewStyle = getCombinedStyle(".listView", {
			width: null,
			height: null,
			visible: true,
			flexGrow: 1
		});
		var listView = new ListView(listViewStyle);
		listView.onRowCreate = function(){ return new ListViewItem(); };
		flexLayoutWrapper.addChild(listView);
		this.listView = listView;

		const labelEmptyStyle = getCombinedStyle(".label", {
			width: null,
			height: null,
			textAlignment: TextAlignment.MIDCENTER,
			textColor: Color.create(128, 0, 0, 0),
			flexGrow: 0,
			font: Font.create("Arial", 16, Font.ITALIC)
		});
		var labelEmpty = new Label(labelEmptyStyle);
		if(labelEmptyStyle.scrollEnabled === false)
			labelEmpty.ios && (labelEmpty.ios.scrollEnabled = false);
		flexLayoutWrapper.addChild(labelEmpty);
		this.labelEmpty = labelEmpty;

		//assign the children to page 
		this.children = Object.assign({}, {
			customHeaderBar: customHeaderBar,
			imageview1: imageview1,
			flexlayout1: flexlayout1,
			txtTotal: txtTotal,
			totalAmount: totalAmount,
			btnCheckout: btnCheckout
		});
		
		//assign the children of flexlayout1
		flexlayout1.children = Object.assign({}, {
			flexLayoutWrapper: flexLayoutWrapper,
			horizontalDivider: horizontalDivider,
			inputPromoCode: inputPromoCode
		});
		
		//assign the children of flexLayoutWrapper
		flexLayoutWrapper.children = Object.assign({}, {
			listView: listView,
			labelEmpty: labelEmpty
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
		color: Color.create(255, 157, 27, 85),
		style: StatusBarStyle.LIGHTCONTENT
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

  const pageStyle = getCombinedStyle(".page", {
		alignItems: FlexLayout.AlignItems.AUTO,
		alignContent: FlexLayout.AlignContent.CENTER
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgShoppingCart_);