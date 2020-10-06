const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require('uuid/v1')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        maxlength: 10,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userInfo: {
        type: String,
        trim: true
    },

    // TODO: COME BACK HERE
    encry_password: {
        type: String,
        required: true
    },

    // a random large data passed to one way hash for password security
    salt: String,

    // defining role for users like, user, admin etc
    // Higher number will mean higher privilage
    role: {
        type: Number,
        default: 0
    },

    //Array to store user purchases
    purchase: {
        type: Array,
        default: []
    }
  },
  // Each time a user joins this site, the timestamp for the same will be recorded
  {timestamps: true});

  userSchema.virtual("password")
    .set( function(password){
        this._password = password;

        // uuid is a very long random unique uuids to be used as salt value
        this.salt = uuidv1();
        console.log("salt value is: ${this.salt} and the uuid is ${uuidv1}");
        this.encry_password = securePassword(password);
    })

    .get(function(){
        return this._password;
    })

  // defining functions for userSchema
  userSchema.method  = {

      // this method will check if the encrypted password matched with the plaintext ecnryption
      // will be used for user authentication
      authenticate: function(plaintext){
          return this.securePassword(plaintext) === this.encry_password;
      },

      // This method will encrypt and return the plain password, if plaintext exists
      // else, it will return an empty string
      securePassword : function(plaintext){
          if(!password) return "";
          else{
              try{
                return crypto.createHmac('sha256', this.salt)
                .update(plaintext).digest('hex');
              }
              catch(err) {
                  return "";
              }
          }
      } 
  }

  module.exports = mongoose.model('user', userSchema);