const mongoose = require("mongoose");
const Schema=mongoose.Schema;
// skills schema
const skills_schema = mongoose.Schema({
  skill: {
        type: String,
        minlength: 4,
        maxlength: 255,
          },
      number: {
        type: Number,
       }
       ,
       is_active:{
        type:Boolean,
        default:true,
      }
});
const  skill =mongoose.model("skill",skills_schema);
module.exports =skill;