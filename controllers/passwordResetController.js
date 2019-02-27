const loginInfo=require("../models/login_info");
const crypto = require("crypto");
const path = require("path");
const async = require("async");
const bcrypt = require('bcrypt');
var  hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com',
  pass = process.env.MAILER_PASSWORD || 'auth_email_pass'
  nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass
  },
  tls: {
    rejectUnauthorized: false
  }
});

var handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve("./email_templates/"),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));
  
exports.forgot_password = function(req, res) {
    
    async.waterfall([
      function(done) {
        loginInfo.findOne({
          email: req.body.email
        }).exec(function(err, user) {
          if (user) {
            done(err, user);
          } else {
            done('User not found.');
          }
        });
      },
      function(user, done) {
        // create the random token
        crypto.randomBytes(20, function(err, buffer) {
          var token = buffer.toString('hex');
          done(err, user, token);
        });
      },
      function(user, token, done) {
        loginInfo.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function(err, new_user) {
          done(err, token, new_user);
        });
      },
      function(token, user, done) {
        var data = {
          to: user.email,
          from: email,
          template: 'forgot_password',
          subject: 'Password help has arrived!',
          context: {
            /* Need to send the token to frontend */
            url: 'http://localhost:4200/resetpassword?token=' + token
          }
        };
        smtpTransport.sendMail(data, function(err) {
          if (!err) {
            let msg = {
              success : true,
              msg : "Kindly check your email for further instructions"
            }
          return res.status(200).json(msg);
          } else {
            return done(err);
          }
        });
      }
    ], function(err) {
      let msg = {
        success : false,
        msg : err
      }
      return res.status(422).json(msg);
    });
  };

  exports.validateRstPwToken = (req,res) =>{
    loginInfo.findOne({reset_password_token: req.body.token,reset_password_expires: {$gt: Date.now()}},(err,token)=>{
      if(err){
        let msg = {
          success : false,
          msg : err
        }
        res.status(500).json(msg);
      }
      else{
        let msg = {
          success : true,
          msg : req.body.token
      }
          res.status(200).json(msg);
      }
    });
  }
    exports.reset_password = function(req, res) {
      loginInfo.findOne({
        reset_password_token: req.body.token,
        reset_password_expires: {
          $gt: Date.now()
        }
      }).exec(function(err, user) {
        if (!err && user) {
          if (req.body.newPassword === req.body.verifyPassword) {
            user.hash_password = bcrypt.hashSync(req.body.newPassword, 10);
            user.reset_password_token = undefined;
            user.reset_password_expires = undefined;
            user.save(function(err) {
              if (err) {
                let msg = {
                  success : false,
                  msg : err
                }
                return res.status(422).json(msg);
              } else {
                var data = {
                  to: user.email,
                  from: email,
                  template: 'reset_password',
                  subject: 'Password Reset Confirmation',
                  context: {
                    
                  }
                };
    
                smtpTransport.sendMail(data, function(err) {
                  if (!err) {
                    let msg = {
                      success : true,
                      msg : "password reset"
                    }
                    return res.status(200).json(msg);
                  } else {
                    return done(err);
                  }
                });
              }
            });
          } else {
            let msg = {
              success : false,
              msg : "Passwords do not match"
            }
            return res.status(422).send(msg);
          }
        } else {
          let msg = {
            success : false,
            msg : "Password reset token is invalid or has expired."
          }
          return res.status(400).send(msg);
        }
      });
    };