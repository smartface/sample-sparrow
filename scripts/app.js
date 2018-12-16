/* globals lang */
require("i18n/i18n.js"); // Generates global lang object
const Application = require("sf-core/application");
const PageConstants = require('pages/PageConstants');
const Shopify = require("sf-extension-shopify");
const Config = require("config.js");
const System = require("sf-core/device/system");
// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function(e) {
    alert({
        title: lang.applicationError,
        message: e.message + "\n\n*" + e.sourceURL + "\n*" + e.line + "\n*" + e.stack
    });
};
require("sf-extension-utils"); //performs util setup
require("./theme");
var sliderDrawer;

// if (System.OS === "iOS") {
    sliderDrawer = require("./sliderDrawer");
    // Router.sliderDrawer = sliderDrawer;
// }

/*
const stylerBuilder = require("library/styler-builder");
const settings = require("./settings.json");
stylerBuilder.registerThemes(settings.config.theme.themes || "Defaults");
    Data.setStringVariable("theme", settings.config.theme.currentTheme);
stylerBuilder.setActiveTheme(Data.getStringVariable("theme") || settings.config.theme.currentTheme);
*/
Shopify.Authentication.setAPIKey(Config.SHOPIFY_APIKey);
Shopify.Authentication.setPassword(Config.SHOPIFY_PASSWORD);
Shopify.Authentication.setStoreName(Config.SHOPIFY_STORENAME);

const {
  NativeRouter: Router,
  Router: RouterBase,
  NativeStackRouter: StackRouter,
  BottomTabBarRouter,
  Route
} = require("@smartface/router");

const router = Router.of({
    path: "/",
    isRoot: true,
    routeWillEnter: (rotuer, route, view) => {
        if (System.OS === "iOS") {
            sliderDrawer.router = rotuer;
            Application.sliderDrawer = sliderDrawer;
        }
    },
    routes: [
        Route.of({
            path: "/login",
            build: (router, route) => {
                    let LoginPage = require("pages/pgLogin");
                    let loginPage = new LoginPage();
                    loginPage.router = router;
                    return loginPage;
                }
            }
        ),
        StackRouter.of({
            path: "/stack",
            headerBarParams: () => ({ visible: false }),
            routes: [
                    Route.of({
                        path: "/stack/categories",
                        build: (router, route) => {
                                let CategoriesPage = require("pages/pgCategories");
                                let categoriesPage = new CategoriesPage();
                                categoriesPage.sliderDrawer = sliderDrawer;
                                
                                const action = route.getState().action;
                                if(action === 'POP')
                                    return route.getState().view;
                                
                                categoriesPage.router = router;
                                return categoriesPage;
                            }
                        }
                    ),
                    Route.of({
                        path: "/stack/productlist",
                        build: (router, route) => {
                                let ProductList = require("pages/pgProductList");
                                let productList = new ProductList({},router, route);
                                productList.router = router;
                                return productList;
                            }
                        }
                    ),
                    Route.of({
                        path: "/stack/productdetail",
                        build: (router, route) => {
                                let ProductDetail = require("pages/pgProductDetail");
                                let productDetail = new ProductDetail({},router, route);
                                productDetail.router = router;
                                return productDetail;
                            }
                        }
                    ),
                    StackRouter.of({
                        path: "/stack/cartstack",
                        headerBarParams: () => ({ visible: false }),
                        modal : true,
                        routes: [
                                Route.of({
                                    path: "/stack/cartstack/shoppingcart",
                                    build: (router, route) => {
                                            let ShoppingCart = require("pages/pgShoppingCart");
                                            let shoppingCart = new ShoppingCart();
                                            shoppingCart.router = router;
                                            return shoppingCart;
                                        }
                                    }
                                ),  
                                Route.of({
                                    path: "/stack/cartstack/shipping",
                                    build: (router, route) => {
                                            let Shipping = require("pages/pgShipping");
                                            let shipping = new Shipping({},router, route);
                                            shipping.router = router;
                                            return shipping;
                                        }
                                    }
                                ),
                                Route.of({
                                    path: "/stack/cartstack/payment",
                                    build: (router, route) => {
                                            let Payment = require("pages/pgPayment");
                                            let payment = new Payment({},router, route);
                                            payment.router = router;
                                            return payment;
                                        }
                                    }
                                ),
                                Route.of({
                                    path: "/stack/cartstack/paymentresult",
                                    build: (router, route) => {
                                            let PaymentResult = require("pages/pgPaymentResult");
                                            let paymentresult = new PaymentResult({},router, route);
                                            paymentresult.router = router;
                                            return paymentresult;
                                        }
                                    }
                                ),
                            ]
                    }),
                    StackRouter.of({
                        path: "/stack/settings",
                        headerBarParams: () => ({ visible: false }),
                        modal : true,
                        routes: [
                                Route.of({
                                    path: "/stack/settings/settings",
                                    build: (router, route) => {
                                            let Settings = require("pages/pgSettings");
                                            let settings = new Settings();
                                            settings.router = router;
                                            return settings;
                                        },
                                    }
                                ),
                            ]
                    }),
                ]
        })
    ]
});

router.push("/login");
