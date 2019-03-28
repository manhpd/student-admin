

// Load the MySQL pool connection
const connection = require('../database');
const { check } = require('express-validator/check')

module.exports = (express) => {
    var router      = express.Router();
	// Simple MySQL Test
	router.get('/test', (req, res) => {
	    var test;
	    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
	        if (err) throw err;
	        test = rows[0].solution;
	        res.jsonp({
	            'test': test
	        });
	    }); 
	});

	// POST - Create
	// GET - Read
	// PUT - Update/Replace - AKA you pass all the data to the update
	// PATCH - Update/Modify - AKA you just pass the changes to the update
	// DELETE - Delete

    router.route('/commonstudents')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	        var data = req.body; // maybe more carefully assemble this data
            console.log(data);
	            if (data.students && data.teacher) {
	            data.students.forEach(function(student, index, array) {
	                var query = connection.query('INSERT INTO teacherStudent SET ?', {"teacher": data.teacher, "student":student}, (err, result) => {
	                    if(err){
	                        console.error(err);
	                        res.sendStatus(404).jsonp({"message":"Database Error"});
	                    }
	                });
	                console.log(query.sql);
	            });
	            res.status(204);
	            res.end();
            } else {
            	res.status(400).jsonp({"message": "Wrong body format should have a teacher and an array of students" });
            }
	    })

	    .get((req, res) => {
            console.log(req.query);
            var teachers = req.query.teacher;
            var queryString = '';
            var length = 0;
            if(Array.isArray(teachers) ) {
            	length = teachers.length;
            } else {
            	length = 1;
            }
            queryString = 'SELECT student, count(*) total FROM teacherStudent WHERE teacher IN (?) GROUP BY student HAVING total = ?  ';
	        var query = connection.query(queryString, [teachers,length], (err, rows, fields) => {
                if (err) console.error(err);
                var studentList= {
                    students:[]
                };
                if (rows) {
	                for (var i = 0; i < rows.length; i++) {
	                   studentList.students.push(rows[i].student);
	                    //Do something
	                }
                }
	            res.jsonp(studentList);
	        });
	        console.log(query.sql);
	    })

	    //We do NOT do these to the collection
	    .put((req, res) => {
	        //res.status(404).send("Not Found").end();
	        res.sendStatus(404);
	    })
	    .patch((req, res) => {
	        res.sendStatus(404);
	    })
	    .delete((req, res) => {
	        // LET's TRUNCATE TABLE..... NOT!!!!!
	        res.sendStatus(404);
        });
        

        router.route('/suspend')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	        var data = req.body; // maybe more carefully assemble this data
            console.log(data);
            if(data.student) {
	            var query = connection.query('UPDATE teacherStudent SET isSuspend = true WHERE student = ?', [data.student], (err, result) => {
	                if(err){
	                    console.error(err);
	                    res.sendStatus(404);
	                } else {
	                    res.status(204);
	                    res.end();
	                 }   
	
	            });
	            console.log(query.sql);
            } else {
            	 res.status(400).jsonp({"message":"Wrong body format: should have a student"});
	             res.end();
            }
	    })
        //We do NOT do these to the collection
	    .get((req, res) => {
            res.sendStatus(404);
	    })

	    
	    .put((req, res) => {
	        //res.status(404).send("Not Found").end();
	        res.sendStatus(404);
	    })
	    .patch((req, res) => {
	        res.sendStatus(404);
	    })
	    .delete((req, res) => {
	        // LET's TRUNCATE TABLE..... NOT!!!!!
	        res.sendStatus(404);
	    });

        router.route('/retrievefornotifications')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	        var data = req.body; // maybe more carefully assemble this data
            if (data.notification && data.teacher) {
	            var mentionStudents = [];
	            for (var i = 0; i < data.notification.length; i++) {
	                let countAddressChar = 0;
	                if(data.notification[i] == '@') {
	                    let start = i+1;
	                    while((data.notification[i] != ' ') && (i< data.notification.length)){
	                        if (data.notification[i] == '@') {
	                            countAddressChar = countAddressChar + 1;
	                        }
	                        if (countAddressChar == 3) break;
	                        i++;
	                    }
	                    let length = i - start ;
	                    mentionStudents.push(data.notification.substr(start,length));
	                    i--;
	                }
	              }
	              console.log(mentionStudents);
	              if (mentionStudents.length > 0) {
		            var query = connection.query('SELECT distinct student FROM teacherStudent WHERE (teacher = ? or student IN (?)) and isSuspend = false', [data.teacher,mentionStudents], (err, rows, fields) => {
		                if (err) console.error(err);
		                var studentList= {
		                    recipients:[]
		                }; 
		                if (rows) {
			                for (var i = 0; i < rows.length; i++) {
			                   studentList.recipients.push(rows[i].student);
			                    //Do something
			                }
		                }
		        
			            res.status(200).jsonp(studentList);
		            });
		            console.log(query.sql);
	              } else {
	              	console.log(data.teacher);
	              	var query = connection.query('SELECT distinct student FROM teacherStudent WHERE teacher = ? and isSuspend = false', [data.teacher], (err, rows, fields) => {
		                if (err) console.error(err);
		                var studentList= {
		                    recipients:[]
		                };
		                if (rows) {
			                for (var i = 0; i < rows.length; i++) {
			                   studentList.recipients.push(rows[i].student);
			                    //Do something
			                }
		                }
			            res.status(200).jsonp(studentList);
		            });
		            console.log(query.sql);
	              }
            }else {
            	res.status(400).jsonp({"message": "Wrong body format should have a teacher and a notification message" });
            }
          
	    })
        //We do NOT do these to the collection
	    .get((req, res) => {
            res.sendStatus(404);
	    })

	    
	    .put((req, res) => {
	        //res.status(404).send("Not Found").end();
	        res.sendStatus(404);
	    })
	    .patch((req, res) => {
	        res.sendStatus(404);
	    })
	    .delete((req, res) => {
	        // LET's TRUNCATE TABLE..... NOT!!!!!
	        res.sendStatus(404);
	    });
	    
	    
	     router.route('/deleteall')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	         res.sendStatus(404);
	    })
        //We do NOT do these to the collection
	    .get((req, res) => {
	        var query = connection.query('DELETE FROM teacherStudent', (err, result) => {
                if (err) {
                	console.error(err)
        		}else {
                	res.status(204);
                	res.end();
                }
	        });
	        console.log(query.sql);
	    })

	    .put((req, res) => {
	        //res.status(404).send("Not Found").end();
	        res.sendStatus(404);
	    })
	    .patch((req, res) => {
	        res.sendStatus(404);
	    })
	    .delete((req, res) => {
	        // LET's TRUNCATE TABLE..... NOT!!!!!
	        res.sendStatus(404);
	    });
	return router;

}
