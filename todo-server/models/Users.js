/**
 * Created by Yoav Rosenbaum Nogah Goldberg 
 */ 
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var UsersSchema = new Schema({
    id: String,
    username: String,
    password: String
});
//export our module to use in server.js
module.exports = mongoose.model('User', UsersSchema);

