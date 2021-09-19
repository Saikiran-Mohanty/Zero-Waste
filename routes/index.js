const { Router } = require('express');
var express = require('express');
var router = express.Router();

// Store data in variable 
var utils = require('./utils');
var user_db = new Map();
var pins = new Map();
const allowedTime = 60 * 4; // 4 min expiry
const reward = 100; // 100 points for one throw

// auth --
router.post('/login', (req, res) => {
  // console.log("login", req.body);
  let suc = utils.handleLogin(req.body.email, req.body.pass, user_db);
  res.send(utils.msgwd(1, suc));
})
router.post('/signup', (req, res) => {
  // console.log("login", req.body);
  let suc = utils.handleSignin(req.body.email, req.body.pass, user_db);
  res.send(utils.msgwd(1, suc));
})
router.get('/logout', (req, res) => {
  // console.log("login", req.body);
  let suc = utils.handleLogout(req.body.email, user_db);
  res.send(utils.msgwd(1, suc));
})

router.use('/info', (req, res) => {
  console.log("DB:", user_db);
  console.log("PIS:", pins);
  res.send("ok");
})

// reward system ---
router.get('/user', (req, res) => {
  // console.log("Q:", req.query);
  if(user_db.has(req.query.email)){
    res.send(utils.msgwd(1, user_db.get(req.query.email)));
  }
  else res.send(utils.msgwd(0, "Invalid user"));
})

router.post("/otp", (req, res) => {
  if(utils.handleLogin(req.body.email, req.body.pass, user_db)){
    if(pins.has(req.body.otp)){
      let tt = pins.get(req.body.otp);
      let cur = Date.now()/1000;
      pins.delete(req.body.otp);
      if(cur - tt <= allowedTime) {
        user_db.get(req.body.email).addPoints(reward)  
        res.send(utils.msgwd(1, "ok"));
      }
      else res.send(utils.msgwd(1, "Out of time"));
    }
    else res.send(utils.msgwd(1, "invalid otp"));
  }
  else res.send(utils.msgwd(0, "invalid user"));
})

// nodemcu
router.get('/mcu', (req, res) => {
  let pin = req.query.pin;
  pins.set(pin, parseInt(Date.now()/1000));
  res.send("mcu:ok");
})

module.exports = router;
