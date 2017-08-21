/* globals lang */
require("i18n/i18n.js"); // Generates global lang object

const Application = require("sf-core/application");
const Router = require("sf-core/ui/router");
const PageConstants = require('pages/PageConstants');
const Data = require("sf-core/data");
const Shopify = require("sf-extension-shopify");
const Config = require("config.js");
const System = require("sf-core/device/system");
require("sf-extension-utils"); //performs util setup

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};

var sliderDrawer;

if (System.OS === "iOS") {
    sliderDrawer = require("./sliderDrawer");
    Router.sliderDrawer = sliderDrawer;
}

const stylerBuilder = require("library/styler-builder");
const settings = require("./settings.json");
stylerBuilder.registerThemes(settings.config.theme.themes || "Defaults");
if (Data.getStringVariable("theme") === null)
    Data.setStringVariable("theme", settings.config.theme.currentTheme);
stylerBuilder.setActiveTheme(Data.getStringVariable("theme") || settings.config.theme.currentTheme);

Shopify.Authentication.setAPIKey(Config.SHOPIFY_APIKey);
Shopify.Authentication.setPassword(Config.SHOPIFY_PASSWORD);
Shopify.Authentication.setStoreName(Config.SHOPIFY_STORENAME);

// Define routes and go to initial page of application
Router.add(PageConstants.PAGE_SHOPPING_CART, require("./pages/pgShoppingCart"));
Router.add(PageConstants.PAGE_SHIPPING, require("./pages/pgShipping"));
Router.add(PageConstants.PAGE_PAYMENT, require("./pages/pgPayment"));
Router.add(PageConstants.PAGE_PAYMENT_RESULT, require("./pages/pgPaymentResult"));
Router.add(PageConstants.PAGE_PRODUCT_DETAIL, require("./pages/pgProductDetail"));
Router.add(PageConstants.PAGE_PRODUCT_LIST, require("./pages/pgProductList"));
Router.add(PageConstants.PAGE_CATEGORIES, require("./pages/pgCategories"));
Router.add(PageConstants.PAGE_LOGIN, require("./pages/pgLogin"));
Router.add(PageConstants.PAGE_SETTINGS, require("./pages/pgSettings"));
Router.go(PageConstants.PAGE_LOGIN);

if (System.OS === "Android") {
    sliderDrawer = require("./sliderDrawer");
    Router.sliderDrawer = sliderDrawer;
}
