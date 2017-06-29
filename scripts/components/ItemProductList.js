/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const ItemProductListDesign = require('library/ItemProductList');
const Router			= require("sf-core/ui/router");
const PageConstants 	= require("pages/PageConstants");



const ItemProductList = extend(ItemProductListDesign)(
	//constructor
	function(_super, props, pageName){
		delete ItemProductListDesign.defaults.width;
		_super(this, props || ItemProductListDesign.defaults );
		this.pageName = pageName;
		var _product;
		
		Object.defineProperties(this, {
			'product': {
				get: function() {
					return _product;
				},
				set: function(value) {
					_product = value;
					invalidate(this);
				}
			}
		});
	}
	
);

function invalidate(item) {
	if(item && item.product){
		item.title.text = item.product.title;
		item.price.text = "$" + item.product.variants[0].price;
		item.thumb.image = undefined;
		item.thumb.loadFromUrl(item.product.image.src)
		item.onTouchEnded = function(){
		  Router.go(PageConstants.PAGE_PRODUCT_DETAIL, this.product, true);
		}.bind({product:item.product})	
	}
	
}

module && (module.exports = ItemProductList);

