const moment = require("moment");

const connection = require("../infra/connection");


class AtendimentoModel {


    Adiciona(atendimento, res) {
        const query = "insert into tbAtendimentos SET ?";

        const agendadoEm = moment().format("YYYY-MM-DD hh:mm:ss")
        const data = moment(atendimento.data, "DD/MM/YYYY").format("YYYY-MM-DD hh:mm:ss")

        const atendimentoDatado = { ...atendimento, agendadoEm, data };

        const validDate = moment(data).isSameOrAfter(agendadoEm);

        const validacoes = [
            {
                "nome": "data",
                "valido": validDate,
                "message": "A data de agendamento deve ser hoje ou depois"
            },
            {
                "nome": "cliente",
                "valido": atendimento.cliente.length > 4,
                "message": "O nome do cliente deve conter ao menos 5 caracteres"
            }
        ];

        const erros = validacoes.filter(item => !item.valido);

        if (erros.length) { 
            res.status(400).send(erros)
        }
        else {
            connection.query(query, atendimentoDatado, (erro, result) => {
                if (erro) {
                    res.status(400).send({ message: "Algo deu errado" })
                } else {
                    res.status(201).send({ message: "Agendamento realizado com sucesso", id: result.insertId, ...atendimento })
                }
            });
        }
    }


    lista(res){

        const sqlQuery = "select * from tbAtendimentos";

        connection.query(sqlQuery,(erro,result) =>{
            if(erro){
                res.status(400).send({mensagem: "Algo deu errado", erro:erro});
            }else{
                res.status(200).send(result)
            }
        });
    }

    getById(id, res){
        const idNumber = parseInt(id);
        
        const sqlQuery = "select * from tbAtendimentos where id = "+id;

        connection.query(sqlQuery,(erro,result) =>{
            const atendimento = result[0];
            if(erro){
                res.status(400).send({mensagem: "Algo deu errado", erro:erro});
            }else{
                res.status(200).send(atendimento)
            }
        });
    }

    altera(id, valores, res){
        const sql = "UPDATE tbAtendimentos set ? where id = ?";

        if(valores.data){
            const data = moment(valores.data, "DD/MM/YYYY").format("YYYY-MM-DD hh:mm:ss")
            valores.data = data
        }

        connection.query(sql, [valores, id], (erro,result)=>{
            if(erro){
                res.status(400).send({mensagem: "Algo deu errado", erro:erro});
            }else{
                res.status(200).send({id, ...valores})
            }
        });

    }

    deleta(id, res){
        const sqlQuery = "DELETE FROM tbAtendimentos where id = ?";

        connection.query(sqlQuery, id, (erro, result) =>{
            if(erro){
                res.status(400).send({mensagem: "Algo deu errado", erro:erro});
            }else{
                res.status(202).send({id})
            }
        });
    }

}

module.exports = new AtendimentoModel();