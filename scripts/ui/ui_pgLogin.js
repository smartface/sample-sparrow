/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const ImageFillType = require('sf-core/ui/imagefilltype');
const TextBox = require('sf-core/ui/textbox');

const BtnTransparent = require("../components/BtnTransparent");
const HorizontalDivider = require("../components/HorizontalDivider");

const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgLogin_ = extend(Page)(
	//constructor
	function(_super, props) {
		// initalizes super class for this page scope
		_super(this, Object.assign({}, {
			onShow: onShow.bind(this),
			onLoad: onLoad.bind(this)
		}, props || {}));

		const rootlayoutStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: null,
			height: null,
			flexGrow: 1
		});
		var rootlayout = new FlexLayout(rootlayoutStyle);
		this.layout.addChild(rootlayout);
		
		const spriteLayoutStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			width: null,
			height: null,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var spriteLayout = new FlexLayout(spriteLayoutStyle);
		rootlayout.addChild(spriteLayout);
		this.spriteLayout = spriteLayout;

		const mainlayoutStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			width: null,
			height: null,
			flexGrow: 1
		});
		var mainlayout = new FlexLayout(mainlayoutStyle);
		rootlayout.addChild(mainlayout);
		
		const imagelayoutStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			flexGrow: 1,
			alignItems: FlexLayout.AlignItems.CENTER,
			justifyContent: FlexLayout.JustifyContent.CENTER
		});
		var imagelayout = new FlexLayout(imagelayoutStyle);
		mainlayout.addChild(imagelayout);
		
		const inputLayoutStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: 150,
			backgroundColor: Color.create(0, 255, 255, 255),
			marginLeft: 20,
			marginRight: 20,
			flexGrow: null
		});
		var inputLayout = new FlexLayout(inputLayoutStyle);
		mainlayout.addChild(inputLayout);
		this.inputLayout = inputLayout;

		const bottomlayoutStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			flexGrow: 1
		});
		var bottomlayout = new FlexLayout(bottomlayoutStyle);
		mainlayout.addChild(bottomlayout);
		this.bottomlayout = bottomlayout;

		const imageviewLogoStyle = getCombinedStyle(".imageView", {
			height: 150,
			image: Image.createFromFile("images://sparrow_logo.png"),
			imageFillType: ImageFillType.ASPECTFIT,
			width: 200
		});
		var imageviewLogo = new ImageView(imageviewLogoStyle);
		imagelayout.addChild(imageviewLogo);
		this.imageviewLogo = imageviewLogo;

		const flexlayout3Style = getCombinedStyle(".flexLayout", {
			left: 10,
			top: 10,
			right: 10,
			bottom: 10,
			width: null,
			height: null,
			backgroundColor: Color.create(102, 255, 255, 255),
			borderColor: Color.create(255, 255, 255, 255),
			borderRadius: 10,
			borderWidth: 1,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var flexlayout3 = new FlexLayout(flexlayout3Style);
		inputLayout.addChild(flexlayout3);
		
		const btnSignInStyle = getCombinedStyle(".flexLayout", {
			backgroundColor: Color.create(0, 255, 255, 255),
			left: 0,
			top: 0,
			width: 220,
			height: 50,
			borderColor: Color.create(77, 255, 255, 255),
			borderWidth: null,
			marginTop: 40,
			positionType: FlexLayout.PositionType.RELATIVE,
			alignSelf: FlexLayout.AlignSelf.CENTER
		});
		var btnSignIn = new BtnTransparent(btnSignInStyle, "pgLogin");
		bottomlayout.addChild(btnSignIn);
		this.btnSignIn = btnSignIn;

		const loadingImageStyle = getCombinedStyle(".imageView", {
			imageFillType: ImageFillType.ASPECTFIT,
			left: 0,
			right: 0,
			top: 40,
			height: 50,
			width: null,
			visible: false,
			positionType: FlexLayout.PositionType.ABSOLUTE
		});
		var loadingImage = new ImageView(loadingImageStyle);
		bottomlayout.addChild(loadingImage);
		this.loadingImage = loadingImage;

		const emailTextBoxStyle = getCombinedStyle(".textBox", {
			width: null,
			height: null,
			marginLeft: 20,
			marginRight: 20,
			text: "",
			flexGrow: 1
		});
		var emailTextBox = new TextBox(emailTextBoxStyle);
		flexlayout3.addChild(emailTextBox);
		this.emailTextBox = emailTextBox;

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
		var horizontalDivider = new HorizontalDivider(horizontalDividerStyle, "pgLogin");
		flexlayout3.addChild(horizontalDivider);
		
		const passwordTextBoxStyle = getCombinedStyle(".textBox", {
			width: null,
			height: null,
			marginLeft: 20,
			marginRight: 20,
			text: "",
			isPassword: true,
			flexGrow: 1
		});
		var passwordTextBox = new TextBox(passwordTextBoxStyle);
		flexlayout3.addChild(passwordTextBox);
		this.passwordTextBox = passwordTextBox;

		//assign the children to page 
		this.children = Object.assign({}, {
			rootlayout: rootlayout
		});
		
		//assign the children of rootlayout
		rootlayout.children = Object.assign({}, {
			spriteLayout: spriteLayout,
			mainlayout: mainlayout
		});
		
		//assign the children of mainlayout
		mainlayout.children = Object.assign({}, {
			imagelayout: imagelayout,
			inputLayout: inputLayout,
			bottomlayout: bottomlayout
		});
		
		//assign the children of imagelayout
		imagelayout.children = Object.assign({}, {
			imageviewLogo: imageviewLogo
		});
		
		//assign the children of inputLayout
		inputLayout.children = Object.assign({}, {
			flexlayout3: flexlayout3
		});
		
		//assign the children of bottomlayout
		bottomlayout.children = Object.assign({}, {
			btnSignIn: btnSignIn,
			loadingImage: loadingImage
		});
		
		//assign the children of flexlayout3
		flexlayout3.children = Object.assign({}, {
			emailTextBox: emailTextBox,
			horizontalDivider: horizontalDivider,
			passwordTextBox: passwordTextBox
		});
		
	});

// Page.onShow -> This event is called when a page appears on the screen (everytime).
function onShow() {
  //StatusBar props
  const statusBarStyle = getCombinedStyle(".statusBar", {});
	
	Object.assign(this.statusBar, statusBarStyle);
	
	if(statusBarStyle.color)
	  this.statusBar.android && (this.statusBar.android.color = statusBarStyle.color);
	if(statusBarStyle.style)
	  this.statusBar.ios && (this.statusBar.ios.style = statusBarStyle.style);

  //HeaderBar props
  const headerBarStyle = getCombinedStyle(".headerBar", {
		title: "newPage001",
		visible: false,
		backgroundColor: Color.create(0, 157, 27, 85)
	});
	
	Object.assign(this.headerBar,	headerBarStyle);
	
}

// Page.onLoad -> This event is called once when page is created.
function onLoad() { 

  const pageStyle = getCombinedStyle(".page", {
		backgroundColor: Color.create(255, 0, 0, 0)
	});
	
	Object.assign(this.layout, pageStyle);
	
}

module && (module.exports = PgLogin_);