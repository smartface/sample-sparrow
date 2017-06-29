const extend = require("js-base/core/extend");
const ShopifyService = require("./ShopifyService");
const ShopifyRequest = require("./ShopifyRequest");

const CollectionService = extend(ShopifyService)(
    function(_super, params) {
        _super(this, params);

        this.getAllCollections = function() {
            var request = new ShopifyRequest();
            request.setEndpoint("custom_collections.json");
            return request;
        };
    }
);

module.exports = CollectionService;