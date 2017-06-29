/**
 * @class Facebook
 * @since 1.0
 * @see https://developers.facebook.com/
 * @see https://developer.smartface.io/v1.1/docs/facebook-plugin
 *
 * Facebook SDK for iOS and Android allows developers to use some Facebook features with your app such as “share” or “send a message” 
 * from your app to Facebook. It lets people easily sign in to your app with their Facebook accounts. If they have already signed in
 * with Facebook for iOS and Android app, they don’t have to re-enter their username and password. We’ve already integrated iOS and 
 * Android Facebook SDK into Smartface . You only need to create an application on Facebook developer site and need to know JavaScript 
 * functions of the Smartface Facebook plugin.
 * 
 * 
 *     @example
 *     
 *
 */
function Facebook(params){}

/**
 * Get & Set the Facebook App ID used by the SDK.
 * 
 * @property {String} applicationId
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.applicationId;

/**
 * Get & Set the Facebook Applicatcion Name used by the SDK.
 * 
 * @property {String} applicationName
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.applicationName;

/**
 * Overrides the default Graph API version.
 * The string should be of the form `@"v2.7"`.
 * 
 * @property {String} graphApiVersion
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.graphApiVersion;

/**
 * Get & Set the Client Token for the Facebook App.

 * This is needed for certain API calls when made anonymously, without a user-based access token.
 * - Parameter clientToken: The Facebook App's "client token", which, for a given appid can be found in the Security
 * section of the Advanced tab of the Facebook App settings found at <https://developers.facebook.com/apps/[your-app-id]>
 * 
 * @property {String} clientToken
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.clientToken;

/**
 * Get current SDK version.
 * 
 * @property {String} sdkVersion
 * @readonly
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.sdkVersion;

/**
 * Use this method when asking for publish permissions. You should only ask for permissions when they
 * are needed and explain the value to the user. You can inspect the params.onSuccess.data.deniedPermissions to also
 * provide more information to the user if they decline permissions.

 * This method will present UI the user. You typically should check if `Facebook.AccessToken.getCurrentToken`
 * already contains the permissions you need before asking to reduce unnecessary app switching.
 * You can only do one login call at a time. Calling a login method before the completion handler is called
 * on a previous login will return an error.
 * 
 *     @example
 *      const Facebook = require("sf-plugin-facebook");
 *      var grantedReadPermissions;
 *      var deniedReadPermissions;
 *      var accessToken;
 *      Facebook.logInWithPublishPermissions({
 *            page: page, 
 *            permissions: ['publish_actions'],
 *            onSuccess: function(data){
 *                grantedReadPermissions = data.grantedPermissions;
 *                deniedReadPermissions = data.deniedPermissions;
 *                accessToken = data.accessToken;
 *            },
 *            onFailure: function(e){
 *                alert("Failed to login: " + e);
 *            },
 *            onCancel: function(){
 *                alert("Login canceled");
 *            }
 *      });
 *
 * @method logInWithPublishPermissions
 * @param {Object} params
 * @param {UI.Page} params.page
 * @param {String[]} params.permissions
 * @param {Function} params.onSuccess
 * @param {Object} params.onSuccess.data
 * @param {String[]} params.onSuccess.data.deniedPermissions
 * @param {String[]} params.onSuccess.data.grantedPermissions
 * @param {Facebook.AccessToken} params.onSuccess.data.accessToken
 * @param {Function} params.onFailure
 * @param {Object} params.onFailure.error
 * @param {Function} params.onCancel
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.logInWithPublishPermissions = function(params){};

/**
 * Use this method when asking for read permissions. You should only ask for permissions when they
 * are needed and explain the value to the user. You can inspect the params.onSuccess.data.deniedPermissions to also
 * provide more information to the user if they decline permissions.

 * This method will present UI the user. You typically should check if `Facebook.AccessToken.getCurrentToken`
 * already contains the permissions you need before asking to reduce unnecessary app switching.
 * You can only do one login call at a time. Calling a login method before the completion handler is called
 * on a previous login will return an error.
 * 
 *     @example
 *      const Facebook = require("sf-plugin-facebook");
 *      var grantedReadPermissions;
 *      var deniedReadPermissions;
 *      var accessToken;
 *      Facebook.logInWithReadPermissions({
 *            page: page, 
 *            permissions: ['user_posts', 'public_profile', 'user_friends', 'user_photos', 'email', 'user_about_me', 'user_hometown'],
 *            onSuccess: function(data){
 *                grantedReadPermissions = data.grantedPermissions;
 *                deniedReadPermissions = data.deniedPermissions;
 *                accessToken = data.accessToken;
 *            },
 *            onFailure: function(e){
 *                alert("Failed to login: " + e);
 *            },
 *            onCancel: function(){
 *                alert("Login canceled");
 *            }
 *      });
 *
 * @method logInWithReadPermissions
 * @param {Object} params
 * @param {UI.Page} params.page
 * @param {String[]} params.permissions
 * @param {Function} params.onSuccess
 * @param {Object} params.onSuccess.data
 * @param {String[]} params.onSuccess.data.deniedPermissions
 * @param {String[]} params.onSuccess.data.grantedPermissions
 * @param {Facebook.AccessToken} params.onSuccess.data.accessToken
 * @param {Function} params.onFailure
 * @param {Object} params.onFailure.error
 * @param {Function} params.onCancel
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.logInWithReadPermissions = function(params){};

/**
 * Logout current user from application. After logout, user's access token will be deleted.
 *
 * @method logOut
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.logOut = function(params){};


/**
 * Represents a request to the Facebook Graph API.
 * `Facebook.graphRequest` encapsulates the components of a request
 * Nearly all Graph APIs require an access token. Unless specified, the
 * `Facebook.AccessToken.getCurrentToken` is used. Therefore, most requests
 * will require login first.
 *     @example
 *     Facebook.graphRequest({
 *           graphPath : "me",
 *           parameters : null,
 *           httpMethod : Facebook.HttpMethod.GET,
 *           onFailure : function(error){
 *               alert(error.message);
 *           },
 *           onSuccess : function(data){
 *               alert("Success : " + JSON.stringify(data));
 *           }
 *       });
 *
 * @method graphRequest
 * @param {Object} params
 * @param {String} params.graphPath
 * @param {Object} params.params
 * @param {Facebook.HttpMethod} params.httpMethod
 * @param {Function} params.onSuccess
 * @param {Object} params.onSuccess.data
 * @param {Function} params.onFailure
 * @param {Object} params.onFailure.error
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.graphRequest = function(params){};

/**
 * A model for status and link content to be shared.
 * 
 *     @example
 *     Facebook.shareLinkContent({
 *           page : this,
 *           shareHashtag : new Facebook.ShareHashtag({hashTag :"#HashTag"}),
 *           shareMode : Facebook.ShareMode.WEB,
 *           contentUrl : "https://www.smartface.io/smartface/",
 *           quote : "quote",
 *           placeId : "572462939538226",
 *           ref : "refString",
 *           onSuccess : function(data){
 *               alert("data : " + JSON.stringify(data));
 *           },
 *           onCancel : function(){
 *               alert("cancel");
 *           },
 *           onFailure : function(error){
 *               alert(error.message);
 *           }
 *       });
 *
 * @method shareLinkContent
 * @param {Object} params
 * @param {UI.Page} params.page
 * @param {String} params.contentUrl
 * @param {String[]} params.peopleIds
 * @param {String} params.placeId
 * @param {String} params.quote
 * @param {String} params.ref
 * @param {Facebook.ShareHastag} params.shareHashtag
 * @param {Facebook.ShareMode} params.shareMode
 * @param {Function} params.onSuccess
 * @param {String} params.onSuccess.postId
 * @param {Function} params.onFailure
 * @param {Object} params.onFailure.error
 * @param {Function} params.onCancel
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.shareLinkContent = function(params){};

/**
 * A model for media content (photo or video) to be shared.
 * 
 *     @example
 *    	var photo = new Facebook.SharePhoto();
 *	    photo.image = Image.createFromFile("images://smartface.png");
 *	    photo.caption = "Caption";
 *
 *    	var photo2 = new Facebook.SharePhoto();
 *	    photo2.image = Image.createFromFile("images://smartface.png");
 *	    photo2.caption = "Caption";
 *
 *	    Facebook.shareMediaContent({
 *	        page : this,
 *	        shareMedia : [photo,photo2],
 *	        shareHashtag : new Facebook.ShareHashtag({hashTag :"#HashTag"}),
 *	        quote : "quote",
 *	        placeId : "572462939538226",
 *	        ref : "refString",
 *	        onSuccess : function(data){
 *	            alert("data : " + JSON.stringify(data));
 *	        },
 *	        onCancel : function(){
 *	            alert("cancel");
 *	        },
 *	        onFailure : function(error){
 *	            alert(error.message);
 *	        }
 *	    });
 *
 * @method shareMediaContent
 * @param {Object} params
 * @param {UI.Page} params.page
 * @param {String} params.contentUrl
 * @param {String[]} params.peopleIds
 * @param {String} params.placeId
 * @param {String} params.ref
 * @param {Facebook.ShareHastag} params.shareHashtag
 * @param {Facebook.SharePhoto[]|Facebook.ShareVideo[]} params.shareMedia
 * @param {Facebook.ShareMode} params.shareMode
 * @param {Function} params.onSuccess
 * @param {String} params.onSuccess.postId
 * @param {Function} params.onFailure
 * @param {Object} params.onFailure.error
 * @param {Function} params.onCancel
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.shareMediaContent = function(params){};

/**
 * A model for photo content to be shared.
 * 
 *     @example
 *     var photo = new Facebook.SharePhoto();
 *       photo.image = Image.createFromFile("images://smartface.png");
 *       photo.caption = "Caption";
 *
 *       Facebook.sharePhotoContent({
 *           page : this,
 *           sharePhotos : [photo],
 *           peopleIds : ["AaJcJfLdxS-rC9PmYMh1zQL7_6LriPY346Jziz0QZxx"],
 *           shareHashtag : new Facebook.ShareHashtag({hashTag :"#HashTag"}),
 *           shareMode : Facebook.ShareMode.NATIVE,
 *           quote : "quote",
 *           placeId : "572462939538226",
 *           ref : "refString",
 *           onSuccess : function(data){
 *               alert("data : " + JSON.stringify(data));
 *           },
 *           onCancel : function(){
 *               alert("cancel");
 *           },
 *           onFailure : function(error){
 *               alert(error.message);
 *           }
 *       });
 *
 * @method sharePhotoContent
 * @param {Object} params
 * @param {UI.Page} params.page
 * @param {Facebook.SharePhoto[]|Facebook.SharePhoto} params.sharePhotos
 * @param {String} params.contentUrl
 * @param {String[]} params.peopleIds
 * @param {String} params.placeId
 * @param {String} params.ref
 * @param {Facebook.ShareHastag} params.shareHashtag
 * @param {Facebook.ShareMode} params.shareMode
 * @param {Function} params.onSuccess
 * @param {String} params.onSuccess.postId
 * @param {Function} params.onFailure
 * @param {Object} params.onFailure.error
 * @param {Function} params.onCancel
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.sharePhotoContent = function(params){};

/**
 * A model for video content to be shared.
 * 
 *     @example
 *       Multimedia.pickFromGallery({
 *           type: Multimedia.Type.VIDEO,
 *           onSuccess: onSuccess,
 *           page : this
 *        });
 *
 *       function onSuccess(picked) { 
 *           var video = picked.video;
 *           var shareVideo = new Facebook.ShareVideo();
 *           shareVideo.videoFile = video;
 *
 *           Facebook.shareVideoContent({
 *                page : this,
 *                shareVideo : shareVideo,
 *                peopleIds : ["AaJcJfLdxS-rC9PmYMhzQL7_6LriPY46JzizQZ25"],
 *                shareHashtag : new Facebook.ShareHashtag({hashTag :"#HashTag"}),
 *                quote : "quote",
 *                placeId : "572462939538226",
 *                ref : "refString",
 *                onSuccess : function(data){
 *                    alert("data : " + JSON.stringify(data));
 *                },
 *                onCancel : function(){
 *                    alert("cancel");
 *                },
 *                onFailure : function(error){
 *                    alert(error.message);
 *                }
 *            });
 *       }
 *
 * @method shareVideoContent
 * @param {Object} params
 * @param {UI.Page} params.page
 * @param {String} params.contentDescription
 * @param {String} params.contentTitle
 * @param {String} params.contentUrl
 * @param {String[]} params.peopleIds
 * @param {String} params.placeId
 * @param {Facebook.SharePhoto} params.previewPhoto
 * @param {String} params.ref
 * @param {Facebook.ShareHastag} params.shareHashtag
 * @param {Facebook.ShareMode} params.shareMode
 * @param {Facebook.ShareVideo} params.shareVideo
 * @param {Function} params.onSuccess
 * @param {String} params.onSuccess.postId
 * @param {Function} params.onFailure
 * @param {Object} params.onFailure.error
 * @param {Function} params.onCancel
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.shareVideoContent = function(params){};

/**
 * @class Facebook.AccessToken
 * @since 1.0
 *
 * Represents an immutable access token for using Facebook services.
 * 
 *     @example
 *     Facebook.AccessToken.getCurrentToken()
 * 
 */
Facebook.AccessToken = function(){

    /**
     * Returns the opaque token string.
     * 
     * @property {String} token
     * @readonly
     * @android
     * @ios
     * @since 1.0
     */
    this.token;
    
    /**
     * Returns the user ID.
     * 
     * @property {String} userId
     * @readonly
     * @android
     * @ios
     * @since 1.0
     */
    this.userId;
    
    /**
     * Returns the expiration date.
     * 
     * @property {Date} expireDate
     * @readonly
     * @android
     * @ios
     * @since 1.0
     */
    this.expireDate;
    
    /**
     * Returns the known declined permissions.
     * 
     * @property {String[]} declinedPermissions
     * @readonly
     * @android
     * @ios
     * @since 1.0
     */
    this.declinedPermissions;
    
    /**
     * Returns the known granted permissions.
     * 
     * @property {String[]} permissions
     * @readonly
     * @android
     * @ios
     * @since 1.0
     */
    this.permissions;
};

/**
 * 	 Returns the "global" access token that represents the currently logged in user.
 *
 *	 The `Facebook.AccessToken.getCurrentToken` is a convenient representation of the token of the
 *	 current user and is used by other SDK components
 * 
 *     @example
 *     var currentToken = Facebook.AccessToken.getCurrentToken();
 *
 * @method getCurrentToken
 * @return {Facebook.AccessToken}
 * @android
 * @ios
 * @static
 * @since 1.0
 */
Facebook.AccessToken.getCurrentToken = function(){};

/**
 * @class Facebook.SharePhoto
 * @since 1.0
 *
 * A photo for sharing.
 * 
 *     @example
 *     var photo = new Facebook.SharePhoto();
 *     photo.image = Image.createFromFile("images://smartface.png");
 *     photo.caption = "Caption";
 * 
 */
Facebook.SharePhoto = function(){
    
    /**
     * Gets/sets the image set.
     * 
     * @property {UI.Image} image
     * @android
     * @ios
     * @since 1.0
     */
    this.image;
    
    /**
     * The URL to the photo.
     * 
     * @property {String} imageUrl
     * @android
     * @ios
     * @since 1.0
     */
    this.imageUrl;
    
    /**
     * The user generated caption for the photo
     * 
     * @property {String} caption
     * @android
     * @ios
     * @since 1.0
     */
    this.caption;
    
    /**
     * Specifies whether the photo represented by the receiver was generated by the user or by the application.
     * 
     * @property {Boolean} userGenerated
     * @android
     * @ios
     * @since 1.0
     */
    this.userGenerated;
};

/**
 * @class Facebook.ShareVideo
 * @since 1.0
 *
 * A video for sharing.
 * 
 *     @example
 *     var shareVideo = new Facebook.ShareVideo();
 *	   var file = new File({path:value});
 *     shareVideo.videoFile = file;
 * 
 */
Facebook.ShareVideo = function(){
    /**
     * Gets/sets the video file set.
     * 
     * @property {IO.File} videoFile
     * @android
     * @ios
     * @since 1.0
     */
    this.videoFile;
};

/**
 * @class Facebook.ShareHashtag
 * @since 1.0
 *
 * Represents a single hashtag that can be used with the share dialog.
 * 
 *     @example
 *     var hashTag = new Facebook.ShareHashtag({hashTag :"#HashTag"});
 *
 *     @param {Object} params
 *     @param {String} params.hashTag
 */
Facebook.ShareHashtag  = function(params){

    /**
     * The hashtag string.
     * 
     * @property {String} hashTag
     * @readonly
     * @android
     * @ios
     * @since 1.0
     */
    this.hashTag;
};

/** 
 * @enum Facebook.HttpMethod 
 * @since 1.0
 * 
 * Graphrequest HTTP methods
 * 
 */
Facebook.HttpMethod = {};

/**
 * Graphrequest GET method
 *
 * @property GET
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.0
 */
Facebook.HttpMethod.GET;

/**
 * Graphrequest POST method
 *
 * @property POST
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.0
 */
Facebook.HttpMethod.POST;

/**
 * Graphrequest DELETE method
 *
 * @property DELETE
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.0
 */
Facebook.HttpMethod.DELETE;

/** 
 * @enum Facebook.ShareMode 
 * @since 1.0
 * 
 * The automatic mode will progressively check the availability of different modes and open the most
 * appropriate mode for the dialog that is available.
 * 
 */
Facebook.ShareMode = {};

/**
 * Acts with the most appropriate mode that is available.
 *
 * @property AUTOMATIC
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.0
 */
Facebook.ShareMode.AUTOMATIC;

/**
 * Displays the feed dialog in Browser.
 *
 * @property FEED
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.0
 */
Facebook.ShareMode.FEED;

/**
 * Displays the dialog in the main native Facebook app.
 *
 * @property NATIVE
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.0
 */
Facebook.ShareMode.NATIVE;

/**
 * Displays the dialog in Browser.
 *
 * @property WEB
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.0
 */
Facebook.ShareMode.WEB;

module.exports = Facebook;