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
const StatusBarStyle = require('sf-core/ui/statusbarstyle');

const CustomHeaderBar = require("../components/CustomHeaderBar");
const BtnTransparent = require("../components/BtnTransparent");
const HorizontalDivider = require("../components/HorizontalDivider");
const VerticalDivider = require("../components/VerticalDivider");

const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgShipping_ = extend(Page)(
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
		var customHeaderBar = new CustomHeaderBar(customHeaderBarStyle, "pgShipping");
		this.layout.addChild(customHeaderBar);
		this.customHeaderBar = customHeaderBar;

		const imageview1Style = getCombinedStyle(".imageView", {
			imageFillType: ImageFillType.ASPECTFIT,
			image: Image.createFromFile("images://steps2.png"),
			width: null,
			height: 40,
			marginLeft: 10,
			marginRight: 10
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
			backgroundColor: Color.create(255, 255, 255, 255),
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

		const totalPriceStyle = getCombinedStyle(".label .label-large", {
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
		var totalPrice = new Label(totalPriceStyle);
		if(totalPriceStyle.scrollEnabled === false)
			totalPrice.ios && (totalPrice.ios.scrollEnabled = false);
		this.layout.addChild(totalPrice);
		this.totalPrice = totalPrice;

		const btnPaymentStyle = getCombinedStyle(".flexLayout", {
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
		var btnPayment = new BtnTransparent(btnPaymentStyle, "pgShipping");
		this.layout.addChild(btnPayment);
		this.btnPayment = btnPayment;

		const flexlayout8Style = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			flexDirection: FlexLayout.FlexDirection.ROW,
			flexGrow: 1
		});
		var flexlayout8 = new FlexLayout(flexlayout8Style);
		flexlayout1.addChild(flexlayout8);
		this.flexlayout8 = flexlayout8;

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
		var horizontalDivider = new HorizontalDivider(horizontalDividerStyle, "pgShipping");
		flexlayout1.addChild(horizontalDivider);
		
		const addressStyle = getCombinedStyle(".textBox .textBox-centered", {
			height: null,
			width: null,
			text: "",
			flexGrow: 1
		});
		var address = new TextBox(addressStyle);
		if(addressStyle.hintTextColor)
			address.android && (address.android.hintTextColor = addressStyle.hintTextColor);
		if(addressStyle.elevation)
			address.android && (address.android.elevation = addressStyle.elevation);
		if(addressStyle.keyboardAppearance)
			address.ios && (address.ios.keyboardAppearance = addressStyle.keyboardAppearance);
		if(addressStyle.clearButtonEnabled)
			address.ios && (address.ios.clearButtonEnabled = addressStyle.clearButtonEnabled);
		if(addressStyle.minimumFontSize)
			address.ios && (address.ios.minimumFontSize = addressStyle.minimumFontSize);
		if(addressStyle.adjustFontSizeToFit)
			address.ios && (address.ios.adjustFontSizeToFit = addressStyle.adjustFontSizeToFit);
		flexlayout1.addChild(address);
		this.address = address;

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
		var horizontaldivider_1 = new HorizontalDivider(horizontaldivider_1Style, "pgShipping");
		flexlayout1.addChild(horizontaldivider_1);
		
		const flexlayout8_1Style = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			flexDirection: FlexLayout.FlexDirection.ROW,
			flexGrow: 1
		});
		var flexlayout8_1 = new FlexLayout(flexlayout8_1Style);
		flexlayout1.addChild(flexlayout8_1);
		this.flexlayout8_1 = flexlayout8_1;

		const horizontaldivider_2Style = getCombinedStyle(".flexLayout", {
			left: 0,
			top: 0,
			width: null,
			height: 1,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.1,
			flexGrow: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var horizontaldivider_2 = new HorizontalDivider(horizontaldivider_2Style, "pgShipping");
		flexlayout1.addChild(horizontaldivider_2);
		
		const phoneStyle = getCombinedStyle(".textBox .textBox-centered", {
			height: null,
			width: null,
			text: "",
			flexGrow: 1
		});
		var phone = new TextBox(phoneStyle);
		if(phoneStyle.hintTextColor)
			phone.android && (phone.android.hintTextColor = phoneStyle.hintTextColor);
		if(phoneStyle.elevation)
			phone.android && (phone.android.elevation = phoneStyle.elevation);
		if(phoneStyle.keyboardAppearance)
			phone.ios && (phone.ios.keyboardAppearance = phoneStyle.keyboardAppearance);
		if(phoneStyle.clearButtonEnabled)
			phone.ios && (phone.ios.clearButtonEnabled = phoneStyle.clearButtonEnabled);
		if(phoneStyle.minimumFontSize)
			phone.ios && (phone.ios.minimumFontSize = phoneStyle.minimumFontSize);
		if(phoneStyle.adjustFontSizeToFit)
			phone.ios && (phone.ios.adjustFontSizeToFit = phoneStyle.adjustFontSizeToFit);
		flexlayout1.addChild(phone);
		this.phone = phone;

		const horizontaldivider_1_1Style = getCombinedStyle(".flexLayout", {
			left: 0,
			top: 0,
			width: null,
			height: 1,
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.1,
			flexGrow: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var horizontaldivider_1_1 = new HorizontalDivider(horizontaldivider_1_1Style, "pgShipping");
		flexlayout1.addChild(horizontaldivider_1_1);
		
		const emailStyle = getCombinedStyle(".textBox .textBox-centered", {
			height: null,
			width: null,
			text: "",
			flexGrow: 1
		});
		var email = new TextBox(emailStyle);
		if(emailStyle.hintTextColor)
			email.android && (email.android.hintTextColor = emailStyle.hintTextColor);
		if(emailStyle.elevation)
			email.android && (email.android.elevation = emailStyle.elevation);
		if(emailStyle.keyboardAppearance)
			email.ios && (email.ios.keyboardAppearance = emailStyle.keyboardAppearance);
		if(emailStyle.clearButtonEnabled)
			email.ios && (email.ios.clearButtonEnabled = emailStyle.clearButtonEnabled);
		if(emailStyle.minimumFontSize)
			email.ios && (email.ios.minimumFontSize = emailStyle.minimumFontSize);
		if(emailStyle.adjustFontSizeToFit)
			email.ios && (email.ios.adjustFontSizeToFit = emailStyle.adjustFontSizeToFit);
		flexlayout1.addChild(email);
		this.email = email;

		const cityStyle = getCombinedStyle(".textBox .textBox-centered", {
			height: null,
			width: null,
			text: "",
			flexGrow: 1
		});
		var city = new TextBox(cityStyle);
		if(cityStyle.hintTextColor)
			city.android && (city.android.hintTextColor = cityStyle.hintTextColor);
		if(cityStyle.elevation)
			city.android && (city.android.elevation = cityStyle.elevation);
		if(cityStyle.keyboardAppearance)
			city.ios && (city.ios.keyboardAppearance = cityStyle.keyboardAppearance);
		if(cityStyle.clearButtonEnabled)
			city.ios && (city.ios.clearButtonEnabled = cityStyle.clearButtonEnabled);
		if(cityStyle.minimumFontSize)
			city.ios && (city.ios.minimumFontSize = cityStyle.minimumFontSize);
		if(cityStyle.adjustFontSizeToFit)
			city.ios && (city.ios.adjustFontSizeToFit = cityStyle.adjustFontSizeToFit);
		flexlayout8_1.addChild(city);
		this.city = city;

		const firstNameStyle = getCombinedStyle(".textBox .textBox-centered", {
			height: null,
			width: null,
			text: "",
			flexGrow: 1
		});
		var firstName = new TextBox(firstNameStyle);
		if(firstNameStyle.hintTextColor)
			firstName.android && (firstName.android.hintTextColor = firstNameStyle.hintTextColor);
		if(firstNameStyle.elevation)
			firstName.android && (firstName.android.elevation = firstNameStyle.elevation);
		if(firstNameStyle.keyboardAppearance)
			firstName.ios && (firstName.ios.keyboardAppearance = firstNameStyle.keyboardAppearance);
		if(firstNameStyle.clearButtonEnabled)
			firstName.ios && (firstName.ios.clearButtonEnabled = firstNameStyle.clearButtonEnabled);
		if(firstNameStyle.minimumFontSize)
			firstName.ios && (firstName.ios.minimumFontSize = firstNameStyle.minimumFontSize);
		if(firstNameStyle.adjustFontSizeToFit)
			firstName.ios && (firstName.ios.adjustFontSizeToFit = firstNameStyle.adjustFontSizeToFit);
		flexlayout8.addChild(firstName);
		this.firstName = firstName;

		const verticalDividerStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.1,
			left: 0,
			top: 0,
			width: 1,
			height: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var verticalDivider = new VerticalDivider(verticalDividerStyle, "pgShipping");
		flexlayout8.addChild(verticalDivider);
		
		const verticaldivider_1Style = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(255, 0, 0, 0),
			alpha: 0.1,
			left: 0,
			top: 0,
			width: 1,
			height: null,
			positionType: FlexLayout.PositionType.RELATIVE
		});
		var verticaldivider_1 = new VerticalDivider(verticaldivider_1Style, "pgShipping");
		flexlayout8_1.addChild(verticaldivider_1);
		
		const zipStyle = getCombinedStyle(".textBox .textBox-centered", {
			height: null,
			width: null,
			text: "",
			flexGrow: 1
		});
		var zip = new TextBox(zipStyle);
		if(zipStyle.hintTextColor)
			zip.android && (zip.android.hintTextColor = zipStyle.hintTextColor);
		if(zipStyle.elevation)
			zip.android && (zip.android.elevation = zipStyle.elevation);
		if(zipStyle.keyboardAppearance)
			zip.ios && (zip.ios.keyboardAppearance = zipStyle.keyboardAppearance);
		if(zipStyle.clearButtonEnabled)
			zip.ios && (zip.ios.clearButtonEnabled = zipStyle.clearButtonEnabled);
		if(zipStyle.minimumFontSize)
			zip.ios && (zip.ios.minimumFontSize = zipStyle.minimumFontSize);
		if(zipStyle.adjustFontSizeToFit)
			zip.ios && (zip.ios.adjustFontSizeToFit = zipStyle.adjustFontSizeToFit);
		flexlayout8_1.addChild(zip);
		this.zip = zip;

		const lastNameStyle = getCombinedStyle(".textBox .textBox-centered", {
			height: null,
			width: null,
			text: "",
			flexGrow: 1
		});
		var lastName = new TextBox(lastNameStyle);
		if(lastNameStyle.hintTextColor)
			lastName.android && (lastName.android.hintTextColor = lastNameStyle.hintTextColor);
		if(lastNameStyle.elevation)
			lastName.android && (lastName.android.elevation = lastNameStyle.elevation);
		if(lastNameStyle.keyboardAppearance)
			lastName.ios && (lastName.ios.keyboardAppearance = lastNameStyle.keyboardAppearance);
		if(lastNameStyle.clearButtonEnabled)
			lastName.ios && (lastName.ios.clearButtonEnabled = lastNameStyle.clearButtonEnabled);
		if(lastNameStyle.minimumFontSize)
			lastName.ios && (lastName.ios.minimumFontSize = lastNameStyle.minimumFontSize);
		if(lastNameStyle.adjustFontSizeToFit)
			lastName.ios && (lastName.ios.adjustFontSizeToFit = lastNameStyle.adjustFontSizeToFit);
		flexlayout8.addChild(lastName);
		this.lastName = lastName;

		//assign the children to page 
		this.children = Object.assign({}, {
			customHeaderBar: customHeaderBar,
			imageview1: imageview1,
			flexlayout1: flexlayout1,
			txtTotal: txtTotal,
			totalPrice: totalPrice,
			btnPayment: btnPayment
		});
		
		//assign the children of flexlayout1
		flexlayout1.children = Object.assign({}, {
			flexlayout8: flexlayout8,
			horizontalDivider: horizontalDivider,
			address: address,
			horizontaldivider_1: horizontaldivider_1,
			flexlayout8_1: flexlayout8_1,
			horizontaldivider_2: horizontaldivider_2,
			phone: phone,
			horizontaldivider_1_1: horizontaldivider_1_1,
			email: email
		});
		
		//assign the children of flexlayout8
		flexlayout8.children = Object.assign({}, {
			firstName: firstName,
			verticalDivider: verticalDivider,
			lastName: lastName
		});
		
		//assign the children of flexlayout8_1
		flexlayout8_1.children = Object.assign({}, {
			city: city,
			verticaldivider_1: verticaldivider_1,
			zip: zip
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {
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

  const pageStyle = getCombinedStyle(".page", {});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgShipping_);