const extend = require('js-base/core/extend');
const ItemCategoryDesign = require('library/ItemCategory');
const ItemCategory = extend(ItemCategoryDesign)(
	function(_super, props, pageName) {
		_super(this, props || ItemCategoryDesign.defaults);
		this.pageName = pageName;
		var _category;

		Object.defineProperties(this, {
			'category': {
				get: function() {
					return _category;
				},
				set: function(value) {
					_category = value;
					invalidate(this);
				}
			}
		});
	}
);

function invalidate(item) {
	item.categoryTitle.text = item.category.title;
	item.categoryImage.image = undefined;
	item.categoryImage.loadFromUrl(item.category.image.src);
}

module && (module.exports = ItemCategory);
