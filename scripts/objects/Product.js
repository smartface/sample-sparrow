function Product(){}

Product.prototype.id = "";
Product.prototype.title = "";
Product.prototype.image = "";
Product.prototype.amount = 0;
Product.prototype.variants = [];
Product.prototype.images = [];
Product.prototype.options = [];

module.exports = Product;