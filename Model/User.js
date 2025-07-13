const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String,require:true},
    email:{type: String,require:true,unique:true},
    password: {type: String},
    googleId: {type: String},
    role: {type: String,default:"costumer",enum:["costumer","admin"]}

},{
    timestamps: true
});

const UserModel = mongoose.model('user', userSchema);

module.exports=UserModel;