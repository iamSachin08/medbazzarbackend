var mysql=require('mysql');
var pool=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Sachin@189253',
    database:'medbazzar',
    multipleStatements:true,
})
module.exports=pool;