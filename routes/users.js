// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     User:
//  *       type: object
//  *       required:
//  *          - id
//  *          - email
//  *          - gender
//  *          - password
//  *          - role
//  *       properties:
//  *         id:
//  *           type: integer
//  *           description: The User's Id.
//  *         email:
//  *           type: string  
//  *           description: The User's Email.
//  *         gender:
//  *           type: string  
//  *           description: The User's gender.
//  *         password:
//  *           type: string  
//  *           description: The User's password.
//  *         role:
//  *           type: string  
//  *           description: The User's role.
//  *       example:
//  *           id: 2
//  *           email: Uvuvwewe@gmail.com
//  *           gender: Male
//  *           password: Ugwemubim
//  *           role: Construction Worker
//  * 
//  *    
//  *     UserLogin:
//  *       type: object
//  *       required:
//  *         - email
//  *         - password
//  *       properties:
//  *         email:
//  *           type: string
//  *           description: User's email
//  *         password:
//  *           type: string
//  *           description: User's password
//  */


// /**
//  * @swagger
//  * tags:
//  *  name: Users
//  *  description: The users Managing API
//  * 
//  * /users/login:
//  *   post:
//  *     summary: User Login
//  *     tags: [Users]
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - email
//  *               - password
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 description: User's email
//  *               password:
//  *                 type: string
//  *                 description: User's password
//  *     responses:
//  *       '200':
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 token:
//  *                   type: string
//  *                   description: Bearer token for authentication
//  *               
//  * 
//  * /users/register:
//  *   post:
//  *     summary: Register User
//  *     tags : [Users]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/User'
//  *     responses:
//  *       '200':
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 command:
//  *                   type: string
//  *                   description: The SQL command executed.
//  *                 rowCount:
//  *                   type: integer
//  *                   description: The number of rows affected.
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: integer
//  *                       description: The User's Id.
//  *                     email:
//  *                       type: string  
//  *                       description: The User's Email.
//  *                     password:
//  *                       type: string  
//  *                       description: The User's password.
//  *                     role:
//  *                       type: string  
//  *                       description: The User's role.
//  *                 message:
//  *                   type: string
//  *                   description: A message indicating the result of the operation.
//  *       '400':
//  *         description: Bad Request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   description: A message indicating that the request was malformed or invalid.
//  *
//  * 
//  * 
//  *  
//  * /users:
//  *   get:
//  *     summary: Get Data User
//  *     tags : [Users]
//  *     parameters:
//  *       - name: page
//  *         in: query
//  *         description: Number of pages to display data
//  *         required: true
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       '200':
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/User'
//  * 
//  * securityDefinitions:
//  *   BearerAuth:
//  *     type: apiKey
//  *     in: header
//  *     name: Authorization
//  *     description: Use Bearer authentication token.
//  * 
//  * /users/{id}:
//  *   put:
//  *     summary: Update User By Id
//  *     tags : [Users]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: The User's Id.
//  *         schema:
//  *           type: integer
//  *     security:
//  *       - BearerAuth: []
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/User'
//  *     responses:
//  *       '200':
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 command:
//  *                   type: string
//  *                   description: The SQL command executed.
//  *                 rowCount:
//  *                   type: integer
//  *                   description: The number of rows affected.
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     id:
//  *                       type: integer
//  *                       description: The User's Id.
//  *                     email:
//  *                       type: string  
//  *                       description: The User's Email.
//  *                     password:
//  *                       type: string  
//  *                       description: The User's password.
//  *                     role:
//  *                       type: string  
//  *                       description: The User's role.
//  *                 massage:
//  *                   type: string
//  *                   description: A message indicating the result of the operation.
//  *   delete:
//  *     summary: Delete User By Id
//  *     tags : [Users]
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         required: true
//  *         description: The User's Id.
//  *         schema:
//  *           type: integer
//  *     security:
//  *       - BearerAuth: []
//  *     responses:
//  *       '200':
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 command:
//  *                   type: string
//  *                   description: The SQL command executed.
//  *                 rowCount:
//  *                   type: integer
//  *                   description: The number of rows affected.
//  *                 massage:
//  *                   type: string
//  *                   description: A message indicating the result of the operation.
//  *
//  * 
//  */


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