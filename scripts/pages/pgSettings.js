/* globals lang*/
const extend = require("js-base/core/extend");
const Image = require("sf-core/ui/image");
const Data = require('sf-core/data');
const Application = require('sf-core/application');
const AlertView = require('sf-core/ui/alertview');
const Timer = require("sf-core/timer");
const TextAlignment = require('sf-core/ui/textalignment');
const fingerprint = require("sf-extension-utils").fingerprint;
const System = require('sf-core/device/system');
const rau = require("sf-extension-utils").rau;

// Get generetad UI code
var PgSettingsDesign = require("../ui/ui_pgSettings");
var isNewUpdateAvailable = false;

const PgSettings = extend(PgSettingsDesign)(
	function(_super) {
		_super(this);

		this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));


		this.customHeaderBar.headerTitle.text = lang["pgSettings.title"];
		this.customHeaderBar.leftImage.image = Image.createFromFile("images://arrow_down.png");
		this.customHeaderBar.leftImage.onTouchEnded = function() {
			this.router.dismiss();
		}.bind(this);

		this.labelTheme.text = lang["pgSettings.theme"];
		this.labelFingerprint.text = lang["pgSettings.fingerprint"];
		this.labelNotification.text = lang["pgSettings.notification"];
		this.txtAbout.text = lang["pgSettings.about"] + " v" + Application.version;
		this.txtAboutDesc.text = lang["pgSettings.aboutDesc"];

		//EBTEMPORARY
		var isNotificationAllowed = Data.getBooleanVariable("isNotificationAllowed");
		if (isNotificationAllowed == null) isNotificationAllowed = false;
		this.switchNotification.toggle = isNotificationAllowed;

		if (!System.fingerPrintAvailable) {
			// this.switchFingerprint.enabled = false;
			this.fingerprintRow.height = Number.NaN;
			this.fingerprintRow.maxHeight = 0;
			this.fingerprintRow.flexGrow = 0;
			this.fingerprintRow.visible = false;
			this.horizontalDivider.height = Number.NaN;
			this.horizontalDivider.flexGrow = 0;
			this.horizontalDivider.maxHeight = 0;
			this.horizontalDivider.visible = false;
		}
		else {
			this.switchFingerprint.toggle = fingerprint.useFingerprintLogin;
		}
		this.switchFingerprint.onToggleChanged = function() {
			fingerprint.useFingerprintLogin = this.switchFingerprint.toggle;
			if (this.switchFingerprint.toggle) {
				alert(lang["pgSetting.fingerprint.alert"]);
			}

		}.bind(this);
		this.switchNotification.onToggleChanged = function() {
			Data.setBooleanVariable("isNotificationAllowed", this.switchNotification.toggle);
		}.bind(this);

		this.themeBlue.onTouchEnded = changeThemeHelper.bind(this, "ThemeBlue");

		this.themeGreen.onTouchEnded = changeThemeHelper.bind(this, "ThemeGreen");

		this.themeDefaults.onTouchEnded = changeThemeHelper.bind(this, "ThemeRed");

		this.txtAboutVersion.onTouchEnded = function() {
			if (isNewUpdateAvailable) {
				rau.checkUpdate({
					showProgressCheck: true,
					showProgressErrorAlert: true,
					url: "https://smf.to/mcommerce"
				});
			}
		};
	});

function changeThemeHelper(themeName){
	changeTheme.call(this, themeName);
}

function onLoad(parentOnShow) {
	parentOnShow();
}

function onShow(parentOnLoad) {
	parentOnLoad();

	switch (Data.getStringVariable("theme")) {
		case 'ThemeBlue':
			this.themeBlue.borderWidth = 1;
			this.themeGreen.borderWidth = 0;
			this.themeDefaults.borderWidth = 0;
			break;
		case 'ThemeGreen':
			this.themeBlue.borderWidth = 0;
			this.themeGreen.borderWidth = 1;
			this.themeDefaults.borderWidth = 0;
			break;
		default:
			this.themeBlue.borderWidth = 0;
			this.themeGreen.borderWidth = 0;
			this.themeDefaults.borderWidth = 1;
	}

	// this.txtAboutVersion.visible = false;
	/*Timer.setTimeout({
		task: checkRAUVersion.bind(this),
		delay: 200
	});
	*/
}
/*
function changeTheme(styleName) {
	if (Data.getStringVariable("theme") === styleName) {
		return;
	}

	var confirmationAlert = new AlertView({
		title: lang["alertView.confirmation"],
		message: lang["pgSettings.themeChangeMessage"]
	});
	confirmationAlert.addButton({
		text: lang["ok"],
		type: AlertView.Android.ButtonType.POSITIVE,
		onClick: function() {
			Data.setStringVariable("theme", styleName);
			Application.restart();
		}
	});
	confirmationAlert.addButton({
		text: lang["cancel"],
		type: AlertView.Android.ButtonType.NEGATIVE
	});
	confirmationAlert.show();
}
*/

function changeTheme(themeName) {
	if (Data.getStringVariable("theme") === themeName) {
		return;
	}

	var confirmationAlert = new AlertView({
		title: lang["alertView.confirmation"],
		message: lang["pgSettings.themeChangeMessage"]
	});
	confirmationAlert.addButton({
		text: lang["ok"],
		type: AlertView.Android.ButtonType.POSITIVE,
		onClick: () => {
			this.themeContext({
				type: "changeTheme",
				theme: themeName
			});

			this.dispatch({
				type: "invalidate"
			});
			this.layout.applyLayout();

			Data.setStringVariable("theme", themeName);
			initCurrentTheme.call(this);
		}
	});

	confirmationAlert.addButton({
		text: lang["cancel"],
		type: AlertView.Android.ButtonType.NEGATIVE
	});

	confirmationAlert.show();
}

function initCurrentTheme() {
	this.themeBlue.dispatch({
		type: "updateUserStyle",
		userStyle: {
			borderWidth: Data.getStringVariable("theme") == "ThemeBlue" ? 1 : 0
		}
	});
	this.themeGreen.dispatch({
		type: "updateUserStyle",
		userStyle: {
			borderWidth: Data.getStringVariable("theme") == "ThemeGreen" ? 1 : 0
		}
	});
	this.themeDefaults.dispatch({
		type: "updateUserStyle",
		userStyle: {
			borderWidth: Data.getStringVariable("theme") == "ThemeRed" ? 1 : 0
		}
	});
}

function checkRAUVersion() {
	Application.checkUpdate(function(err, result) {
		if (err) {
			console.log("check update error: " + err);
		}
		else {
			isNewUpdateAvailable = true;
			// HTML TEXT alignment not working on iOS
			// this.txtAboutVersion.htmlText = '<span style="text-decoration: underline;font-size: 12px;color: #0000ff;text-align: right;">New version available</span>';
			// this.txtAboutVersion.htmlText = '<a href="#" style="font-size: 12px; text-align: right;">New version available</a>';
			// this.txtAboutVersion.htmlText = '<div style="display: table; width:100%;"><div style="display: table-cell; vertical-align: middle; "><a href="#" style="font-size: 12px;text-align: right;">New version available</a></div></div>';
			this.txtAboutVersion.text = lang["pgSettings.updateAvailable"];
			this.txtAboutVersion.textAlignment = TextAlignment.MIDRIGHT;
			this.txtAboutVersion.visible = true;
		}
	}.bind(this));
}
module && (module.exports = PgSettings);
