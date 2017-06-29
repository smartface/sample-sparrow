const ShopifyAuth = {};

ShopifyAuth._apiKey    = null;
ShopifyAuth._password  = null;
ShopifyAuth._storename = null;

ShopifyAuth.setAPIKey = function(key) {
    ShopifyAuth._apiKey = key;
};
ShopifyAuth.setPassword = function(password) {
    ShopifyAuth._password = password;
};
ShopifyAuth.setStoreName = function(name) {
    ShopifyAuth._storename = name;
};
ShopifyAuth.getAPIKey = function() {
    return ShopifyAuth._apiKey;
};
ShopifyAuth.getPassword = function() {
    return ShopifyAuth._password;
};
ShopifyAuth.getStoreName = function() {
    return ShopifyAuth._storename;
};

module.exports = ShopifyAuth;