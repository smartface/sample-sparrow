const System = require("sf-core/device/system");
const extend = require('js-base/core/extend');
const CustomHeaderBarDesign = require('library/CustomHeaderBar');
const CustomHeaderBar = extend(CustomHeaderBarDesign)(
	//constructor
	function(_super, props, pageName) {
		// initalizes super class for this scope
		_super(this, props || CustomHeaderBarDesign.defaults);
		this.pageName = pageName;
		setTimeout(() => {
			this.dispatch({
				type: "updateUserStyle",
				userStyle: {
					"marginTop": System.OS === "iOS" ? System.OSVersion.split(".")[0] < 11 ? 20 : 0 : 0
				}
			});
			this.parent.applyLayout();
		}, 500);
	}
);

module && (module.exports = CustomHeaderBar);
