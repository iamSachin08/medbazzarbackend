var express =require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/submit_brand',upload.single('picture'),function(req,res,next){

    try
    {
  
      pool.query("insert into brand (brandname,picture) values(?,?)",[req.body.brandname,req.file.filename],function(error,result){
    
        if(error)
        {    console.log(error)
          res.status(200).json({status:false,message:'Server Error: Pls Contact Database Administrator.....'})
        }
        else
        {
            console.log(result)
          res.status(200).json({status:true,message:'Category Submitted Successfully...'})
        }
      })
      
    } 
    catch(e)
    {
      res.status(200).json({status:false,message:'Server Error: Pls Contact Server Administrator.....'})
    } 
  
  });
  
router.get('/display_all_brand',function(req,res){
    try
    {
      pool.query("select * from brand where brandid!=0",function(error,result){
        if(error)
        {
          console.log(error)       
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database.....'})
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
  
  
  
   router.post('/edit_brand_data',function(req,res,next){
    try
    {
      pool.query("update brand set brandname=? where brandid=?" ,[req.body.brandname,req.body.brandid],function(error,result){
        if(error)
        {
          res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
        }
        else
        {
          res.status(200).json({status:true,message:'Brand Updated Successfully.....'})
        }
      } )
    }
    catch(e)
    {
      res.status(200).json({status:false,message:'Server Error: Pls Contact Server Administrator.....'})
    }
   });
  
  
  
   router.post('/edit_brand_picture',upload.single('picture'),function(req,res,next){
    try
    {
      pool.query("update brand set picture=? where brandid=?" ,[req.file.filename,req.body.brandid],function(error,result){
        if(error)
        {
          res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
        }
        else
        {
          res.status(200).json({status:true,message:'Picture Updated Successfully.....'})
        }
      } )
    }
    catch(e)
    {
      res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
    }
   });
  
  
  
   router.post('/delete_brand_data',function(req,res,next){
    try
    {
      pool.query("delete from brand where brandid=?" ,[req.body.brandid],function(error,result){
        if(error)
        {
          res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
        }
        else
        {
          res.status(200).json({status:true,message:'Category Deleted Successfully.....'})
        }
      } )
    }
    catch(e)
    {
      res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
    }
   });

module.exports=router;