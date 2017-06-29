/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const ItemCartDesign = require('library/ItemCart');

const ItemCart = extend(ItemCartDesign)(
	//constructor
	function(_super, props, pageName){
		delete ItemCartDesign.defaults.width;
		_super(this, props || ItemCartDesign.defaults );
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
	item.productTitle.touchEnabled = false;
	item.productPrice.touchEnabled = false;
	item.productTitle.text = item.product.title;
	item.counter.text = item.product.amount;
	item.productPrice.text = "$" + (item.product.amount * item.product.unit_price).toFixed(2);
	item.productImage.imageSmall.image = undefined;
	item.productImage.imageSmall.loadFromUrl(item.product.image)
}

module && (module.exports = ItemCart);

