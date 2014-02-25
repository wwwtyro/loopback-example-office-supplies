var app = require('../app');
var product = app.models.product;
var category = app.models.category;

category.create({name: 'stationary'}, function(err, stationary) {
  product.create({
    name: 'pencil',
    pricer: 0.99,
    categoryId: stationary.id,
    ownerId: stationary.id
  }, function() {
    product.findOne({where: {categoryId: stationary.id}}, function(err, pencil) {
      console.log(pencil);
    });
  });
});

