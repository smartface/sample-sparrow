/* globals lang */

const Router = require("sf-core/ui/router");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const ImageView = require('sf-core/ui/imageview');
const Image = require('sf-core/ui/image');
const Font = require('sf-core/ui/font');
const Label = require("sf-core/ui/label");
const TextAlignment = require('sf-core/ui/textalignment');
const ListView = require('sf-core/ui/listview');
const ListViewItem = require("sf-core/ui/listviewitem");
const SliderDrawer = require('sf-core/ui/sliderdrawer');
const PageConstants = require('pages/PageConstants');
const AlertView = require('sf-core/ui/alertview');
const stylerBuilder = require("library/styler-builder");
const componentContextPatch = require("@smartface/contx/lib/smartface/componentContextPatch");

const addChild = require("@smartface/contx/lib/smartface/action/addChild");

// Making workaround due to IOS-2306
var currentPageTag = PageConstants.PAGE_CATEGORIES;


var iconCatalog = Image.createFromFile("images://icon_catalog.png");
var iconcart = Image.createFromFile("images://cart.png");
var iconSettings = Image.createFromFile("images://ic_settings.png");

var myDataSet = [{
        title: lang["pgCategories.title"],
        icon: iconCatalog,
        tag: PageConstants.PAGE_CATEGORIES,
        singleton: true
    },
    {
        title: lang["pgShoppingCart.title"],
        icon: iconcart,
        tag: PageConstants.PAGE_SHOPPING_CART
    },
    {
        title: lang["pgSettings.title"],
        icon: iconSettings,
        tag: PageConstants.PAGE_SETTINGS
    }
];

var mainContainer = new FlexLayout();
mainContainer.left = 0;
mainContainer.right = 0;
mainContainer.bottom = 0;
mainContainer.top = 0;
mainContainer.positionType = FlexLayout.PositionType.ABSOLUTE;
// mainContainer.backgroundColor = Color.create("#FF9900")

var topContainer = new FlexLayout();
topContainer.flexGrow = 1;
topContainer.flexBasis = 1;
topContainer.justifyContent = FlexLayout.JustifyContent.CENTER;
topContainer.alignItems = FlexLayout.AlignItems.CENTER;
topContainer.padding = 10;
topContainer.marginTop = 20;

var profileImage = new ImageView();
profileImage.image = Image.createFromFile("images://sparrow_logo.png");
profileImage.maxHeight = 60;
profileImage.imageFillType = ImageView.FillType.ASPECTFIT;

topContainer.addChild(profileImage);

var dividerTop = new FlexLayout();
dividerTop.height = 1;
dividerTop.backgroundColor = Color.create('#20FFFFFF');


var listView;

var dividerBottom = new FlexLayout();
dividerBottom.height = 1;
dividerBottom.backgroundColor = Color.create('#20FFFFFF');

var btnSignOut = new Label();
btnSignOut.height = 60;
btnSignOut.font = Font.create("Lato", 16, Font.NORMAL);
btnSignOut.backgroundColor = Color.TRANSPARENT;
btnSignOut.textColor = Color.WHITE;
btnSignOut.textAlignment = TextAlignment.MIDLEFT;
btnSignOut.text = lang["pgSliderDrawer.signout"];
btnSignOut.alpha = 0.5;
btnSignOut.marginLeft = 30;
btnSignOut.touchEnabled = true;

btnSignOut.onTouchEnded = function() {
    alert({
        title: lang["appName"],
        message: lang["quitConfirm"],
        buttons: [{
                index: AlertView.ButtonType.NEGATIVE,
                text: lang["cancel"]
            }, {
                index: AlertView.ButtonType.POSITIVE,
                text: lang["ok"],
                onClick: function() {
                    // Wait until fixed COR-1506
                    Router.goBack(PageConstants.PAGE_LOGIN, { isSignOut: true }, true);
                    Router.sliderDrawer.hide();

                    if (global.facebookEnabled) {
                        const Facebook = require("sf-plugin-facebook");
                        console.log("in condition facebook is " + global.facebookEnabled);
                        Facebook.logOut();
                    }
                }
            }


        ]
    });
};

var sliderDrawer = new SliderDrawer();
sliderDrawer.width = 250;
Router._superGo = Router.go;
Router._superGoBack = Router.goBack;

Router.go = function(tag, parameters, animated) {
    Router._superGo(tag, parameters, animated);
    listView && listView.refreshData();
};

Router.goBack = function(tag, animated) {
    Router._superGoBack(tag, animated);
    listView && listView.refreshData();
};
var sliderDrawerLoaded = false;
sliderDrawer.onLoad = function() {
    if (sliderDrawerLoaded)
        return;
    sliderDrawerLoaded = true;
    
    var itemIndex = 0;
    listView = new ListView({
        itemCount: myDataSet.length,
        refreshEnabled: false,
        rowHeight: 60,
        flexGrow: 2,
        backgroundColor: Color.TRANSPARENT,
        onRowCreate: function() {
            var rowImage = new ImageView({
                id: 3,
                width: 50,
                imageFillType: ImageView.FillType.ASPECTFIT,
                margin: 10,
            });

            var rowTitle = new Label();
            rowTitle.flexGrow = 1;
            rowTitle.flexBasis = 1;
            rowTitle.minWidth = 150;
            rowTitle.id = 4;
            rowTitle.font = Font.create("Lato", 18, Font.NORMAL);
            rowTitle.backgroundColor = Color.TRANSPARENT;
            rowTitle.textColor = Color.WHITE;
            rowTitle.textAlignment = TextAlignment.MIDLEFT;

            var rowTemplate = new ListViewItem();
            rowTemplate.alignItems = FlexLayout.AlignItems.STRETCH;
            rowTemplate.flexDirection = FlexLayout.FlexDirection.ROW;
            rowTemplate.paddingLeft = 10;
            rowTemplate.paddingTop = 5;
            rowTemplate.paddingBottom = 5;

            rowTemplate.alpha = 0.5;
            rowTemplate.image = rowImage;
            listView.dispatch(addChild(`item${++itemIndex}`, rowTemplate));
            rowTemplate.addChild(rowImage, "rowImage", "", function(style) {
                return style;
            });
            rowTemplate.title = rowTitle;
            rowTemplate.addChild(rowTitle, "rowTitle", "", function(style) {
                return style;
            });
            return rowTemplate;
        },
        onRowBind: function(listViewItem, index) {
            listViewItem.title.text = myDataSet[index].title;

            var rowImage = listViewItem.findChildById(3);
            listViewItem.image.image = myDataSet[index].icon;
            if (currentPageTag == myDataSet[index].tag) {
                listViewItem.alpha = 1;
            }
            else {
                listViewItem.alpha = 0.5;
            }

            listViewItem.applyLayout();
        },
        onRowSelected: function(listViewItem, index) {
            console.log("currenpagetag = " + currentPageTag + " my data tag = " + myDataSet[index].tag )
            if (currentPageTag !== myDataSet[index].tag) {
                //try {
                    Router.go(myDataSet[index].tag, {}, false);
                    sliderDrawer.hide();
                // }
                // catch (e) {
                //     Router.goBack(myDataSet[index].tag, false);
                //     sliderDrawer.hide();
                // }
                currentPageTag = myDataSet[index].tag;
            }
            listView.refreshData();

        }
    });

    //Object.assign(sliderDrawer.layout, stylerBuilder.getCombinedStyle(".sliderDrawer.layout", {}));
    
    componentContextPatch(sliderDrawer, "sliderDrawer");
    sliderDrawer.layout.addChild(mainContainer,"mainContainer");
    
    mainContainer.addChild(topContainer);
    mainContainer.addChild(dividerTop);
    mainContainer.addChild(listView,"listView");
    mainContainer.addChild(dividerBottom);
    mainContainer.addChild(btnSignOut);
    
    sliderDrawer.dispatch({
        type: "pushClassNames",
        classNames:".sliderDrawer.layout"
    });
};
sliderDrawer.onShow= function() {
        console.log("sliderDrawer is shown");
    };
Router.sliderDrawer = sliderDrawer;
Router.sliderDrawer.enabled = false;


module.exports = exports = sliderDrawer;
