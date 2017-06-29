/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const ItemPickerSelectorDesign = require('library/ItemPickerSelector');

const ItemPickerSelector = extend(ItemPickerSelectorDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || ItemPickerSelectorDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = ItemPickerSelector);

