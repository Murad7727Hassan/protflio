 const mongoose = require("mongoose");
 const Schema=mongoose.Schema;

const Profolio_schema = new Schema({
  name: {
     type: String,
    minlength: 4,
    maxlength: 100,
  },
  job: {
    type: String,
    minlength: 4,
    maxlength: 100,
  },

  logo: {
    type: Object,
    minlength: 2,
    maxlength: 255,
    },
  url_order: {
    type: String,
    minlength: 4,
    maxlength: 255,
   },
  about_person: {
    type: String,
    minlength: 4,
    maxlength: 255,
   },
  spcial_sentence: {
    type: String,
    minlength: 4,
    maxlength: 255,
   },
  images_person: {
      type:Object
  }
 ,
 about_work: {
    type: String,
    minlength: 4,
    maxlength: 255,
   },
about_skill: {
    type: String,
    minlength: 4,
    maxlength: 255,
  }});
 
const protflio =mongoose.model("protflio",Profolio_schema);
module.exports=protflio; 