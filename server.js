const express = require('express');
const cors = require('cors');

const porta = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(porta, () => console.log(`Rodando na porta ${porta}`));

const connection = require('./db_config');

app.post('/usuario/cadastrar', (request,response) => {
    let params = Array(
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.cpf_number,
    );

    let query = "INSERT INTO users(name,email,password,cpf_number) VALUES(?,?,?,?);";

    connection.query(query,params, (err,results) => {
        if(results) {
            response
            .status(201)
            .json({
                success: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                success: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

app.get('/usuario/listar', (request,response) => {
    const query = "SELECT * FROM users";

    connection.query(query,params, (err,results) =>{
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "Sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })

    
})

app.put('/usuario/editar/:id', (request,response) => {
    let params = Array(
        resquest.body.name,
        request.params.id
    );

    let query = "UPDATE users SET name = ? WHERE id = ?";
    
    connection.query(query, params, (err, results) => {
        if(results) {
            response 
            .status(200)
            .json({
                sucess: true,
                message: "sucesso",
                data: results
            })
        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

app.delete('/usuario/deletar/:id', (request,response) => {
    let params = Array(
        request.params.id
    );

    let query = "DELETE FROM users WHERE id = ?;"

    Connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(200)
            .json({
                sucess: true,
                message: "sucesso",
                data: results
            })
        } else {
            response 
            .status(400)
            .json({
                sucess: false,
                message: "sem sucesso",
                data: err
            })
        }
    })
})

// Rota para favoritar um item
app.post('/favoritar', (request, response) => {
    const userId = request.body.userId;
    const itemId = request.body.itemId;
  
    let query = "INSERT INTO favorites (user_id, item_id) VALUES (?, ?)";
    let params = [userId, itemId];
  
    connection.query(query, params, (err, results) => {
      if (results) {
        response
          .status(201)
          .json({
            success: true,
            message: "Favorito salvo com sucesso!",
            data: results
          })
      } else {
        response
          .status(400)
          .json({
            success: false,
            message: "Erro ao salvar favorito",
            data: err
          })
      }
    })
  })
  
  // Rota para recuperar os favoritos de um usuário
  app.get('/favoritos/:userId', (request, response) => {
    const userId = request.params.userId;
  
    let query = "SELECT * FROM favorites WHERE user_id = ?";
    let params = [userId];
  
    connection.query(query, params, (err, results) => {
      if (results) {
        response
          .status(200)
          .json({
            success: true,
            message: "Favoritos recuperados com sucesso!",
            data: results
          })
      } else {
        response
          .status(400)
          .json({
            success: false,
            message: "Erro ao recuperar favoritos",
            data: err
          })
      }
    })
  })

  