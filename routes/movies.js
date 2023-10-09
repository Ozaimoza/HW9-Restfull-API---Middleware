const express = require('express');
const router = express.Router();
const pool = require('../pool.js');
const auth = require('../middleware/middlewareAuth.js');

router.route('')
    // Get All Data Movie Limit 10
    .get((req, res) => {
            const num = req.query.page - 1
            const limit = 10
            const offset = num * limit
            pool.query(
                `SELECT * FROM movies ORDER BY id ASC OFFSET ${offset} LIMIT ${limit} `,
                (err, results) => {
                    if (err) {
                        throw err,
                        res.status(400).json({ message: 'Bad Request' });
                    }
                    res.status(200).json(results.rows)
                }
            );
        })
    
    //Insert New Data Movies 
    .post(auth, (req, res) => {
        const query =   `INSERT INTO movies (id, title, genres, year)
                        VALUES ('${req.body.id}', '${req.body.title}', '${req.body.genres}', '${req.body.year}');`
        pool.query(
            query, (err, result) => {
                if (err) {
                    throw err,
                    res.status(400).json({ message: 'Bad Request' });
                } else {
                    res.status(200).json(
                        {   command : result.command,
                            rowCount : result.rowCount,
                            data : {
                                id : req.body.id ,
                                title : req.body.title ,
                                genres : req.body.genres ,
                                year : req.body.year ,
                            },
                            massage : 'Data Berhasil Ditambah',
                        }
                    )
                }
            }
        )
    })

router.route('/:id', auth)
    .put((req,res) => {
        pool.query(`UPDATE movies SET title = '${req.body.title}', genres = '${req.body.genres}', 
        year = '${req.body.year}' WHERE id = '${req.params.id}' ;`, 
        (err,result) => {
            if (err) {
                throw err,
                res.status(400).json({ message: 'Bad Request' });
            } else {
                res.status(200).json({   
                    command : result.command,
                    rowCount : result.rowCount,
                    data : {
                        id : req.body.id ,
                        title : req.body.title ,
                        genres : req.body.genres ,
                        year : req.body.year ,
                    },
                    massage : 'Data Berhasil Diedit',
                })
            }
        })
    })

    .delete((req,res) => {
        pool.query(`DELETE FROM movies WHERE id = '${req.params.id}'`, (err,result) => {
            if (err){
                throw err,
                res.status(400).json({ message: 'Bad Request' });
            } else {
                res.status(200).json({   
                    command : result.command,
                    rowCount : result.rowCount,
                    massage : `Data Movie Dengan ID = ${req.params.id} Berhasil Dihapus`,
                })
            }
        })
    })



module.exports = router;