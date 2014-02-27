# Loopback Examples: Office Supplies

## How to install and run the Office Supplies example app:

### Clone the project and install the server dependencies

```sh
git clone git@github.com:strongloop/loopback-example-office-supplies.git
cd loopback-example-office-supplies
npm install
```

### Run the app

> **Make sure you are in the server directory!**

```sh
node app
```

## How to build the Office Supplies example app:

### 0. Make sure you have `slc` version **>= 2.1.0**.

To install the latest version of `slc`:

```sh
npm install strong-cli -g
```

To check your version of `slc`:

```sh
slc version
```

Should print something similar to:

```
slc v2.1.1 (node v0.10.24)
```

### 1. Create the application using the `slc` command line tool.

```sh
mkdir loopback-example-office-supplies
cd loopback-example-office-supplies
slc lb project server
```

### 2. Define a `product` model to persist a list of products.

```sh
cd server
slc lb model product
```

### 3. Define a `Category` model.

```sh
slc lb model category
```

### 4. Setup a relationship between Categories and Products.

Edit the `models.json` file, and replace the following lines:
```JSON
 "product": { 
    "properties": {},
    "public": true,
    "dataSource": "db"
  },
  ...
```
with the following:

```JSON
  "product": { 
    "options": {
      "relations": {
        "category": {
          "model": "category",
          "type": "belongsTo",
          "foreignKey": "categoryId"
        },
        "owner": {
          "model": "category",
          "type": "belongsTo",
          "foreignKey": "ownerId"
        }
      },
    },
    "properties": {},
    "public": true,
    "dataSource": "db"
  },
```

### 6. Secure all the APIs.

This will prevent any unauthorized access to the REST API.

```sh
slc lb acl --all-models --deny --everyone
```

### 7. Allow admins to modify products

```
slc lb acl --model product --allow --owner --all
````

### 8. Create a product (Node.js)

Add the following code in `/models/products.js`:

```js
var app = require('../app');
var product = app.models.product;
var category = app.models.category;

category.create({name: 'stationary'}, function(err, stationary) {
  product.create({
    name: 'pencil',
    price: 0.99,
    categoryId: stationary.id,
    ownerId: stationary.id
  }, function() {
    product.findOne({where: {categoryId: stationary.id}}, function(err, pencil) {
      console.log(pencil);
    });
  });
});
```

### 9. Run the app

Now run the app as follows.  Make sure you are in the `server` directory:

```
$ slc run
```

### 10. Check out the API

Now you can view the LoopBack API Explorer at http://0.0.0.0:3000/explorer.  
In addition to the standard endpoints for users, accessTokens, applications, push, installations, and notifications, you will see endpoints for the products and categories models you created.

To see the data you added, click:
 1.  **/products**
 2. **Find all instances of the model matched by filter from the data source**.
 3. **Try it out!**
