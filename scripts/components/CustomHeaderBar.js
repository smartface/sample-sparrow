const System = require("sf-core/device/system");
/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const CustomHeaderBarDesign = require('library/CustomHeaderBar');

const CustomHeaderBar = extend(CustomHeaderBarDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || CustomHeaderBarDesign.defaults );
		this.pageName = pageName;
		this.marginTop = System.OS === "iOS" ? 20 : 0;
	}
	
);

module && (module.exports = CustomHeaderBar);

