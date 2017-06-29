/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const Flexlayout3Design = require('library/Flexlayout3');

const Flexlayout3 = extend(Flexlayout3Design)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || Flexlayout3Design.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = Flexlayout3);

