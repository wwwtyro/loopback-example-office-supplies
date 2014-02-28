var app = require('../app');                                                                                         

User.create({
  email: 'me@domain.com',   // required by default
  password: 'secret'        // required by default
}, function (err, user) {
  console.log(user.id);     // => the user id (default type: db specific | number)
  console.log(user.email);  // => the user's email
});

var DAY = 1000 * 60 * 60 * 24;
User.login({
  email: 'me@domain.com',           // must provide email or "username"
  password: 'secret',               // required by default
  ttl: DAY                    // keep the AccessToken alive for one day
}, function (err, accessToken) {
  console.log(accessToken.id);      // => GOkZRwg... the access token
  console.log(accessToken.ttl);     // => 1209600 time to live
  console.log(accessToken.created); // => 2013-12-20T21:10:20.377Z
  console.log(accessToken.userId);  // => 1
});
