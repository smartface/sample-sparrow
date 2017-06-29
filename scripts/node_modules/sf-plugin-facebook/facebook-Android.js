const TypeUtil                          = require('sf-core/util/type');
const Page                              = require('sf-core/ui/page');
const Image                             = require('sf-core/ui/image');
const NativeFacebookSdk                 = requireClass('com.facebook.FacebookSdk');
const NativeLoginManager                = requireClass('com.facebook.login.LoginManager');
const NativeArrayList                   = requireClass('java.util.ArrayList');
const NativeCallbackManager             = requireClass('com.facebook.CallbackManager');
const NativeFacebookCallback            = requireClass('com.facebook.FacebookCallback');
const NativeActivityLifeCycleListener   = requireClass('io.smartface.android.listeners.ActivityLifeCycleListener');
const NativeAccessToken                 = requireClass('com.facebook.AccessToken');
const NativeHttpMethod                  = requireClass('com.facebook.HttpMethod');
const NativeGraphRequest                = requireClass('com.facebook.GraphRequest');
const NativeSharePhoto                  = requireClass('com.facebook.share.model.SharePhoto');
const NativeShareVideo                  = requireClass('com.facebook.share.model.ShareVideo');
const NativeShareHashtag                = requireClass('com.facebook.share.model.ShareHashtag');
const NativeSharePhotoContent           = requireClass('com.facebook.share.model.SharePhotoContent');
const NativeShareLinkContent            = requireClass('com.facebook.share.model.ShareLinkContent');
const NativeShareFeedContent            = requireClass('com.facebook.share.internal.ShareFeedContent');
const NativeShareVideoContent           = requireClass('com.facebook.share.model.ShareVideoContent');
const NativeShareMediaContent           = requireClass('com.facebook.share.model.ShareMediaContent');
const NativeUri                         = requireClass("android.net.Uri");

var activity = Android.getActivity();
var spratAndroidActivityInstance = requireClass("io.smartface.android.SpratAndroidActivity").getInstance();
var loginManager;
var callbackManager;
// Creating Activity Lifecycle listener
var activityLifeCycleListener = NativeActivityLifeCycleListener.implement({
    onActivityResult: function(requestCode, resultCode, data){
        callbackManager && callbackManager.onActivityResult(requestCode, resultCode, data);
    }
});
// Attaching Activity Lifecycle event
spratAndroidActivityInstance.addActivityLifeCycleCallbacks(activityLifeCycleListener);

function Facebook(params){}

Object.defineProperties(Facebook, {
    'applicationId': {
        get: function(){
            return NativeFacebookSdk.getApplicationId();
        },
        set: function(value){
            if(!TypeUtil.isString(value)){
                throw new TypeError("Parameter type missmatch. applicationId must be string");
            }
            NativeFacebookSdk.setApplicationId(value);
            NativeFacebookSdk.sdkInitialize(activity);
            loginManager = NativeLoginManager.getInstance();
            callbackManager = NativeCallbackManager.Factory.create();
        },
        enumarable: true
    },
    'applicationName': {
        get: function(){
            return NativeFacebookSdk.getApplicationName();
        },
        set: function(value){
            if(!TypeUtil.isString(value)){
                throw new TypeError("Parameter type mismatch. applicationName must be string");
            }
            NativeFacebookSdk.setApplicationName(value);
        },
        enumarable: true
    },
    'graphApiVersion': {
        get: function(){
            return NativeFacebookSdk.getGraphApiVersion();
        },
        set: function(value){
            if(!TypeUtil.isString(value)){
                throw new TypeError("Parameter type mismatch. graphApiVersion must be string");
            }
            NativeFacebookSdk.setGraphApiVersion(value);
        },
        enumarable: true
    },
    'clientToken': {
        get: function(){
            return NativeFacebookSdk.getClientToken();
        },
        enumarable: true
    },
    'sdkVersion': {
        get: function(){
            return NativeFacebookSdk.getSdkVersion();
        },
        enumarable: true
    },
    'logOut': {
        value: function(){
            loginManager.logOut();
        },
        enumerable: true
    },
    'logInWithReadPermissions' : {
        value: function(params){
            if(!params.page instanceof Page){
                throw new TypeError("Parameter type mismatch. params.page must be Page instance");
            }
            if(!TypeUtil.isArray(params.permissions)){
                throw new TypeError("Parameter type mismatch. params.permissions must be string or null array");
            }
            // Arrays.asList causes crash.
            var permissionsSet = new NativeArrayList();
            for(var index in params.permissions){
                permissionsSet.add(params.permissions[index])
            }
            loginManager.logInWithReadPermissions(spratAndroidActivityInstance, permissionsSet);
            loginManager.registerCallback(callbackManager, NativeFacebookCallback.implement({
                'onSuccess': function(loginResult){
                    var grantedPermissions = [];
                    var deniedPermissions = [];
                    var iterator = loginResult.getRecentlyGrantedPermissions().iterator();
                    
                    while(iterator.hasNext()){
                        grantedPermissions.push(iterator.next().substring(0));
                    }
                    
                    iterator = loginResult.getRecentlyDeniedPermissions().iterator();
                    while(iterator.hasNext()){
                        deniedPermissions.push(iterator.next());
                    }
                    
                    params.onSuccess && params.onSuccess({
                        deniedPermissions: deniedPermissions,
                        grantedPermissions: grantedPermissions,
                        accessToken: new Facebook.AccessToken({
                            nativeObject: loginResult.getAccessToken(),
                            isInternal: true
                        })
                    });
                },
                'onCancel': function(){
                    params.onCancel && params.onCancel();
                },
                'onError': function(error) {
                    params.onFailure && params.onFailure(new Error(error.getMessage()));
                }
            }));
            
        },
        enumarable: true
    },
    'logInWithPublishPermissions' : {
        value: function(params){
            if(!params.page instanceof Page){
                throw new TypeError("Parameter type mismatch. params.page must be Page instance");
            }
            if(!TypeUtil.isArray(params.permissions)){
                throw new TypeError("Parameter type mismatch. params.permissions must be string or null array");
            }
            // Arrays.asList causes crash.
            var permissionsSet = new NativeArrayList();
            for(var index in params.permissions){
                permissionsSet.add(params.permissions[index]);
            }
            loginManager.logInWithPublishPermissions(spratAndroidActivityInstance, permissionsSet);
            loginManager.registerCallback(callbackManager, NativeFacebookCallback.implement({
                'onSuccess': function(loginResult){
                    var grantedPermissions = [];
                    var deniedPermissions = [];
                    var iterator = loginResult.getRecentlyGrantedPermissions().iterator();
                    
                    while(iterator.hasNext()){
                        grantedPermissions.push(iterator.next());
                    }
                    
                    iterator = loginResult.getRecentlyDeniedPermissions().iterator();
                    while(iterator.hasNext()){
                        deniedPermissions.push(iterator.next());
                    }
                    
                    params.onSuccess && params.onSuccess({
                        deniedPermissions: deniedPermissions,
                        grantedPermissions: grantedPermissions,
                        accessToken: new Facebook.AccessToken({
                            nativeObject: loginResult.getAccessToken(),
                            isInternal: true
                        })
                    });
                },
                'onCancel': function(){
                    params.onCancel && params.onCancel();
                },
                'onError': function(error) {
                    params.onFailure && params.onFailure(new Error(error.getMessage()));
                }
            }));
            
        },
        enumarable: true
    },
    'graphRequest': {
        value: function(params){
            const NativeBundle = requireClass('android.os.Bundle');
            var accessToken = Facebook.AccessToken.getCurrentToken();
            var paramsBundle = null;
            if(params.parameters){
                paramsBundle = new NativeBundle();
                Object.keys(params.parameters).forEach(function (key) {
                    paramsBundle.putString(key, params.parameters[key] + '');
                });
            }
            if(accessToken){
                var graphRequest = new NativeGraphRequest(accessToken.nativeObject, params.graphPath, paramsBundle, params.httpMethod, NativeGraphRequest.Callback.implement({
                    'onCompleted': function(response){
                        if(response.getError()){
                            params.onFailure && params.onFailure(new Error(response.getError().getErrorMessage()));
                        }
                        else{
                            // var jsonObject = response.getJSONObject();
                            // const NativeString = requireClass('java.lang.String');
                            // var str = NativeString.valueOf(jsonObject);
                            var response = response.getRawResponse();
                            params.onSuccess && params.onSuccess(JSON.parse(response));
                        }
                    }
                }));
                graphRequest.executeAsync();
            }
            else{
                params.onFailure && params.onFailure(new Error("Not logged in."));
            }
        },
        enumarable: true
    },
    'shareLinkContent': {
        value: function(params){
            if(!params){
                throw new TypeError("params cannot be null");
            }
            var shareContentBuilder = new NativeShareLinkContent.Builder();
            
            if(TypeUtil.isString(params.contentUrl)){
                var contentUri = NativeUri.parse(params.contentUrl);
                shareContentBuilder.setContentUrl(contentUri);
            }
            if(TypeUtil.isArray(params.peopleIds)){
                // Arrays.asList causes crash.
                var peopleIdsSet = new NativeArrayList();
                for(var index in params.peopleIds){
                    peopleIdsSet.add(params.peopleIds[index]);
                }
                shareContentBuilder.setPeopleIds(peopleIdsSet);
            }
            if(TypeUtil.isString(params.placeId)){
                shareContentBuilder.setPlaceId(params.placeId);
            }
            if(TypeUtil.isString(params.quote)){
                shareContentBuilder.setQuote(params.quote);
            }
            if(TypeUtil.isString(params.ref)){
                shareContentBuilder.setRef(params.ref);
            }
            if(params.shareHashtag instanceof Facebook.ShareHashtag){
                var hashTagObject = params.shareHashtag.nativeObject.build();
                shareContentBuilder.setShareHashtag(hashTagObject);
            }

            createAndRegisterShareDialog(shareContentBuilder.build(), createShareModeFromString(params.shareMode),
            function(result){
                params.onSuccess && params.onSuccess({postId: result.getPostId()});
            },
            function(e) {
                params.onFailure && params.onFailure(new Error(e.getMessage()));
            },
            function() {
                params.onCancel && params.onCancel();
            });
        },
        enumarable: true
    },
    'shareMediaContent': {
        value: function(params){
            if(!params){
                throw new TypeError("params cannot be null");
            }
            var shareContentBuilder = new NativeShareMediaContent.Builder();
            if(TypeUtil.isString(params.contentUrl)){
                var contentUri = NativeUri.parse(params.contentUrl);
                shareContentBuilder.setContentUrl(contentUri);
            }
            if(TypeUtil.isArray(params.peopleIds)){
                // Arrays.asList causes crash.
                var peopleIdsSet = new NativeArrayList();
                for(var index in params.peopleIds){
                    peopleIdsSet.add(params.peopleIds[index]);
                }
                shareContentBuilder.setPeopleIds(peopleIdsSet);
            }
            if(TypeUtil.isString(params.placeId)){
                shareContentBuilder.setPlaceId(params.placeId);
            }
            if(TypeUtil.isString(params.ref)){
                shareContentBuilder.setRef(params.ref);
            }
            if(params.shareHashtag instanceof Facebook.ShareHashtag){
                var hashTagObject = params.shareHashtag.nativeObject.build();
                shareContentBuilder.setShareHashtag(hashTagObject);
            }
            // Arrays.asList causes crash so loop inside shareMedia
            if(TypeUtil.isArray(params.shareMedia)){
                var shareMediaSet = new NativeArrayList();
                for(var index in params.shareMedia){
                    var mediaObject = params.shareMedia[index].nativeObject.build();
                    shareMediaSet.add(mediaObject);
                }
                shareContentBuilder.addMedia(shareMediaSet);
            }
            
            createAndRegisterShareDialog(shareContentBuilder.build(), createShareModeFromString(params.shareMode),
            function(result){
                params.onSuccess && params.onSuccess({postId: result.getPostId()});
            },
            function(e) {
                params.onFailure && params.onFailure(new Error(e.getMessage()));
            },
            function() {
                params.onCancel && params.onCancel();
            });
        },
        enumarable: true
    },
    'sharePhotoContent': {
        value: function(params){
            if(!params){
                throw new TypeError("params cannot be null");
            }
            var shareContentBuilder = new NativeSharePhotoContent.Builder();
            if(params.sharePhotos){
                if(TypeUtil.isArray(params.sharePhotos)){
                    for(var key in params.sharePhotos){
                        var shareObject = params.sharePhotos[key].nativeObject.build();
                        shareContentBuilder.addPhoto(shareObject); 
                    }
                }
                else{
                    var shareObject = params.sharePhotos.nativeObject.build();
                    shareContentBuilder.addPhoto(shareObject);
                }
            }
            if(TypeUtil.isString(params.contentUrl)){
                var contentUri = NativeUri.parse(params.contentUrl);
                shareContentBuilder.setContentUrl(contentUri);
            }
            if(TypeUtil.isArray(params.peopleIds)){
                // Arrays.asList causes crash.
                var peopleIdsSet = new NativeArrayList();
                for(var index in params.peopleIds){
                    peopleIdsSet.add(params.peopleIds[index]);
                }
                shareContentBuilder.setPeopleIds(peopleIdsSet);
            }
            if(TypeUtil.isString(params.placeId)){
                shareContentBuilder.setPlaceId(params.placeId);
            }
            if(TypeUtil.isString(params.ref)){
                shareContentBuilder.setRef(params.ref);
            }
            if(params.shareHashtag instanceof Facebook.ShareHashtag){
                var hashTagObject = params.shareHashtag.nativeObject.build();
                shareContentBuilder.setShareHashtag(hashTagObject);
            }
            
            createAndRegisterShareDialog(shareContentBuilder.build(), createShareModeFromString(params.shareMode),
            function(result){
                params.onSuccess && params.onSuccess({postId: result.getPostId()});
            },
            function(e) {
                params.onFailure && params.onFailure(new Error(e.getMessage()));
            },
            function() {
                params.onCancel && params.onCancel();
            });
                   
        },
        enumarable: true
    },
    'shareVideoContent': {
        value: function(params){
            if(!params){
                throw new TypeError("params cannot be null");
            }
            var shareContentBuilder = new NativeShareVideoContent.Builder();
            
            if(TypeUtil.isString(params.contentDescription)){
                shareContentBuilder.setContentDescription(params.contentDescription);
            }
            if(TypeUtil.isString(params.contentTitle)){
                shareContentBuilder.setContentTitle(params.contentTitle);
            }
            if(TypeUtil.isString(params.contentUrl)){
                var contentUri = NativeUri.parse(params.contentUrl);
                shareContentBuilder.setContentUrl(contentUri);
            }
            if(TypeUtil.isArray(params.peopleIds)){
                // Arrays.asList causes crash.
                var peopleIdsSet = new NativeArrayList();
                for(var index in params.peopleIds){
                    peopleIdsSet.add(params.peopleIds[index]);
                }
                shareContentBuilder.setPeopleIds(peopleIdsSet);
            }
            if(TypeUtil.isString(params.placeId)){
                shareContentBuilder.setPlaceId(params.placeId);
            }
            if(params.previewPhoto instanceof Facebook.SharePhoto){
                var sharePhoto = params.previewPhoto.nativeObject.build();
                shareContentBuilder.setPreviewPhoto(sharePhoto);
            }
            if(TypeUtil.isString(params.ref)){
                shareContentBuilder.setRef(params.ref);
            }
            if(params.shareHashtag instanceof Facebook.ShareHashtag){
                var hashTagObject = params.shareHashtag.nativeObject.build();
                shareContentBuilder.setShareHashtag(hashTagObject);
            }
            if(params.shareVideo instanceof Facebook.ShareVideo){
                var shareVideo = params.shareVideo.nativeObject.build();
                shareContentBuilder.setVideo(shareVideo);
            }
            
            createAndRegisterShareDialog(shareContentBuilder.build(), createShareModeFromString(params.shareMode),
            function(result){
                params.onSuccess && params.onSuccess({postId: result.getPostId()});
            },
            function(e) {
                params.onFailure && params.onFailure(new Error(e.getMessage()));
            },
            function() {
                params.onCancel && params.onCancel();
            });          
        },
        enumarable: true
    },
    'android': {
        value: {},
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

Object.defineProperties(Facebook.android, {
    'shareFeedContent': {
        value: function(params){
            if(!params){
                throw new TypeError("params cannot be null");
            }
            var shareContentBuilder = new NativeShareFeedContent.Builder();
            if(TypeUtil.isString(params.contentUrl)){
                var contentUri = NativeUri.parse(params.contentUrl);
                shareContentBuilder.setContentUrl(contentUri);
            }
            if(TypeUtil.isString(params.link)){
                shareContentBuilder.setLink(params.link);
            }
            if(TypeUtil.isString(params.linkName)){
                shareContentBuilder.setLinkName(params.linkName);
            }
            if(TypeUtil.isString(params.linkCaption)){
                shareContentBuilder.setLinkCaption(params.linkCaption);
            }
            if(TypeUtil.isString(params.linkDescription)){
                shareContentBuilder.setLinkDescription(params.linkDescription);
            }
            if(TypeUtil.isString(params.mediaSource)){
                shareContentBuilder.setMediaSource(params.mediaSource);
            }
            if(TypeUtil.isArray(params.peopleIds)){
                // Arrays.asList causes crash.
                var peopleIdsSet = new NativeArrayList();
                for(var index in params.peopleIds){
                    peopleIdsSet.add(params.peopleIds[index]);
                }
                shareContentBuilder.setPeopleIds(peopleIdsSet);
            }
            if(TypeUtil.isString(params.picture)){
                shareContentBuilder.setPicture(params.picture);
            }
            if(TypeUtil.isString(params.placeId)){
                shareContentBuilder.setPlaceId(params.placeId);
            }
            if(TypeUtil.isString(params.ref)){
                shareContentBuilder.setRef(params.ref);
            }
            if(params.shareHashtag instanceof Facebook.ShareHashtag){
                var hashTagObject = params.shareHashtag.nativeObject.build();
                shareContentBuilder.setShareHashtag(hashTagObject);
            }
            
            createAndRegisterShareDialog(shareContentBuilder.build(), createShareModeFromString(params.shareMode),
            function(result){
                params.onSuccess && params.onSuccess({postId: result.getPostId()});
            },
            function(e) {
                params.onFailure && params.onFailure(new Error(e.getMessage()));
            },
            function() {
                params.onCancel && params.onCancel();
            });
        },
        enumarable: true
    }
});

Object.defineProperties(Facebook.HttpMethod, {
    'GET': {
        value: NativeHttpMethod.GET,
        enumarable: true
    },
    'POST': {
        value: NativeHttpMethod.POST,
        enumarable: true
    },
    'DELETE': {
        value: NativeHttpMethod.DELETE,
        enumarable: true
    }
})

// Requiring ShareDialog.Mode causes ExceptionInInitializerError crash so we should not use directly enums
Object.defineProperties(Facebook.ShareMode, {
    'AUTOMATIC': {
        value: "AUTOMATIC",
        enumarable: true
    },
    'FEED': {
        value: "FEED",
        enumarable: true
    },
    'NATIVE': {
        value: "NATIVE",
        enumarable: true
    },
    'WEB': {
        value: "WEB",
        enumarable: true
    }
});

Facebook.AccessToken = function(params){
    if(!params.isInternal){
        throw new Error("Facebook.AccessToken in not creatable, Facebook.AccessToken will created with only Facebook.login() or Facebook.AccessToken.getCurrentAccessToken()");
    }
    this.nativeObject = params.nativeObject;
    
    Object.defineProperties(this,{
        'token': {
            get: function(){
                return this.nativeObject.getToken();
            },
            enumarable: true
        },
        'userId': {
            get: function(){
                return this.nativeObject.getUserId();
            },
            enumarable: true
        },
        'expireDate': {
            get: function(){
                return new Date(this.nativeObject.getExpires().getTime());
            },
            enumarable: true
        },
        'declinedPermissions': {
            get: function(){
                var declinedPermissions = [];
                var iterator = this.nativeObject.getDeclinedPermissions().iterator();
                while(iterator.hasNext()){
                    declinedPermissions.push(iterator.next());
                }
                return declinedPermissions;
            }
        },
        'permissions': {
            get: function(){
                var permissions = [];
                var iterator = this.nativeObject.getPermissions().iterator();
                while(iterator.hasNext()){
                    permissions.push(iterator.next());
                }
                return permissions;
            }
        }
    });
};

Object.defineProperties(Facebook.AccessToken, {
    'getCurrentToken': {
        value: function(){
            var token = NativeAccessToken.getCurrentAccessToken();
            if(!token){
                return null;
            }
            else{
                return new Facebook.AccessToken({
                    nativeObject: token,
                    isInternal: true
                });
            }
        },
        enumarable: true
    }
})

Facebook.SharePhoto = function(params){
    this.nativeObject = new NativeSharePhoto.Builder();
    var _userGenerated;
    var _imageUrl;
    var _caption;
    var _image;
    
    Object.defineProperties(this, {
        'image': {
            get: function(){
                return _image;
            },
            set: function(value){
                if(!(value instanceof Image)){
                    throw new TypeError("image must be UI.Image");
                }
                _image = params.image;
                var bitmap = _image.nativeObject.getBitmap()
                this.nativeObject.setBitmap(bitmap);
            },
            enumarable: true
        },
        'imageUrl': {
            get: function(){
                return _imageUrl;
            },
            set: function(value){
                if(!TypeUtil.isString(value)){
                    throw new TypeError("imageUrl must be string");
                }
                _imageUrl = value;
                var imageUri = NativeUri.parse(_imageUrl);
                this.nativeObject.setImageUrl(imageUri);
            },
            enumarable: true
        },
        'caption': {
            get: function(){
                return _caption;
            },
            set: function(value){
                if(!TypeUtil.isString(value)){
                    throw new TypeError("caption must be string");
                }
                _caption = value;
                this.nativeObject.setCaption(_caption);
            },
            enumarable: true
        },
        'userGenerated': {
            get: function(){
                return _userGenerated;
            },
            set: function(value){
                if(!TypeUtil.isBoolean(params.userGenerated)){
                    throw new TypeError("userGenerated must be boolean");
                }
                _userGenerated = params.userGenerated;
                this.nativeObject.setUserGenerated(_userGenerated);
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
    this.nativeObject = new NativeShareVideo.Builder();
    var _videoFile;
    
    Object.defineProperties(this, {
        'videoFile': {
            get: function(){
                return _videoFile;
            },
            set: function(value){
                const File = require("sf-core/io/file");
                const Path = require("sf-core/io/path");
                
                if(!( (value instanceof File) && (value.type === Path.FILE_TYPE.FILE) )){
                    throw new TypeError("localUrl must be IO.File and cannot be assets or image.");
                }
                _videoFile = value;
                var localUri = NativeUri.fromFile(_videoFile.nativeObject);
                this.nativeObject.setLocalUrl(localUri);
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

Facebook.ShareHashtag = function(params){
    this.nativeObject = new NativeShareHashtag.Builder();
    var _hashTag;
    
    Object.defineProperties(this, {
        'hashTag': {
            get: function(){
                return _hashTag;
            },
            set: function(value){
                if(!TypeUtil.isString(value)){
                    throw new TypeError("hashTag must be string");
                }
                _hashTag = params.hashTag;
                this.nativeObject.setHashtag(_hashTag);
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

function createShareModeFromString(value){
    const NativeShareDialog = requireClass('com.facebook.share.widget.ShareDialog');
    switch (value) {
        case 'NATIVE':
            return NativeShareDialog.Mode.NATIVE;
        case 'FEED':
            return NativeShareDialog.Mode.FEED;
        case 'WEB':
            return NativeShareDialog.Mode.WEB;
        default:
            return NativeShareDialog.Mode.AUTOMATIC;
    }
}

function createAndRegisterShareDialog(shareContent, shareMode, onSuccess, onFailure, onCancel){
    const NativeShareDialog = requireClass('com.facebook.share.widget.ShareDialog');
    var shareDialog = new NativeShareDialog(spratAndroidActivityInstance);
    shareDialog.registerCallback(callbackManager, NativeFacebookCallback.implement({
        onSuccess: function(result){
            onSuccess && onSuccess(result);
        },
        onCancel: function(){
            onCancel && onCancel();
        },
        onError: function(e){
            onFailure && onFailure(e);
        }
    }));
    
    shareDialog.show(shareContent, shareMode);
}

module.exports = Facebook;