/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const Color = require('sf-core/ui/color');
const FlexLayout = require('sf-core/ui/flexlayout');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require('sf-core/ui/listviewitem');

const CustomHeaderBar = require("../components/CustomHeaderBar");
const LoaderContainer = require("../components/LoaderContainer");

const getCombinedStyle = require("library/styler-builder").getCombinedStyle;

const PgProductList_ = extend(Page)(
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
			flexGrow: null,
			alignSelf: FlexLayout.AlignSelf.AUTO
		});
		var customHeaderBar = new CustomHeaderBar(customHeaderBarStyle, "pgProductList");
		this.layout.addChild(customHeaderBar);
		this.customHeaderBar = customHeaderBar;

		const listViewContainerStyle = getCombinedStyle(".flexLayout", {
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			marginLeft: 10,
			marginRight: 10,
			marginTop: 5,
			flexGrow: 1
		});
		var listViewContainer = new FlexLayout(listViewContainerStyle);
		this.layout.addChild(listViewContainer);
		
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
			positionType: FlexLayout.PositionType.ABSOLUTE,
			flexGrow: null
		});
		var loaderContainer = new LoaderContainer(loaderContainerStyle, "pgProductList");
		listViewContainer.addChild(loaderContainer);
		this.loaderContainer = loaderContainer;

		const listViewStyle = getCombinedStyle(".listView", {
			width: null,
			height: null,
			backgroundColor: Color.create(0, 255, 255, 255),
			flexGrow: 1
		});
		var listView = new ListView(listViewStyle);
		listView.onRowCreate = function(){ return new ListViewItem(); };
		listViewContainer.addChild(listView);
		this.listView = listView;

		//assign the children to page 
		this.children = Object.assign({}, {
			customHeaderBar: customHeaderBar,
			listViewContainer: listViewContainer
		});
		
		//assign the children of listViewContainer
		listViewContainer.children = Object.assign({}, {
			loaderContainer: loaderContainer,
			listView: listView
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

module && (module.exports = PgProductList_);