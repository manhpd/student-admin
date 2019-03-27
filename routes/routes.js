

// Load the MySQL pool connection
const connection = require('../database');
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

	// http://www.restapitutorial.com/lessons/httpmethods.html
	// POST - Create
	// GET - Read
	// PUT - Update/Replace - AKA you pass all the data to the update
	// PATCH - Update/Modify - AKA you just pass the changes to the update
	// DELETE - Delete

	// COLLECTION ROUTES
	router.route('/teachers')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	        var data = req.body; // maybe more carefully assemble this data
	        console.log(req.body)
	        var query = connection.query('INSERT INTO teacher SET ?', [data], (err, result) => {
	            if(err){
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                res.status(201);
	                res.location('/api/teachers/' + result.insertId);
	                res.end();
	            }
	        });
	        console.log(query.sql);
	    })

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM teachers', (err, rows, fields) => {
	            if (err) console.error(err);

	            res.jsonp(rows);
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
	//end route

	// SPECIFIC ITEM ROUTES
	router.route('/teachers/:id')
	    .post((req, res) => {
	        //specific item should not be posted to (either 404 not found or 409 conflict?)
	        res.sendStatus(404);
	    })

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM teachers WHERE id=?', [req.params.id], (err, rows, fields) => {
	            if (err) {
	                //INVALID
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                if(rows.length){
	                    res.jsonp(rows);
	                }else{
	                    //ID NOT FOUND
	                    res.sendStatus(404);
	                }
	            }
	        });
	        console.log(query.sql);
	    })

	    .put((req, res) => {
	        var data = req.body;
	        var query = connection.query('UPDATE teachers SET ? WHERE id=?', [data, req.params.id], (err, result) => {
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({changedRows:result.changedRows, affectedRows:result.affectedRows}).end();
	            }
	        })
	        console.log(query.sql)
	    })

	    .patch((req, res) => {
	        // Need to decide how much this should differ from .put
	        //in theory (hmm) this should require all the fields to be present to do the update?
	    })

	    .delete((req, res) => {
	        //LIMIT is somewhat redundant, but I use it for extra sanity, and so if I bungle something I only can break one row.
	        var query = connection.query('DELETE FROM teachers WHERE id=? LIMIT 1', [req.params.id], (err, result) => {
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({affectedRows:result.affectedRows}).end();
	            }
	        });
	        console.log(query.sql)
		});
		

		router.route('/students')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	        var data = req.body; // maybe more carefully assemble this data
	        console.log(req.body)
	        var query = connection.query('INSERT INTO students SET ?', [data], (err, result) => {
	            if(err){
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                res.status(201);
	                res.location('/api/students/' + result.insertId);
	                res.end();
	            }
	        });
	        console.log(query.sql);
	    })

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM students', (err, rows, fields) => {
	            if (err) console.error(err);

	            res.jsonp(rows);
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
	//end route

	// SPECIFIC ITEM ROUTES
	router.route('/students/:id')
	    .post((req, res) => {
	        //specific item should not be posted to (either 404 not found or 409 conflict?)
	        res.sendStatus(404);
	    })

	    .get((req, res) => {
	        var query = connection.query('SELECT * FROM students WHERE id=?', [req.params.id], (err, rows, fields) => {
	            if (err) {
	                //INVALID
	                console.error(err);
	                res.sendStatus(404);
	            }else{
	                if(rows.length){
	                    res.jsonp(rows);
	                }else{
	                    //ID NOT FOUND
	                    res.sendStatus(404);
	                }
	            }
	        });
	        console.log(query.sql);
	    })

	    .put((req, res) => {
	        var data = req.body;
	        var query = connection.query('UPDATE students SET ? WHERE id=?', [data, req.params.id], (err, result) => {
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({changedRows:result.changedRows, affectedRows:result.affectedRows}).end();
	            }
	        })
	        console.log(query.sql)
	    })

	    .patch((req, res) => {
	        // Need to decide how much this should differ from .put
	        //in theory (hmm) this should require all the fields to be present to do the update?
	    })

	    .delete((req, res) => {
	        //LIMIT is somewhat redundant, but I use it for extra sanity, and so if I bungle something I only can break one row.
	        var query = connection.query('DELETE FROM students WHERE id=? LIMIT 1', [req.params.id], (err, result) => {
	            if(err){
	                console.log(err);
	                res.sendStatus(404);
	            }else{
	                res.status(200).jsonp({affectedRows:result.affectedRows}).end();
	            }
	        });
	        console.log(query.sql)
	    });
    //end route
    

    router.route('/commonstudents')
	    //we can use .route to then hook on multiple verbs
	    .post((req, res) => {
	        var data = req.body; // maybe more carefully assemble this data
            console.log(data);
            data.students.forEach(function(student, index, array) {
                var query = connection.query('INSERT INTO teacherStudent SET ?', {"teacher": data.teacher, "student":student}, (err, result) => {
                    if(err){
                        console.error(err);
                        res.sendStatus(404);
                    }
                });
                console.log(query.sql);
            });
            res.status(204);
            res.end();
	    })

	    .get((req, res) => {
            console.log(req.query);
            var teachers = req.query.teacher;
	        var query = connection.query('SELECT * FROM teacherStudent WHERE teacher IN (?) ', [teachers], (err, rows, fields) => {
                if (err) console.error(err);
                var studentList= {
                    students:[]
                };
                for (var i = 0; i < rows.length; i++) {
                   studentList.students.push(rows[i].student);
                    //Do something
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
            var query = connection.query('UPDATE teacherStudent SET isSuspend = true WHERE student = ?', [data.students], (err, result) => {
                if(err){
                    console.error(err);
                    res.sendStatus(404);
                } else {
                    res.status(204);
                    res.end();
                 }   

            });
            console.log(query.sql);
          
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
            var query = connection.query('SELECT distinct student FROM teacherStudent WHERE (teacher = ? or student IN (?)) and isSuspend = false', [data.teacher,mentionStudents], (err, rows, fields) => {
                if (err) console.error(err);
                var studentList= {
                    recipients:[]
                };
                for (var i = 0; i < rows.length; i++) {
                   studentList.recipients.push(rows[i].student);
                    //Do something
                }
	            res.status(200).jsonp(studentList);
            });
            console.log(query.sql);
          
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
	return router;

}
