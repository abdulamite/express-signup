const Product = require('../models/product.model');

exports.test = function (req, res) {
    res.json({greet: "Greeting from the Test Controller"});
};

// Create a new document in the DB.
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

// Get product details
exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

// Update a document in the DB.
exports.product_update = function (req, res, next){
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
}

// Remove a document from the DB
exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

exports.product_search = function (req, res, next){
    const id = req.body.id;
    Product.findById(id, (err, product)=>{
        if (err) return next (err);
        res.json(product);
    })
}