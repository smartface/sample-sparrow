const Page = require('sf-core/ui/page');
const extend = require("js-base/core/extend");
const Color = require('sf-core/ui/color');
const Button = require('sf-core/ui/button');
const FlexLayout = require("sf-core/ui/flexlayout");
const Label = require("sf-core/ui/label");
const Font = require("sf-core/ui/font");
const Facebook = require("sf-extension-facebook");

var readPermissions = ['user_posts', 'public_profile', 'user_friends', 'user_photos'];
var publishPermissions = ['publish_actions'];
var defaultFont = Font.create(Font.DEFAULT, 12, Font.BOLD);

var myLabel;
var myFlexLayoutOptions;

const actions = {
	'Facebook Set App Name & ID': function(){
		Facebook.applicationId = 'APPLICATION_ID';
		myLabel.text = myLabel.text + "\n\nFacebook appId: " + Facebook.applicationId;
		Facebook.applicationName = "APPLICATION_NAME";
		myLabel.text = myLabel.text + "\nFacebook appName: " + Facebook.applicationName;
	},
	'Facebook Login': function(){
		Facebook.loginWithReadPermissions({
			page: this, 
			permissions: readPermissions,
			onSuccess: function(data){
				myLabel.text = myLabel.text + "\n\nLoginData: " + JSON.stringify(data);
			},
			onFailure: function(e){
				myLabel.text = myLabel.text + "\n\nLoginData: error";
				Application.onUnhandledError(e);
			},
			onCancel: function(){
				myLabel.text = myLabel.text + "\n\nLoginData: canceled";
			}
		});
	},
	'User Info': function(){
		Facebook.graphRequest({
			graphPath: '/me?fields=id,name,about,birthday,email,gender,hometown,work', 
			parameters: null,
			httpMethod: Facebook.HttpMethod.GET,
			onSuccess: function(data){
				myLabel.text = myLabel.text + "\n\nUser: " + JSON.stringify(data);
			},
			onFailure: function(e){
				myLabel.text = myLabel.text + "\n\nUser: error";
				Application.onUnhandledError(e);
			},
		});
	},
	'User Friends': function(){
		Facebook.graphRequest({
			graphPath: '/me/friends?fields=id,name&debug=all', 
			parameters: null,
			httpMethod: Facebook.HttpMethod.GET,
			onSuccess: function(data){
				myLabel.text = myLabel.text + "\n\nFriends: " + JSON.stringify(data);
			},
			onFailure: function(e){
				myLabel.text = myLabel.text + "\n\nFriends: error";
				Application.onUnhandledError(e);
			},
		});
	},
	'User Posts': function(){
		Facebook.graphRequest({
			graphPath: '/' + Facebook.AccessToken.getCurrentToken().userId + '/posts', 
			parameters: null,
			httpMethod: Facebook.HttpMethod.GET,
			onSuccess: function(data){
				myLabel.text = myLabel.text + "\n\nPosts: " + JSON.stringify(data);
			},
			onFailure: function(e){
				myLabel.text = myLabel.text + "\n\nPosts: error";
				Application.onUnhandledError(e);
			},
		});
	},
	'User New Post': function(){
		Facebook.graphRequest({
			graphPath: '/me/feed', 
			parameters: {
				'message' : "This is Smartface Native Framework Facebook Plugin!"
			},
			httpMethod: Facebook.HttpMethod.POST,
			onSuccess: function(data){
				myLabel.text = myLabel.text + "\n\nPost post: " + JSON.stringify(data);
			},
			onFailure: function(e){
				myLabel.text = myLabel.text + "\n\nPost post: error";
				Application.onUnhandledError(e);
			},
		});
	},
	'User Albums': function(){
		Facebook.graphRequest({
			graphPath: '/me/albums',
			httpMethod: Facebook.HttpMethod.GET,
			onSuccess: function(data){
				myLabel.text = myLabel.text + "\n\nUser Albums: " + JSON.stringify(data);
			},
			onFailure: function(e){
				myLabel.text = myLabel.text + "\n\nUser Albums: error";
				Application.onUnhandledError(e);
			},
		});
	},
	'Post Photo': function(){
		var sharePhoto = new Facebook.SharePhoto({
			image: Image.createFromFile('images://smartface.png'),
			caption: "Smartface Facebook Plugin"
		});
		var shareHashtag = new Facebook.ShareHashtag({
			hashTag: '#smartface'
		});

		Facebook.sharePhotoContent({
			page: page,
			sharePhotos: [sharePhoto],
			placeId: "572462939538226",
			shareHashtag: shareHashtag,
			shareMode: Facebook.ShareMode.AUTOMATIC,
			caption: "Smartface Native Framework",
			onSuccess: function(data){
				myLabel.text = myLabel.text + "\n\nsharePhotoContent: " + JSON.stringify(data);
			},
			onFailure: function(e){
				myLabel.text = myLabel.text + "\n\nsharePhotoContent: error";
				Application.onUnhandledError(e);
			},
			onCancel: function(){
				myLabel.text = myLabel.text + "\n\nsharePhotoContent: canceled";
			}
		});
	},
}


var Page1 = extend(Page)(
	function(_super) {
		var self = this;
		_super(this, {
			onShow: function() {
			},
			onLoad: function() {
				myLabel = new Label({
					flexGrow: 1,
					width: 350,
					backgroundColor: Color.BLUE,
					textColor: Color.WHITE,
					multiline: true
				});
				
				myFlexLayoutOptions = new FlexLayout({
					flexDirection: FlexLayout.FlexDirection.ROW,
					flexWrap: FlexLayout.FlexWrap.WRAP,
					alignItems: FlexLayout.AlignItems.CENTER,
					flexGrow: 1,
					width: 350
				});
				
				Object.keys(actions).forEach(function(key){
					var btn = new Button({
						height: 50,
						width: 100,
						margin: 5,
						font: defaultFont,
						action: actions[key],
						backgroundColor: Color.create("#00A1F1"),
						text: key,
						onPress: function(){
							this.action();
						}
					});
					myFlexLayoutOptions.addChild(btn);
				})
				
				this.layout.alignItems = FlexLayout.AlignItems.CENTER;
				this.layout.addChild(myLabel);
				this.layout.addChild(myFlexLayoutOptions);
			}
		});
	}
);

module.exports = Page1;
