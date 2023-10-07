/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *          - id
 *          - title
 *          - genres
 *          - year
 *       properties:
 *         id:
 *           type: integer
 *           description: The movie's Id.
 *         title:
 *           type: string  
 *           description: The movie's title.
 *         genres:
 *           type: string  
 *           description: The movie's genres.
 *         year:
 *           type: string  
 *           description: The movie's release year.
 *       example:
 *           id: 101
 *           title: avengers endgame
 *           genres: Action|Adventure|Comedy|Fantasy
 *           year: 2019
 * 
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: The Movies Managing API
 * 
 * /movies:
 *   get:
 *     summary: Get Data Movie
 *     tags : [Movies]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Number of pages to display data
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 * 
 *   post:
 *     summary: Input New Movies
 *     tags : [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 command:
 *                   type: string
 *                   description: The SQL command executed.
 *                 rowCount:
 *                   type: integer
 *                   description: The number of rows affected.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The movie's Id.
 *                     title:
 *                       type: string  
 *                       description: The movie's Title.
 *                     genres:
 *                       type: string  
 *                       description: The movie's genres.
 *                     year:
 *                       type: string  
 *                       description: The movie's release year.
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the request was malformed or invalid.
 *
 * /movies/{id}:
 *   put:
 *     summary: Update Movies By Id
 *     tags : [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Movie's Id.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 command:
 *                   type: string
 *                   description: The SQL command executed.
 *                 rowCount:
 *                   type: integer
 *                   description: The number of rows affected.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The Movie's Id.
 *                     title:
 *                       type: string  
 *                       description: The Movie's title.
 *                     genres:
 *                       type: string  
 *                       description: The Movie's genres.
 *                     year:
 *                       type: string  
 *                       description: The Movie's release year.
 *                 massage:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 * 
 *   delete:
 *     summary: Delete Movies By Id
 *     tags : [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The Movie's Id.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 command:
 *                   type: string
 *                   description: The SQL command executed.
 *                 rowCount:
 *                   type: integer
 *                   description: The number of rows affected.
 *                 massage:
 *                   type: string
 *                   description: A message indicating the result of the operation
 * 
 * 
 * 
 */


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