# Passport-EasyAuth
The [EasyAuth](https://easyauth.io/) authentication strategy for [Passport.js](http://passportjs.org/), an authentication middleware for Node.js that can be unobtrusively dropped into any Express-based web application.

## Getting started

### Installation

The EasyAuth Passport strategy is installed with npm. 

```
npm install @easyauth.io/passport-easyauth
```

#### Create Strategy

```js
//Strategy.js

const passport = require('passport');
const EasyAuthStrategy = require('passport-easyauth');

passport.use(
  new EasyAuthStrategy(
    {
      discoveryURL: '',
      clientID: '',
      clientSecret: '',
      callbackURL: [''],
    },
    function (tokenset, userinfo, done) {
      done(null, userinfo);
    }
  )
);

```
Set:

`discoveryURL` to EasyAuth Tenant URL.

`clientID` to Registered Client ID of respective EasyAuth Tenant.

`clientSecret` to Client secret of respective ClientID.

`callbackURL` to Redirect URL of respective ClientID. 

#### Express Usage

```js
//index.js

app.get(
  "loginURL",
  passport.authenticate("easyauth", { scope: "openid" })
);

app.get(
  "callbackURL",
  passport.authenticate("easyauth", { failureRedirect: "loginURL" }),
  
  //Authentication successful
  (req, res) => {
    res.redirect("protectedURL");
  }
);
```
