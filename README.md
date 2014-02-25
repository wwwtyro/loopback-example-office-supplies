# Loopback Examples: Office Supplies

## How to install and run the Office Supplies example app:

### Clone the project and install the server dependencies

```sh
git clone git@github.com:strongloop/loopback-example-access-control.git
cd loopback-example-access-control
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
mkdir access-control
cd access-control
slc lb project server
```

### 2. Define a `Bank` model to store a set of `Bank`s in the database.

```sh
cd server
slc lb model product
```

### 3. Define a `Category` model.

```sh
slc lb model category
```

### 4. Setup a relationship between Categories and Products.

Add the following relationship to `model.json`.

```JSON

  ...

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
      }
    }
  }

  ...

```

### 6. Secure all the APIs.

This will prevent any unauthorized access to the REST api.

```sh
slc lb acl --all-models --deny --everyone
```

### 7. Allow admins to modify products

```
slc lb acl --model product --allow --owner --all
````

### 8. Create a product (Node.js)

```js
var product = require('./app.js').models.product;

product.create({
  name: 'pencil',
  price: 0.99,
  categoryId: categoryId // the id of the category this product belongs to
  ownerId: ownerId       // the id of the user who owns this product
}, function(err, pencil) {
  console.log(pencil);
});
```