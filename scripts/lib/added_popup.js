const Animator = require('sf-core/ui/animator');
const FlexLayout = require("sf-core/ui/flexlayout");
const Image = require("sf-core/ui/image");
const ImageView = require("sf-core/ui/imageview");
const Timer = require("sf-core/timer");

var tick = new ImageView({
    width: 200,
    height: 200,
    image: Image.createFromFile("images://success.png"),
    imageFillType: ImageView.FillType.ASPECTFIT,
    positionType: FlexLayout.PositionType.ABSOLUTE,
    alignSelf: FlexLayout.AlignSelf.CENTER,
});

if (Device.deviceOS === "iOS") {
    tick.alpha = 0;
} else {
    tick.visible = false;
}

tick.show = function(parentLayout, callback) {
    parentLayout.addChild(this);
    parentLayout.applyLayout();
    Animator.animate(parentLayout, 500, function() {
        if (Device.deviceOS === "iOS") {
            tick.alpha = 1;
        } else {
            tick.visible = true;
        }
    }).then(750, function(){
        // wait
    }).then(500, function() {
        if (Device.deviceOS === "iOS") {
            tick.alpha = 0;
        } else {
            tick.visible = false;
        }
    }).complete(function(){
        parentLayout.removeChild(tick);
        callback();
    });
}

module.exports = tick;