/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const BtnTransparentDesign = require('library/BtnTransparent');

const BtnTransparent = extend(BtnTransparentDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || BtnTransparentDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = BtnTransparent);

