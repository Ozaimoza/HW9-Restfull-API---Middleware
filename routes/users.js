const express = require('express');
const router = express.Router();
const { signToken } = require('../auth');
const auth = require('../middleware/middlewareAuth.js');

const pool = require('../pool.js');

// Register Users
router.post('/register', (req, res) => {
    const query =   `INSERT INTO users (id, email, password, gender, role)
                    VALUES ('${req.body.id}', '${req.body.email}', '${req.body.password}', '${req.body.gender}', '${req.body.role}');`
    pool.query(
        query, (err, result) => {
            if (err) {
                throw err,
                res.status(400).json({ message: 'Bad Request' });
            } else {
                res.status(200).json({   
                    command : result.command,
                    rowCount : result.rowCount,
                    data : {
                        id : req.body.id ,
                        email : req.body.email ,
                        password : req.body.password ,
                        role : req.body.role ,
                    },
                    massage : 'Data Berhasil Ditambah',
                })
            }
        }
    )
})

// Login User
router.post('/login', (req, res) => {
    pool.query(
        `SELECT * FROM users WHERE email = $1 AND password = $2`,
        [req.body.email, req.body.password],
        (err, results) => {
            if (err) {
                res.status(400).json({ message: 'Bad Request' });
            } else {
                const token = signToken(results.rows[0]);
                res.status(200).json({
                token: token,
            });
        }
        }
    );
});

// Get Data Users Limit 10
router.get('' , auth, (req, res) => {
            const num = req.query.page - 1
            const limit = 10
            const offset = num * limit
            pool.query(
                `SELECT * FROM users ORDER BY id ASC OFFSET ${offset} LIMIT ${limit} `,
                (err, results) => {
                    if (err) {
                        throw err,
                        res.status(400).json({ message: 'Bad Request' });
                    }
                    res.status(200).json(results.rows)
                }
            );
        })


router.route('/:id')
    // Update Data Users By Id
    .put(auth, (req, res) => {  
        pool.query(`UPDATE users
                    SET email = '${req.body.email}', password = '${req.body.password}', 
                    gender = '${req.body.gender}', role ='${req.body.role}'
                    WHERE id = '${req.params.id}' ;`, (err,result) => {
            if (err) {
                throw err,
                res.status(400).json({ message: 'Bad Request' });
            } else {
                res.status(200).json({   
                    command : result.command,
                    rowCount : result.rowCount,
                    data : {
                        id : req.body.id ,
                        email : req.body.email ,
                        password : req.body.password ,
                        role : req.body.role ,
                    },
                    massage : 'Data Berhasil Diedit',
                })
            }
        })
    })

    // Delete Data Users By Id
    .delete(auth,(req,res) => {
        pool.query(`DELETE FROM users WHERE id = '${req.params.id}';`, (err,result) => {
            if (err){
                throw err,
                res.status(400).json({ message: 'Bad Request' });
            } else {
                res.status(200).json({   
                    command : result.command,
                    rowCount : result.rowCount,
                    massage : `Data Dengan ID = ${req.params.id} Berhasil Dihapus`,
                })
            }
        })
    })


module.exports = router;