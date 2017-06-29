/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');

const LoaderContainerDesign = require('library/LoaderContainer');

const LoaderContainer = extend(LoaderContainerDesign)(
	//constructor
	function(_super, props, pageName){
		// initalizes super class for this scope
		_super(this, props || LoaderContainerDesign.defaults );
		this.pageName = pageName;
	}
	
);

module && (module.exports = LoaderContainer);

