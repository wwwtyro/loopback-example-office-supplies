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
      }
    },
    "properties": {},
    "public": true,
    "dataSource": "db"
  },
```

### 5. Create a product (Node.js)

Add the following code in `/models/products.js`:

```js
var app = require('../app');
var product = app.models.product;
var category = app.models.category;

category.create({name: 'stationery'}, function(err, stationery) {
  product.create({
    name: 'pencil',
    price: 0.99,
    categoryId: stationery.id,
    ownerId: stationery.id
  }, function() {
    product.findOne({where: {categoryId: stationery.id}}, function(err, pencil) {
      console.log(pencil);
    });
  });
});
```

### 6. Run the app

Now run the app as follows.  Make sure you are in the `server` directory:

```
$ slc run
```

### 7. Check out your APIs with the built-in API Explorer

View your application's APIs with the LoopBack API Explorer at http://0.0.0.0:3000/explorer.  
In addition to the standard endpoints for users, accessTokens, applications, push, installations, and notifications, you will see endpoints for the products and categories models you created.

Click on **/products** to see the REST endpoints for the products model.

You can see the "product" data you added programmatically, click:
 1.  **/products**
 2. **GET / Find all instances of the model matched by filter from the data source**.
 3. **Try it out!**

In the **Response Body** you'll see the operation returns the data you added:

```
[
  {
    "id": 1,
    "categoryId": 1,
    "ownerId": 1,
    "name": "pencil",
    "price": 0.99
  }
]
```

If you want to convince yourself that the write APIs also work, try this:

 1. Click **PUT /products Update an existing model instance or insert a new one into the data source**.
 2. Copy the data returned from the above GET operation (as shown above), and paste it in the **Value** field under **Parameters**, but edit it so it has a unique `id` value and a different product name, as shown for example below.
 3. Click **Try it Out!** to perform the PUT operation.
 4. Repeat the GET operation you performed previously to confirm that the data was saved and is returned by the query.

```
[
  {
    "id": 2,
    "categoryId": 1,
    "ownerId": 1,
    "name": "pen",
    "price": 0.99
  }
]
```

### 8. Secure all the APIs.

This will prevent any unauthorized access to the REST API.

```sh
slc lb acl --all-models --deny --everyone
```

### 9. Allow admins to modify products

```
slc lb acl --model product --allow --owner --all
````
