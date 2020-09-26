const customExpress = require("./config/customExpress")
const Tabelas = require("./infra/Tabelas")

const connection = require("./infra/connection")



connection.connect(function(error){
    if(error){
        console.log(error)
    }else{
        const app = customExpress();

        const tabelas = new Tabelas(connection)


        app.listen("3000");
    }
});
