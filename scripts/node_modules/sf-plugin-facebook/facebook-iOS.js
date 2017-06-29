const Page = require('sf-core/ui/page');
const TypeUtil = require('sf-core/util/type');
const Image = require("sf-core/ui/image");
const File = require("sf-core/io/file");

var loginManager = new FBSDKLoginManager();

function Facebook(params) {}

Object.defineProperties(Facebook, {
    'applicationId': {
        get: function() {
            return FBSDKSettings.appID();
        },
        set: function(value) {
            FBSDKSettings.setAppID(value);
        },
        enumarable: true
    },
    'applicationName': {
        get: function() {
            return FBSDKSettings.displayName();
        },
        set: function(value) {
            FBSDKSettings.setDisplayName(value);
        },
        enumarable: true
    },
    'graphApiVersion': {
        get: function() {
            return FBSDKSettings.graphAPIVersion();
        },
        set: function(value) {
            FBSDKSettings.setGraphAPIVersion(value);
        },
        enumarable: true
    },
    'clientToken': {
        get: function() {
            return FBSDKSettings.clientToken();
        },
        enumarable: true
    },
    'sdkVersion': {
        get: function() {
            return FBSDKSettings.sdkVersion();
        },
        enumarable: true
    },
    'logOut': {
        value: function(){
            loginManager.logOut();
        },
        enumerable: true
    },
    'logInWithReadPermissions': {
        value: function(params) {
            if (!params.page instanceof Page) {
                throw new TypeError("Parameter type mismatch. params.page must be Page instance");
            }
            if (!TypeUtil.isArray(params.permissions)) {
                throw new TypeError("Parameter type mismatch. params.permissions must be string array");
            }
            var page = params.page;
            var permissions = params.permissions;

            loginManager.logInWithReadPermissionsViewControllerHandler(permissions, page.nativeObject, function(e) {
                if (e.error) {
                    if (typeof params.onFailure === "function") {
                        params.onFailure(new Error(e.error.localizedDescription + " " + e.error.userInfo[FBSDKErrorDeveloperMessageKey]));
                    }
                } else if (e.result.isCancelled) {
                    if (typeof params.onCancel === "function") {
                        params.onCancel();
                    }
                } else {
                    if (typeof params.onSuccess === "function") {
                        var deniedPermissions = e.result.declinedPermissionsArray;
                        var grantedPermissions = e.result.grantedPermissionsArray;
                        var accessToken = new Facebook.AccessToken({
                            nativeObject: e.result.token
                        });
                        params.onSuccess({
                            deniedPermissions: deniedPermissions,
                            grantedPermissions: grantedPermissions,
                            accessToken: accessToken
                        });
                    }
                }
            });
        },
        enumarable: true
    },
    'logInWithPublishPermissions': {
        value: function(params) {
            if (!params.page instanceof Page) {
                throw new TypeError("Parameter type mismatch. params.page must be Page instance");
            }
            if (!TypeUtil.isArray(params.permissions)) {
                throw new TypeError("Parameter type mismatch. params.permissions must be string array");
            }
            var page = params.page;
            var permissions = params.permissions;

            loginManager.logInWithPublishPermissionsViewControllerHandler(permissions, page.nativeObject, function(e) {
                if (e.error) {
                    if (typeof params.onFailure === "function") {
                        params.onFailure(new Error(e.error.localizedDescription + " " + e.error.userInfo[FBSDKErrorDeveloperMessageKey]));
                    }
                } else if (e.result.isCancelled) {
                    if (typeof params.onCancel === "function") {
                        params.onCancel();
                    }
                } else {
                    if (typeof params.onSuccess === "function") {
                        var deniedPermissions = e.result.declinedPermissionsArray;
                        var grantedPermissions = e.result.grantedPermissionsArray;
                        var accessToken = new Facebook.AccessToken({
                            nativeObject: e.result.token
                        });
                        params.onSuccess({
                            deniedPermissions: deniedPermissions,
                            grantedPermissions: grantedPermissions,
                            accessToken: accessToken
                        });
                    }
                }
            });
        },
        enumarable: true
    },
    'graphRequest': {
        value: function(params) {
            var path = params.graphPath;
            var parameters = params.parameters;
            var httpMethod = params.httpMethod;

            FBSDKGraphRequest.requestWithGraphPathParametersHTTPMethodHandler(path, parameters, httpMethod, function(e) {
                if (e.error) {
                    if (typeof params.onFailure === "function") {
                        params.onFailure(new Error(e.error.localizedDescription + " " + e.error.userInfo[FBSDKErrorDeveloperMessageKey]));
                    }
                } else {
                    if (typeof params.onSuccess === "function") {
                        params.onSuccess(e.result);
                    }
                }
            });
        },
        enumarable: true
    },
    'shareLinkContent': {
        value: function(params) {
            if (!params.page instanceof Page) {
                throw new TypeError("Parameter type mismatch. params.page must be Page instance");
            }

            var sharLinkContent = new FBSDKShareLinkContent();
            params.contentUrl ? (sharLinkContent.contentURL = __SF_NSURL.URLWithString(params.contentUrl)) : "";
            (params.shareHashtag instanceof Facebook.ShareHashtag) ? (sharLinkContent.hashtag = params.shareHashtag.nativeObject) : "";
            params.placeId ? (sharLinkContent.placeID = params.placeId) : "";
            params.quote ? (sharLinkContent.quote = params.quote) : "";
            params.ref ? (sharLinkContent.ref = params.ref) : "";
            params.peopleIds ? (sharLinkContent.peopleIDs = params.peopleIds) : "";

            var shareDelegate = new FBSDKSharingDelegate();
            shareDelegate.didCancel = function(e){
                if (typeof params.onCancel === "function") {
                    params.onCancel();
                }
            };
            shareDelegate.didFail = function(e){
                if (typeof params.onFailure === "function") {
                    params.onFailure(new Error(e.error.localizedDescription + " " + e.error.userInfo[FBSDKErrorDeveloperMessageKey]));
                }
            };
            shareDelegate.didComplete = function(e){
                if (typeof params.onSuccess === "function") {
                    params.onSuccess(e.results);
                }
            }

            var shareDialog = new FBSDKShareDialog();
            params.shareMode ? (shareDialog.mode = params.shareMode) : Facebook.ShareMode.AUTOMATIC;
            shareDialog.fromViewController = params.page.nativeObject;
            shareDialog.delegate = shareDelegate;
            shareDialog.shareContent = sharLinkContent;
            shareDialog.show();
        },
        enumarable: true
    },
    'sharePhotoContent': {
        value: function(params) {
            if (!params.page instanceof Page) {
                throw new TypeError("Parameter type mismatch. params.page must be Page instance");
            }

            var content = new FBSDKSharePhotoContent();
            params.contentUrl ? (content.contentURL = __SF_NSURL.URLWithString(params.contentUrl)) : "";
            (params.shareHashtag instanceof Facebook.ShareHashtag) ? (content.hashtag = params.shareHashtag.nativeObject) : "";
            params.placeId ? (content.placeID = params.placeId) : "";
            params.ref ? (content.ref = params.ref) : "";
            params.peopleIds ? (content.peopleIDs = params.peopleIds) : "";

            if (TypeUtil.isArray(params.sharePhotos)){
                var photosNativeObject = [];
                for (var i = 0; i < params.sharePhotos.length; i++) {
                    photosNativeObject.push(params.sharePhotos[i].nativeObject);
                }
                content.photos = photosNativeObject;
            }
            
            var shareDelegate = new FBSDKSharingDelegate();
            shareDelegate.didCancel = function(e){
                if (typeof params.onCancel === "function") {
                    params.onCancel();
                }
            };
            shareDelegate.didFail = function(e){
                if (typeof params.onFailure === "function") {
                    params.onFailure(new Error(e.error.localizedDescription + " " + e.error.userInfo[FBSDKErrorDeveloperMessageKey]));
                }
            };
            shareDelegate.didComplete = function(e){
                if (typeof params.onSuccess === "function") {
                    params.onSuccess(e.results);
                }
            }

            var shareDialog = new FBSDKShareDialog();
            params.shareMode ? (shareDialog.mode = params.shareMode) : Facebook.ShareMode.AUTOMATIC;
            shareDialog.fromViewController = params.page.nativeObject;
            shareDialog.delegate = shareDelegate;
            shareDialog.shareContent = content;
            shareDialog.show();
        },
        enumarable: true
    },
    'shareVideoContent': {
        value: function(params) {
            if (!params.page instanceof Page) {
                throw new TypeError("Parameter type mismatch. params.page must be Page instance");
            }

            var content = new FBSDKShareVideoContent();
            params.contentUrl ? (content.contentURL = __SF_NSURL.URLWithString(params.contentUrl)) : "";
            (params.shareHashtag instanceof Facebook.ShareHashtag) ? (content.hashtag = params.shareHashtag.nativeObject) : "";
            params.placeId ? (content.placeID = params.placeId) : "";
            params.ref ? (content.ref = params.ref) : "";
            params.peopleIds ? (content.peopleIDs = params.peopleIds) : "";
            params.previewPhoto ? (content.previewPhoto = params.previewPhoto.nativeObject) : "";

            content.video = params.shareVideo.nativeObject;
            
            var shareDelegate = new FBSDKSharingDelegate();
            shareDelegate.didCancel = function(e){
                if (typeof params.onCancel === "function") {
                    params.onCancel();
                }
            };
            shareDelegate.didFail = function(e){
                if (typeof params.onFailure === "function") {
                    params.onFailure(new Error(e.error.localizedDescription + " " + e.error.userInfo[FBSDKErrorDeveloperMessageKey]));
                }
            };
            shareDelegate.didComplete = function(e){
                if (typeof params.onSuccess === "function") {
                    params.onSuccess(e.results);
                }
            }

            var shareDialog = new FBSDKShareDialog();
            params.shareMode ? (shareDialog.mode = params.shareMode) : Facebook.ShareMode.AUTOMATIC;
            shareDialog.fromViewController = params.page.nativeObject;
            shareDialog.delegate = shareDelegate;
            shareDialog.shareContent = content;
            shareDialog.show();
        },
        enumarable: true
    },
    'shareMediaContent': {
        value: function(params) {
            if (!params.page instanceof Page) {
                throw new TypeError("Parameter type mismatch. params.page must be Page instance");
            }

            var content = new FBSDKShareMediaContent();
            params.contentUrl ? (content.contentURL = __SF_NSURL.URLWithString(params.contentUrl)) : "";
            (params.shareHashtag instanceof Facebook.ShareHashtag) ? (content.hashtag = params.shareHashtag.nativeObject) : "";
            params.placeId ? (content.placeID = params.placeId) : "";
            params.ref ? (content.ref = params.ref) : "";
            params.peopleIds ? (content.peopleIDs = params.peopleIds) : "";

            if (TypeUtil.isArray(params.shareMedia)){
                var mediasNativeObject = [];
                for (var i = 0; i < params.shareMedia.length; i++) {
                    mediasNativeObject.push(params.shareMedia[i].nativeObject);
                }
                content.media = mediasNativeObject;
            }
            
            var shareDelegate = new FBSDKSharingDelegate();
            shareDelegate.didCancel = function(e){
                if (typeof params.onCancel === "function") {
                    params.onCancel();
                }
            };
            shareDelegate.didFail = function(e){
                if (typeof params.onFailure === "function") {
                    params.onFailure(new Error(e.error.localizedDescription + " " + e.error.userInfo[FBSDKErrorDeveloperMessageKey]));
                }
            };
            shareDelegate.didComplete = function(e){
                if (typeof params.onSuccess === "function") {
                    params.onSuccess(e.results);
                }
            }

            var shareDialog = new FBSDKShareDialog();
            params.shareMode ? (shareDialog.mode = params.shareMode) : Facebook.ShareMode.AUTOMATIC;
            shareDialog.fromViewController = params.page.nativeObject;
            shareDialog.delegate = shareDelegate;
            shareDialog.shareContent = content;
            shareDialog.show();
        },
        enumarable: true
    },
    'HttpMethod': {
        value: {},
        enumarable: true
    },
    'ShareMode': {
        value: {},
        enumarable: true
    }
});

Facebook.AccessToken = function(params) {

    this.nativeObject = params.nativeObject;

    Object.defineProperties(this, {
        'token': {
            get: function() {
                return this.nativeObject.tokenString;
            },
            enumarable: true
        },
        'userId': {
            get: function() {
                return this.nativeObject.userID;
            },
            enumarable: true
        },
        'expireDate': {
            get: function() {
                return this.nativeObject.expirationDate;
            },
            enumarable: true
        },
        'permissions': {
            get: function() {
                return this.nativeObject.permissionsArray;
            },
            enumarable: true
        },
        'declinedPermissions': {
            get: function() {
                return this.nativeObject.declinedPermissionsArray;
            },
            enumarable: true
        }
    });
};

const FBSDKShareDialogMode = {
     FBSDKShareDialogModeAutomatic : 0,
     FBSDKShareDialogModeNative : 1,
     FBSDKShareDialogModeShareSheet : 2,
     FBSDKShareDialogModeBrowser : 3,
     FBSDKShareDialogModeWeb : 4,
     FBSDKShareDialogModeFeedBrowser : 5,
     FBSDKShareDialogModeFeedWeb : 6
};

Object.defineProperties(Facebook.ShareMode, {
    'AUTOMATIC': {
        value: FBSDKShareDialogMode.FBSDKShareDialogModeAutomatic,
        enumarable: true
    },
    'FEED': {
        value: FBSDKShareDialogMode.FBSDKShareDialogModeFeedBrowser,
        enumarable: true
    },
    'NATIVE': {
        value: FBSDKShareDialogMode.FBSDKShareDialogModeNative,
        enumarable: true
    },
    'WEB': {
        value: FBSDKShareDialogMode.FBSDKShareDialogModeBrowser,
        enumarable: true
    }
});

Facebook.ShareHashtag = function(params){
    var self = this;

    self.nativeObject = FBSDKHashtag.hashtagWithString(params.hashTag);
    Object.defineProperty(self, 'hashTag', {
        get: function() {
            return self.nativeObject.stringRepresentation;
        },
        enumerable: true
    });
};

Facebook.SharePhoto = function(params){
    var self = this;
    self.nativeObject = new FBSDKSharePhoto();
    
    Object.defineProperties(self, {
        'image': {
            get: function(){
                return Image.createFromImage(self.nativeObject.image);
            },
            set: function(value){
                if(!(value instanceof Image)){
                    throw new TypeError("image must be UI.Image");
                }
                self.nativeObject.image = value.nativeObject;
            },
            enumarable: true
        },
        'imageUrl': {
            get: function(){
                return self.nativeObject.imageURL.absoluteString;
            },
            set: function(value){
                if(!TypeUtil.isString(value)){
                    throw new TypeError("imageUrl must be string");
                }
                self.nativeObject.imageURL = __SF_NSURL.URLWithString(value);
            },
            enumarable: true
        },
        'caption': {
            get: function(){
                return self.nativeObject.caption;
            },
            set: function(value){
                if(!TypeUtil.isString(value)){
                    throw new TypeError("caption must be string");
                }
                self.nativeObject.caption = value;
            },
            enumarable: true
        },
        'userGenerated': {
            get: function(){
               return self.nativeObject.userGenerated;
            },
            set: function(value){
                if(!TypeUtil.isBoolean(value)){
                    throw new TypeError("userGenerated must be boolean");
                }
                self.nativeObject.userGenerated = true;
            },
            enumarable: true
        },
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

Facebook.ShareVideo = function(params){
    var self = this;
    self.nativeObject = new FBSDKShareVideo();
    
    Object.defineProperties(self, {
        'videoFile': {
            get: function(){
                var file = new File({path:self.nativeObject.videoURL.absoluteString});
                return file;
            },
            set: function(value){
                var url = value.ios.getNSURL();
                self.nativeObject.videoURL = url;
            },
            enumarable: true
        }
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

Object.defineProperties(Facebook.AccessToken, {
    'getCurrentToken': {
        value: function() {
            if (FBSDKAccessToken.currentAccessToken()) {
                return new Facebook.AccessToken({
                    nativeObject: FBSDKAccessToken.currentAccessToken()
                });
            } else {
                return null
            }
        },
        enumarable: true
    }
})

Object.defineProperties(Facebook.HttpMethod, {
    'GET': {
        value: "GET",
        enumarable: true
    },
    'POST': {
        value: "POST",
        enumarable: true
    },
    'DELETE': {
        value: "DELETE",
        enumarable: true
    }
})

module && (module.exports = Facebook);