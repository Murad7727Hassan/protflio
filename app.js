const express = require('express');
const mogoose = require("mongoose");
const multer  = require('multer');
const User = require("./db/protflio");
const Skill = require("./db/skill");
const Work = require("./db/work");
const Contact = require("./db/contact");
const Servece = require("./db/servece");
const { redirect } = require("express/lib/response");
const {default:mongoose} = require("mongoose");
const req = require('express/lib/request');
  const app = express();
 app.use(express.static("public"));
app.use(express.static('views/css'));

const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
      if(file.mimetype =="image/png" || file.mimetype =="image/jpg")
      callback(null,"public/images/");
      else if(file.mimetype =="application/pdf")
      callback(null,"public/pdf/");
      else
      callback(null,false)
    },
  
    filename:(req,file,callback)=> {
      var extension = file.originalname.split(".");
      var ext = extension[extension.length - 1];
      var uploaded_file_name =
        file.fieldname +
        "-" +
        Date.now() +
        "-" +
        Math.round(Math.random() * 1E9) +
        "." +
        ext;
        callback(null, uploaded_file_name);
    }
  })
  
  const upload = multer({
    storage:storage,
    fileFilter:(req,file,callback)=>{
  
      if(file.mimetype =="image/png" || file.mimetype =="image/jpg" || file.mimetype =="application/pdf")
      {
        callback(null,true)
      }
      else
      callback(null,false)
    },
    limits:1024 *1024 *5,
  });
  app.set("view engine", "ejs");
   app.use(
      express.urlencoded({
        extended: true
      })
    );
  
  app.use(express.json());
  mogoose.connect("mongodb://localhost:27017/protflio");

  app.get("/userinfo",auth,(req, res)=> {
       User.find().then((reslut)=>{
        res.render("userinfo",{user:reslut});
    })
  })
     app.get('/skills',(req,res)=>{
      Skill.find({}).then((reslut)=>{
        console.log(reslut);
        res.render("skills",{u_skill:reslut});
    })
  })
  app.get('/works',(req,res)=>{
    Work.find().then((reslut)=>{
      res.render("works",{work:reslut});
  })
})
app.get('/contacts',(req,res)=>{
  Contact.find().then((reslut)=>{
    res.render("contacts",{contact:reslut});
})
})
app.get('/serveces',(req,res)=>{
  Servece.find().then((reslut)=>{
    res.render("serveces",{servece:reslut});
})
})

  // app.post('/user/show',upload.array('user_image'), (req, res)=> {
   // app.post('/user/show',upload.fields([{name:'user_image'},{name:'user_image_2'}]) , (req, res)=> {
  app.post('/userinfo',upload.fields([{name:'logo'},{name:'images_person'}]), (req, res)=> {
      const user =new User({
        name:req.body.name,
        job:req.body.job,
        logo:(req.files["logo"][0]).filename,
        url_order:req.body.url_order,
        about_person:req.body.about_person,
        spcial_sentence:req.body.spcial_sentence,
        images_person:(req.files["images_person"][0]).filename,
        about_work:req.body.about_work,
        about_skill:req.body.about_skill,
       })
 
      user.save((error,result)=>{
        if(error)
        console.log(error.message);
        else
        console.log(result)
      });
       res.end();
       res.redirect("/userinfo")
    })

  app.get('/index',async(req,res)=>{
    let users = await User.find();
    let skills = await Skill.find();
    let works = await Work.find();
    let services = await Servece.find();
    let connect = await Contact.find();
    res.render("index", { title: "Murad Hassan", user:users, skill: skills,work:works,service:services,connects:connect });
  })
  app.get('/test',(req,res)=>{
    Skill.find().then((reslut)=>{
      res.render("test",{skill:reslut});})
  })

    app.post('/skills',async (req, res)=> {
      const skill= new Skill({
        skill:req.body.skill,
        number:req.body.number,
      })
      await skill.save((error,result)=>{
        if(error)
        console.log(error.message);
        else
        console.log(result)
      });
      console.log(skill);
       res.redirect("/skills")
    })
    app.post('/contacts',upload.fields([{name:'image'}]), (req, res)=> {
      const con= new Contact({
        name:req.body.name,
        image:(req.files["image"][0]).filename,
        url:req.body.url,
      })
       console.log( "---------------------");
      console.log(con);

      con.save((error,result)=>{
        if(error)
        
        console.log(error.message);
        else
        console.log(result)
      });
      res.redirect("/contacts")
    })

    app.post('/serveces',upload.fields([{name:'image'}]), (req, res)=> {
      const ser= new Servece({
        name:req.body.name,
        image:(req.files["image"][0]).filename,
        list_tasks:req.body.tasks,
      })
       console.log( "---------------------");
      console.log(ser);

      ser.save((error,result)=>{
        if(error)
        console.log(error.message);
        else
        console.log(result)
      });
       res.end();
       res.redirect("/serveces")
    })

    app.post('/works',upload.fields([{name:'image'}]), (req, res)=> {
      const work= new Work({
        name:req.body.name,
        image:(req.files["image"][0]).filename,
        url:req.body.url,
      })
       console.log( "---------------------");
      console.log(work);

      work.save((error,result)=>{
        if(error)
        console.log(error.message);
        else
        console.log(result)
      });
        res.redirect("/works")
    })

     function auth(req, res, next) {
      next();
    }  
    app.listen("3900");
  