var express =require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/submit_product_detail',upload.any(),function(req,res,next){
    try
    {
      console.log("FILES",req.files)
      var files=req.files.map((item)=>{
        return item.filename
      })

        pool.query("insert into productdetails (categoryid,subcategoryid,brandid,productid,productsubname,description,weight,weighttype,type,packaging,quantity,price,offerprice,offertype,picture,concernid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,req.body.productsubname,req.body.description,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.quantity,req.body.price,req.body.offerprice,req.body.offertype,files+"",req.body.concernid],function(error,result){
            if(error)
            {
                res.status(200).json({status:false,message:'Server Error : Pls Contact to Database Administrator......'})
            }
            else
            {
                res.status(200).json({status:true,message:'Productdetail Submitted Successfully...'})
            }
        })

    }
    catch(e)
    {
       res.status(200).json({status:false,message:'Pls Conatact To Server Administrator....'})
    }
});

router.get('/display_all_product_detail',function(req,res,next){
    try
    {
        pool.query("select PD.*,(select C. categoryname from category C where C.categoryid =PD.categoryid )as categoryname,(select S. subcategoryname from subcategory S where S.subcategoryid=PD.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=PD.brandid) as brandname,(select P.productname from products P where P.productid=PD.productid)as productname from productdetails PD",
        function(error,result)
        {
            if (error)
            {
                res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error Pls Contact Server Administrator....'})
    }
})

router.post('/edit_productdetail_data',function(req,res,next){
    try
    {
      pool.query("update productdetails set categoryid=? ,subcategoryid=?, brandid=?, productid=?, productsubname=?,description=?, weight=?, weighttype=?, type=?, packaging=?,quantity=?,price=?,offerprice=?,offertype=? where productdetailid=? ",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productid,req.body.productsubname,req.body.description,req.body.weight,req.body.weighttype,req.body.type,req.body.packaging,req.body.quantity,req.body.price,req.body.offerprice,req.body.offertype,req.body.productdetailid],function(error,result){

      if(error)
            {console.log(error)
                res.status(200).json({status:false,message:'Server Error: Pls Contact to Database Administrator'})
            }
            else
            {console.log('aaaaaa',result)
                res.status(200).json({status:true,message:'Product Details Updated Succesfully...'})
            }

      })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error: Pls Contact to Server Administrator'})
    }
});


router.post('/edit_productdetail_picture',upload.single('picture'),function(req,res,next){
    try
    {
      pool.query("update productdetails set picture=? where productdetailid=?" ,[req.file.filename,req.body.productdetailid],function(error,result){
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

   router.post('/delete_productdetail_data',function(req,res,next){
    try
    {
      pool.query("delete from productdetails where productdetailid=?" ,[req.body.productdetailid],function(error,result){
        if(error)
        {
          res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
        }
        else
        {
          res.status(200).json({status:true,message:'Subcategory Deleted Successfully.....'})
        }
      } )
    }
    catch(e)
    {
      res.status(200).json({status:false,message:'Server Error: pls contact Database Administrator.....'})
    }
   });


module.exports=router;