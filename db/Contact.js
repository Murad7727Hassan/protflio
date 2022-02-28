const mongoose = require("mongoose");
const Schema=mongoose.Schema;
// skills schema
const contact_schema = mongoose.Schema(
    {       
          name: {
            type: String,
            minlength: 4,
            maxlength: 255,
              },
              url_social: {
                type: String,
                minlength: 1,
                maxlength: 255,
                  },
          image: {
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
const  contact =mongoose.model("contact",contact_schema);
module.exports =contact;