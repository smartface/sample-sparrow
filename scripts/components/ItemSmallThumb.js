/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const ItemSmallThumbDesign = require('library/ItemSmallThumb');

const ItemSmallThumb = extend(ItemSmallThumbDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || ItemSmallThumbDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = ItemSmallThumb);

