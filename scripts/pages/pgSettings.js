const extend = require("js-base/core/extend");
const StatusBarStyle    = require('sf-core/ui/statusbarstyle');
const Router			= require("sf-core/ui/router")
const Image			    = require("sf-core/ui/image")
const FingerPrintLib    = require("sf-extension-utils/fingerprint");
const Data              = require('sf-core/data');
const Application       = require('sf-core/application');
const AlertView         = require('sf-core/ui/alertview');
const AlertUtil         = require("sf-extension-utils/alert");
const RauLib			= require("sf-extension-utils/rau");
// Get generetad UI code
var PgSettingsDesign = require("../ui/ui_pgSettings");

var savedStateFingerprint, savedStateApplication;

const PgSettings = extend(PgSettingsDesign)(
    function(_super) {
        _super(this);

        this.onShow = onShow.bind(this, this.onShow.bind(this));
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		
		
		this.customHeaderBar.headerTitle.text = lang["pgSettings.title"]
        this.customHeaderBar.leftImage.image = Image.createFromFile("images://arrow_left.png");
		this.customHeaderBar.leftImage.onTouch = function()
		{
			Router.goBack();
		}
        
        this.labelTheme.text = lang["pgSettings.theme"];
        this.labelFingerprint.text = lang["pgSettings.fingerprint"];
        this.labelNotification.text = lang["pgSettings.notification"];
        this.labelCheckUpdate.text = lang["pgSettings.update"];
        this.txtAbout.text = lang["pgSettings.about"] + " v" + Application.version;
        this.txtAboutDesc.text = lang["pgSettings.aboutDesc"];
        
        this.switchNotification.toggle = Data.getBooleanVariable("isNotificationAllowed") !== false;

		if(!FingerPrintLib.isFingerprintAvailable){
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
		else{
	        this.switchFingerprint.toggle = ((FingerPrintLib.isUserRejectedFingerprint === false) && (FingerPrintLib.isUserVerifiedFingerprint === true)) ;
		}
		this.switchFingerprint.onToggleChanged = function( ){
		    FingerPrintLib.isUserRejectedFingerprint = (this.switchFingerprint.toggle === false);
		    if(this.switchFingerprint.toggle){
		    	AlertUtil.showAlert(lang["pgSetting.fingerprint.alert"]);
		    }

		}.bind(this);
		this.switchNotification.onToggleChanged = function( ){
		    Data.setBooleanVariable("isNotificationAllowed", this.switchNotification.toggle);
		}.bind(this);
		
		this.themeBlue.onTouchEnded = function() {
		    changeTheme("ThemeBlue");
		};
		
		this.themeGreen.onTouchEnded = function() {
		    changeTheme("ThemeGreen");
		};
		
		this.themeDefaults.onTouchEnded = function() {
		    changeTheme("Defaults");
		};
		
		this.checkUpdateRow.onTouchEnded = function() {
			RauLib.checkUpdate({
				showProgressCheck: true,
				showProgressErrorAlert: true
			});
		}
		
    });

function onLoad(parentOnShow) {
    parentOnShow();
}

function onShow(parentOnLoad) {
    parentOnLoad();

    // Saving FingerprintLib state, because if user toggle off, we will remove but user could opent it.
	savedStateFingerprint = {
	    isUserAuthenticated:        FingerPrintLib.isUserAuthenticated,
	    isUserRejectedFingerprint:  FingerPrintLib.isUserRejectedFingerprint,
	    isUserVerifiedFingerprint:  FingerPrintLib.isUserVerifiedFingerprint,
	    isUserAllowedFingerprint:   FingerPrintLib.isUserAllowedFingerprint,
	}
	savedStateApplication = {
	    userName: Data.getStringVariable("userName"),
	    password: Data.getStringVariable("password"),
	    isNotFirstLogin: Data.getBooleanVariable("isNotFirstLogin")
	}
	
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
}

function resetAuthPreferences(){
    FingerPrintLib.reset();
	Data.removeVariable("userName");
    Data.removeVariable("password");
}

function restoreAuthPreferences(){
    FingerPrintLib.isUserAuthenticated          = savedStateFingerprint.isUserAuthenticated;
    FingerPrintLib.isUserRejectedFingerprint    = savedStateFingerprint.isUserRejectedFingerprint;
    FingerPrintLib.isUserVerifiedFingerprint    = savedStateFingerprint.isUserVerifiedFingerprint;
    FingerPrintLib.isUserAllowedFingerprint     = savedStateFingerprint.isUserAllowedFingerprint;
    
    Data.setStringVariable("userName",savedStateApplication.userName);
    Data.setStringVariable("password",savedStateApplication.password);
    Data.setBooleanVariable("isNotFirstLogin",savedStateApplication.isNotFirstLogin);
}

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
module && (module.exports = PgSettings);