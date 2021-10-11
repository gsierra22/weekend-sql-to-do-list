//requires
const express = require ('express');
const app = express();
const bodyParser= require('body-parser');
//modules
const pool=require('./modules/pool');
//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));
//globals
const port=5000
//spin up
app.listen(port, ()=>{
    console.log('server is up on:', port);
})

app.get('/list',(req,res)=>{
    console.log('/messages GET hit');
    const queryString= `SELECT * FROM list`;
    pool.query(queryString).then( (results)=>{
        res.send(results.rows);
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})

app.post ('/list', (req, res)=>{
    console.log('/list POST hit', req.body);
    let queryString= `INSERT INTO "list" (tasks, task_completed) VALUES ($1, $2);`
    let values =  [req.body.tasks, req.body.task_completed];
    pool.query(queryString, values) .then((results)=>{
        res.sendStatus(201) 
    }).catch((err)=>{
        console.log(err);
        res.sendStatus(500);
    })
})