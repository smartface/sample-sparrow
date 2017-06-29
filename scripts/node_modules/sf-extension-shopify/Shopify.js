const ProductService    = require("./ProductService");
const CollectionService = require("./CollectionService");
const Shopify = {};

Shopify.Authentication = require("./ShopifyAuth");
Shopify.Product     = new ProductService();
Shopify.Collections = new CollectionService();

module.exports = Shopify;