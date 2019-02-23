const loginInfo=require("../models/login_info");
const crypto = require("crypto");
const path = require("path");
const async = require("async");
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


exports.render_forgot_password_template = function(req, res) {
    return res.sendFile(path.resolve("./email_templates/forgot_password.html"));
  };

  exports.render_reset_password_template = function(req, res) {
    return res.sendFile(path.resolve("./email_templates/reset_password.html"));
  };

  
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
            url: 'http://localhost:3301/auth/reset_password?token=' + token
          }
        };
        console.log(" came upto the mail point");
        smtpTransport.sendMail(data, function(err) {
          if (!err) {
            console.log("mail sent");
            return res.json({ message: 'Kindly check your email for further instructions' });
          } else {
            console.log( err);
            return done(err);
          }
        });
      }
    ], function(err) {
      return res.status(422).json({ message: err });
    });
  };


  exports.reset_password = function(req, res, next) {
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
              return res.status(422).send({
                message: err
              });
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
                  return res.json({ message: 'Password reset' });
                } else {
                  return done(err);
                }
              });
            }
          });
        } else {
          return res.status(422).send({
            message: 'Passwords do not match'
          });
        }
      } else {
        return res.status(400).send({
          message: 'Password reset token is invalid or has expired.'
        });
      }
    });
  };