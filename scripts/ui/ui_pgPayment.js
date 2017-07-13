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

const CustomHeaderBar = require("../components/CustomHeaderBar");
const BtnTransparent = require("../components/BtnTransparent");
const HorizontalDivider = require("../components/HorizontalDivider");
const VerticalDivider = require("../components/VerticalDivider");

const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgPayment_ = extend(Page)(
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
		var customHeaderBar = new CustomHeaderBar(customHeaderBarStyle, "pgPayment");
		this.layout.addChild(customHeaderBar);
		this.customHeaderBar = customHeaderBar;

		const imageview1Style = getCombinedStyle(".imageView", {
			imageFillType: ImageFillType.ASPECTFIT,
			image: Image.createFromFile("images://steps3.png"),
			width: null,
			height: 40
		});
		var imageview1 = new ImageView(imageview1Style);
		this.layout.addChild(imageview1);
		
		const totalPriceStyle = getCombinedStyle(".label .label-large", {
			width: null,
			left: null,
			right: null,
			marginLeft: 10,
			marginRight: 10,
			textAlignment: TextAlignment.TOPCENTER,
			text: "$0",
			height: 50,
			marginTop: 40,
			marginBottom: 20,
			alignSelf: FlexLayout.AlignSelf.STRETCH
		});
		var totalPrice = new Label(totalPriceStyle);
		if(totalPriceStyle.scrollEnabled === false)
			totalPrice.ios && (totalPrice.ios.scrollEnabled = false);
		this.layout.addChild(totalPrice);
		this.totalPrice = totalPrice;

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
		
		const btnPayStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			left: 0,
			top: 0,
			width: 250,
			height: 45,
			borderColor: Color.create(77, 255, 255, 255),
			borderWidth: null,
			marginBottom: 30,
			marginTop: 140,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.CENTER
		});
		var btnPay = new BtnTransparent(btnPayStyle, "pgPayment");
		this.layout.addChild(btnPay);
		this.btnPay = btnPay;

		const cardNumberStyle = getCombinedStyle(".textBox .textBox-centered", {
			width: null,
			height: null,
			textAlignment: TextAlignment.MIDCENTER,
			text: "",
			flexGrow: 1
		});
		var cardNumber = new TextBox(cardNumberStyle);
		if(cardNumberStyle.hintTextColor)
			cardNumber.android && (cardNumber.android.hintTextColor = cardNumberStyle.hintTextColor);
		if(cardNumberStyle.elevation)
			cardNumber.android && (cardNumber.android.elevation = cardNumberStyle.elevation);
		if(cardNumberStyle.keyboardAppearance)
			cardNumber.ios && (cardNumber.ios.keyboardAppearance = cardNumberStyle.keyboardAppearance);
		if(cardNumberStyle.clearButtonEnabled)
			cardNumber.ios && (cardNumber.ios.clearButtonEnabled = cardNumberStyle.clearButtonEnabled);
		if(cardNumberStyle.minimumFontSize)
			cardNumber.ios && (cardNumber.ios.minimumFontSize = cardNumberStyle.minimumFontSize);
		if(cardNumberStyle.adjustFontSizeToFit)
			cardNumber.ios && (cardNumber.ios.adjustFontSizeToFit = cardNumberStyle.adjustFontSizeToFit);
		flexlayout1.addChild(cardNumber);
		this.cardNumber = cardNumber;

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
		var horizontalDivider = new HorizontalDivider(horizontalDividerStyle, "pgPayment");
		flexlayout1.addChild(horizontalDivider);
		
		const flexlayout3Style = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			flexGrow: 1,
			flexDirection: FlexLayout.FlexDirection.ROW
		});
		var flexlayout3 = new FlexLayout(flexlayout3Style);
		flexlayout1.addChild(flexlayout3);
		
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
		var horizontaldivider_1 = new HorizontalDivider(horizontaldivider_1Style, "pgPayment");
		flexlayout1.addChild(horizontaldivider_1);
		
		const nameOnCardStyle = getCombinedStyle(".textBox .textBox-centered", {
			width: null,
			height: null,
			textAlignment: TextAlignment.MIDCENTER,
			text: "",
			flexGrow: 1
		});
		var nameOnCard = new TextBox(nameOnCardStyle);
		if(nameOnCardStyle.hintTextColor)
			nameOnCard.android && (nameOnCard.android.hintTextColor = nameOnCardStyle.hintTextColor);
		if(nameOnCardStyle.elevation)
			nameOnCard.android && (nameOnCard.android.elevation = nameOnCardStyle.elevation);
		if(nameOnCardStyle.keyboardAppearance)
			nameOnCard.ios && (nameOnCard.ios.keyboardAppearance = nameOnCardStyle.keyboardAppearance);
		if(nameOnCardStyle.clearButtonEnabled)
			nameOnCard.ios && (nameOnCard.ios.clearButtonEnabled = nameOnCardStyle.clearButtonEnabled);
		if(nameOnCardStyle.minimumFontSize)
			nameOnCard.ios && (nameOnCard.ios.minimumFontSize = nameOnCardStyle.minimumFontSize);
		if(nameOnCardStyle.adjustFontSizeToFit)
			nameOnCard.ios && (nameOnCard.ios.adjustFontSizeToFit = nameOnCardStyle.adjustFontSizeToFit);
		flexlayout1.addChild(nameOnCard);
		this.nameOnCard = nameOnCard;

		const expiryDateStyle = getCombinedStyle(".textBox .textBox-centered", {
			width: null,
			height: null,
			text: "",
			flexGrow: 1
		});
		var expiryDate = new TextBox(expiryDateStyle);
		if(expiryDateStyle.hintTextColor)
			expiryDate.android && (expiryDate.android.hintTextColor = expiryDateStyle.hintTextColor);
		if(expiryDateStyle.elevation)
			expiryDate.android && (expiryDate.android.elevation = expiryDateStyle.elevation);
		if(expiryDateStyle.keyboardAppearance)
			expiryDate.ios && (expiryDate.ios.keyboardAppearance = expiryDateStyle.keyboardAppearance);
		if(expiryDateStyle.clearButtonEnabled)
			expiryDate.ios && (expiryDate.ios.clearButtonEnabled = expiryDateStyle.clearButtonEnabled);
		if(expiryDateStyle.minimumFontSize)
			expiryDate.ios && (expiryDate.ios.minimumFontSize = expiryDateStyle.minimumFontSize);
		if(expiryDateStyle.adjustFontSizeToFit)
			expiryDate.ios && (expiryDate.ios.adjustFontSizeToFit = expiryDateStyle.adjustFontSizeToFit);
		flexlayout3.addChild(expiryDate);
		this.expiryDate = expiryDate;

		const verticalDividerStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.1,
			left: 0,
			top: 0,
			width: 1,
			height: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var verticalDivider = new VerticalDivider(verticalDividerStyle, "pgPayment");
		flexlayout3.addChild(verticalDivider);
		
		const securityCodeStyle = getCombinedStyle(".textBox .textBox-centered", {
			width: null,
			height: null,
			text: "",
			flexGrow: 1
		});
		var securityCode = new TextBox(securityCodeStyle);
		if(securityCodeStyle.hintTextColor)
			securityCode.android && (securityCode.android.hintTextColor = securityCodeStyle.hintTextColor);
		if(securityCodeStyle.elevation)
			securityCode.android && (securityCode.android.elevation = securityCodeStyle.elevation);
		if(securityCodeStyle.keyboardAppearance)
			securityCode.ios && (securityCode.ios.keyboardAppearance = securityCodeStyle.keyboardAppearance);
		if(securityCodeStyle.clearButtonEnabled)
			securityCode.ios && (securityCode.ios.clearButtonEnabled = securityCodeStyle.clearButtonEnabled);
		if(securityCodeStyle.minimumFontSize)
			securityCode.ios && (securityCode.ios.minimumFontSize = securityCodeStyle.minimumFontSize);
		if(securityCodeStyle.adjustFontSizeToFit)
			securityCode.ios && (securityCode.ios.adjustFontSizeToFit = securityCodeStyle.adjustFontSizeToFit);
		flexlayout3.addChild(securityCode);
		this.securityCode = securityCode;

		//assign the children to page 
		this.children = Object.assign({}, {
			customHeaderBar: customHeaderBar,
			imageview1: imageview1,
			totalPrice: totalPrice,
			flexlayout1: flexlayout1,
			btnPay: btnPay
		});
		
		//assign the children of flexlayout1
		flexlayout1.children = Object.assign({}, {
			cardNumber: cardNumber,
			horizontalDivider: horizontalDivider,
			flexlayout3: flexlayout3,
			horizontaldivider_1: horizontaldivider_1,
			nameOnCard: nameOnCard
		});
		
		//assign the children of flexlayout3
		flexlayout3.children = Object.assign({}, {
			expiryDate: expiryDate,
			verticalDivider: verticalDivider,
			securityCode: securityCode
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
		title: "newPage002",
		visible: false
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgPayment_);