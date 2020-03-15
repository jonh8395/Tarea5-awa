const conn = require('../../config/mysql');
const joi = require('joi');
module.exports = (app) => {
    app.get('/estudiante', (req,res) => {
        let query = "SELECT id,nombre,direccion,fecha_nacimiento,saldo FROM estudiante";
        conn.query(query, (err, rows , fields) => {
            if (err) res.status(500).send('{"mensaje":"Error en el query"}');
            res.send(rows);
        })
    });

    app.get('/estudiante/:id', (req,res) => {
        let query = `SELECT id,nombre,direccion,fecha_nacimiento,saldo FROM estudiante where id =${req.params.id}`;
        conn.query(query, (err, rows , fields) => {
            if (err) res.status(500).send('{"mensaje":"No se encontro el campo"}');
            if(rows[0] != null){
            res.send(rows[0]);
            }else{
                res.send('{"mensaje":"No se encontro el id"}');
            }
        
        });
    });



    app.put('/estudiante/:id', (req,res) => {
        let schema = joi.object({
            nombre: joi.string().max(100).required(),
            direccion: joi.string().max(45).required() ,
            fecha_nacimiento: joi.string().max(45).required() ,
            saldo: joi.number().required()
         }); 
         
         if (schema.validate(req.body).error) {
             res.status(400).send('{"mensaje":"Error en los parametros enviados"}');
         }else{
         let query2 = `SELECT * FROM estudiante where id=${req.params.id}`;
         conn.query(query2,(er,row,fiel)=> {
            if (row[0] == null){
         res.status(400).send('{"mensaje":"No existe el estudiante especificado"}');
        }else{

        let query = `UPDATE estudiante set nombre = '${req.body.nombre}',direccion='${req.body.direccion}' ,fecha_nacimiento ='${req.body.fecha_nacimiento}' ,saldo = '${req.body.saldo}' where id = '${req.params.id}'`;
        conn.query(query, (err, rows , fields) => {
            if (err) res.status(400).send('{"mensaje":"Error en el query"}');
            res.send('{"mensaje":"Actualizacion realizada"}');
        });
        }
        });
    }
    });


    app.delete('/estudiante/:id', (req,res) => {
        let query2 = `SELECT * FROM estudiante where id=${req.params.id}`;

            conn.query(query2,(er,row,fiel)=> {
                if (row[0] == null){
             res.status(400).send('{"mensaje":"No existe el estudiante especificado"}');
            }else{
                let query = `DELETE FROM estudiante  where id =${req.params.id}`;
                conn.query(query, (err, rows , fields) => {
                    if (err) res.status(400).send('{"mensaje":"No se pudo borrar el estudiante"}');
                    res.send('{"mensaje":"Estudiante eliminado satisfactoriamente"}');  
                });
            }

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
       if (schema.validate(req.body).error){ 
           res.status(400).send('{"mensaje":"Sintaxis invalida"}') 
       }else{

       let query = `INSERT INTO estudiante (id,nombre,direccion,fecha_nacimiento,saldo) VALUES ('${req.body.id}' ,'${req.body.nombre}','${req.body.direccion}','${req.body.fecha_nacimiento}','${req.body.saldo}')`;
       conn.query(query, (err,rows ,fields) =>{
        if (err) res.status(500).send('{"mensaje":"Error"}');
        res.send(req.body);
       });
    }
    });
}

