const conn = require('../../config/mysql');
const joi = require('joi');
module.exports = (app) => {
    app.get('/estudiante', (req,res) => {
        let query = "SELECT id,nombre,direccion,fecha_nacimiento,saldo FROM estudiante";
        conn.query(query, (err, rows , fields) => {
            if (err) res.status(500).send("error en el query");
            res.send(rows);
        })
    });

    app.get('/estudiante/:id', (req,res) => {
        let query = `SELECT id,nombre,direccion,fecha_nacimiento,saldo FROM estudiante where id =${req.params.id}`;
        conn.query(query, (err, rows , fields) => {
            if (err) res.status(500).send("error en el query");
            res.send(rows[0]);
        });
    });



    app.put('/estudiante/:id', (req,res) => {
        let query = `UPDATE estudiante set nombre = '${req.body.nombre}',direccion='${req.body.direccion}' ,fecha_nacimiento ='${req.body.fecha_nacimiento}' ,saldo = '${req.body.saldo}' where id =${req.params.id}`;
        conn.query(query, (err, rows , fields) => {
            if (err) res.status(500).send("error en el query");
            res.send(req.body);
        });
    });


    app.delete('/estudiante/:id', (req,res) => {
        let query = `DELETE FROM estudiante  where id =${req.params.id}`;
        conn.query(query, (err, rows , fields) => {
            if (err) res.status(500).send("error en el query");
            res.send('{"mensaje":"Eliminado exitosamente"}');
        });
    });



    app.post('/estudiante' , (req,res) =>{
       let schema = joi.object({
          id: joi.number().required(),
          nombre: joi.string().max(100).required(),
          direccion: joi.string().max(45).required() ,
          fecha_nacimiento: joi.string().max(45).required() ,
          saldo: joi.number().required()
       }); 
       let valido = schema.validate(req.body);
       if(valido.error) res.status(400).send('{"mensaje":"sintaxis invalida"}');

       let query = `INSERT INTO estudiante (id,nombre,direccion,fecha_nacimiento,saldo) VALUES ('${req.body.id}' ,'${req.body.nombre}','${req.body.direccion}','${req.body.fecha_nacimiento}','${req.body.saldo}')`;
       conn.query(query, (err,rows ,fields) =>{
        if (err) res.status(500).send('{"mensaje":"Error"}');
        res.send(req.body);
       });
    });
}

