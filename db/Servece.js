const mongoose = require("mongoose");
const Schema= mongoose.Schema;
// skills schema
const servece_schema = new Schema(
    {
          image: {
            type: String,
            minlength: 4,
            maxlength: 255,
              },
         name: {
            type: String,
            minlength: 4,
            maxlength: 255,
             },
        list_tasks:  [{
            type:String
        }],
        is_active:{
          type:Boolean,
          default:false,
        }
     }
);
const  servece =mongoose.model("servece",servece_schema);
module.exports =servece;