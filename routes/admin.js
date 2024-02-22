var express =require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')


router.post('/check_admin_login',function(req,res,next){
    pool.query("select * from admins where emailid=? and password=?",[req.body.emailid,req.body.password],function(error,result){
        if (error)
        {
            res.status(200).json({status:false,message:'Pls Contact Database Administrator...'})
        }
        else
        {

           if(result.length==1)
          {
            res.status(200).json({status:true,data:result[0],message:'Success'})
          }
          else
          {
            res.status(200).json({status:false,message:'Invalid Email/Id/Password...'})
          }
        }  


    })
})

module.exports=router;