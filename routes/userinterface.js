var express = require('express');
var router = express.Router()
var pool = require('./pool')

router.get('/display_all_category',function(req,res){
    try
    {
      pool.query("select * from category",function(error,result){
        if(error)
        {
          console.log(error)       
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator.....'})
        }
        else
          {
            res.status(200).json({status:true,message:'Success',data:result}) 
            
          }
  
      })
    }
    catch(e)
    {
      res.status(200).json({status:false,message:'Server Error:Pls Contact Database.....'})
    }
  });

  router.get('/display_all_subcategory',function(req,res,next){
    try
    {
        pool.query("select S.*,(select C.categoryname from category C where C.categoryid=S.categoryid) as categoryname  from subcategory S ",function(error,result){
            if(error)
            {
                res.status(200).json({status:false,message:'Server Error : Pls Contact Database Administrator..... '})
            }
            else
            {
                res.status(200).json({status:true,message:'Success',data:result})
            }

        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
    }
 });

 
 router.post('/fetch_all_subcategory_by_categoryid',function(req,res,next){
    try
    {
        pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
            if(error)
            {
                res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator......'}) 
            }
            else
            {
                res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator......'}) 
    }
 });

  
  module.exports=router; 