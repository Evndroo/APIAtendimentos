class Tabelas{
    constructor(connection){
        this.connection = connection;
        this.criarTabelas();
    }

    criarTabelas(){
        const SQLquery = "create table IF NOT EXISTS tbAtendimentos( id int primary key auto_increment,"+
            "cliente varchar(50) not null,pet varchar(20) not null,"+
            "servico varchar(20) not null, data datetime not null, agendadoEm datetime not null, status varchar(20) not null, observacoes text )"

        this.connection.query(SQLquery, erro=>{
            if(erro)
                console.log("erro ao criar tabelas: " + erro)
        })
    }
}

module.exports = Tabelas