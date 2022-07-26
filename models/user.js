const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const uuidv1 = require('uuid/v1')

const userSchema = new Schema({
    name: {
        type: String, 
        required: true, 
        maxlength: 32, 
        trim: true
    },
    lastname: {
        type: String, 
        maxlength: 32,
        trim: true
    },
    email: {
        type: String, 
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String, 
        trim: true
    },
    
    encry_password: {
        type: String, 
        required: true
        
    }, 
    salt: String, 
    role: {
        type: Number, 
        default: 0
    }, 
    purchases: {
        type: Array, 
        default: []
    }, 
    

},
{timestamps: true})

userSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securePassword(password)
})
.get(function(){
    return this._password
})

//it is  a methid in a class that is available to all other variables in this document
userSchema.methods = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return ""
        try{
            const hash = crypto.createHmac('sha256', this.salt)
               .update(plainpassword)
               .digest('hex');
                console.log(hash);
            return hash
        }catch (err){
            return err.message
        }
    }
}
module.exports = mongoose.model("User",userSchema)