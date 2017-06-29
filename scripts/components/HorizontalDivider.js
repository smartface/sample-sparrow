/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const HorizontalDividerDesign = require('library/HorizontalDivider');

const HorizontalDivider = extend(HorizontalDividerDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || HorizontalDividerDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = HorizontalDivider);

