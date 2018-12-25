var express = require('express')
var router = express.Router()
var User = require('../model/userModel')
var multer = require('multer')
var fs = require('fs')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});


//var upload = multer({storage: storage}).array("imgUploader", 1);
//var upload = multer({storage: storage});
var upload = multer({ dest: 'temp/' })

router.get('/:id?',function(req,res,next){
 
	if(req.params.id){
   
    	User.getUserById(req.params.id,function(err,rows){
     
      		if(err){
			    res.json({
			    	statusCode: '101',
			    	message: 'Failed',
			    	error: err
			    });
      		}else{
        		if(rows.length<1){
				    res.json({
				    	statusCode: '104',
				    	message: 'Data not Available'
				    });
        		}else{
				    res.json({
				    	statusCode: '200',
				    	message: 'Data Get Successfully',
				    	data: rows[0]
				    });
        		}
      		}

    	});

  	}else{
   
    	User.getAllUsers(function(err,rows){
   
    		if(err){
			    res.json({
			    	statusCode: '101',
			    	message: 'Failed',
			    	error: err
			    });
    		}else{
			    res.json({
			    	statusCode: '200',
			    	message: 'Data Get Successfully',
			    	data: rows
			    });
    		}
   
   		});

  	}

});



router.post('/add',function(req,res,next){
 
  	User.addUser(req.body,function(err,count){
    	if(err){
		    res.json({
		    	statusCode: '101',
		    	message: 'Add Data Failed',
		    	error: err
		    });
    	}else{
		    res.json({
		    	statusCode: '200',
		    	message: 'Success',
		    	data: req.body
		    });
    	}

  	});

});



router.delete('/delete/:id',function(req,res,next){
 
  	User.deleteUser(req.params.id,function(err,count){
 
    	if(err){
		    res.json({
		    	statusCode: '101',
		    	message: 'Failed',
		    	error: err
		    });
    	}else{
		    res.json({
		    	statusCode: '200',
		    	message: 'Success',
		    	data: count
		    });
    	}
 
  	});

});


router.put('/edit/:id',function(req,res,next){
 
  	User.updateUser(req.params.id,req.body,function(err,rows){
 
    	if(err){
		    res.json({
		    	statusCode: '101',
		    	message: 'Failed',
		    	error: err
		    });
    	}else{
		    res.json({
		    	statusCode: '200',
		    	message: 'Success',
		    	data: rows
		    });
    	}

  	});

});


router.post('/fileupload', upload.single('image'), function(req,res,next){
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
	/*
	    upload(req, res, function (err) {
        if (err) {
            res.json({
            	statusCode: '101',
            	message: 'Failed',
            	error: err
            });
        }else{
        	res.json({
        		statusCode: '200',
        		message: 'Success'
        	});
        }
    });*/
});

router.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  console.log(req.file);
  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  var tmp_path = req.file.path;

  /** The original name of the uploaded file
      stored in the variable "originalname". **/
  var target_path = 'uploads/' + req.file.originalname;

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(tmp_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { 
    //res.render('complete'); 
   res.json({
          statusCode: '200',
          message: 'Successfully uploaded'
        });
  });
  src.on('error', function(err) {
   //res.render('error');
   res.json({
          statusCode: '101',
          message: 'Failed',
          error: err
        }); 
 });

})





module.exports=router;