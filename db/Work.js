const mongoose = require("mongoose");
const Schema=mongoose.Schema;
// skills schema
const work_schema = mongoose.Schema(
    {  
         name: {
            type: String,
            minlength: 4,
            maxlength: 255,
             },
             image: {
              type: String,
              minlength: 4,
              maxlength: 255,
                },  
        url: {
            type: String,
            minlength: 4,
            maxlength: 255,
            },
            
            is_active:{
              type:Boolean,
              default:false,
            }
     }
);
const  work =mongoose.model("work",work_schema);
module.exports =work;