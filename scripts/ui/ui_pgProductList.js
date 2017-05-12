/* 
		WARNING 
		Auto generated file. 
		Do not modify its contents.
*/

const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const StatusBarStyle = require('sf-core/ui/statusbarstyle');



const PgProductList_ = extend(Page)(
	//constructor
	function(_super){
		// initalizes super class for this page scope
		_super(this, {
			onLoad: onLoad.bind(this),
			orientation: Page.Orientation.PORTRAIT
		});

		var rootLayout = new FlexLayout({
			left: 0,
			top: 0,
			alignContent: FlexLayout.AlignContent.STRETCH,
			alignItems: FlexLayout.AlignItems.STRETCH,
			justifyContent: FlexLayout.JustifyContent.FLEX_START,
			flexWrap: FlexLayout.FlexWrap.NOWRAP,
			flexDirection: FlexLayout.FlexDirection.COLUMN,
			positionType: FlexLayout.PositionType.ABSOLUTE,
			right: 0,
			bottom: 0,
			backgroundColor: Color.create(255, 65, 117, 10),
			alpha: 1,
			borderColor: Color.create(255, 0, 0, 0),
			borderWidth: 0,
			visible: true
		}); 
		this.layout.addChild(rootLayout);
		this.rootLayout = rootLayout;
		
		//assign the children to page 
		this.children = Object.assign({}, {
			rootLayout: rootLayout
		});

});

function onLoad() { 

  this.headerBar.title = "List";
  this.headerBar.titleColor = Color.create(255, 255, 255, 255);
  this.headerBar.backgroundColor = Color.create(255, 65, 117, 10);
  this.headerBar.visible = true;
  this.statusBar.visible = true;this.statusBar.android && (this.statusBar.android.color = Color.create(255, 65, 117, 10));this.statusBar.ios && (this.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT);
  this.layout.alignContent = FlexLayout.AlignContent.STRETCH;
  this.layout.alignItems = FlexLayout.AlignItems.STRETCH;
  this.layout.direction = FlexLayout.Direction.INHERIT;
  this.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
  this.layout.flexWrap = FlexLayout.FlexWrap.NOWRAP;
  this.layout.justifyContent = FlexLayout.JustifyContent.FLEX_START;
  this.layout.backgroundColor = Color.create("#FFFFFF");

}

module && (module.exports = PgProductList_);