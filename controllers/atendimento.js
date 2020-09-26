const AtendimentoModel = require("../models/atendimentos");

module.exports = app =>{
    app.get("/atendimentos", (req,res)=>{
        AtendimentoModel.lista(res);
    })

    app.get("/atendimentos/:id", (req,res)=>{
        AtendimentoModel.getById(req.params.id, res);
    });

    app.post("/atendimentos", (req,res)=>{
        AtendimentoModel.Adiciona(req.body, res);

    })

    app.patch("/atendimentos/:id", (req,res)=>{
        const id  = parseInt(req.params.id);
        const valores = req.body;
        AtendimentoModel.altera(id, valores, res);
    });

    app.delete("/atendimentos/:id", (req,res)=>{
        const id  = parseInt(req.params.id);
        AtendimentoModel.deleta(id, res);
    })
}