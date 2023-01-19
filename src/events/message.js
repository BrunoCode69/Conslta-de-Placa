const database = require("../modules/database");
module.exports = async function (client, message) {
    let args = message.text.split(" ");
    let contact = message.user.id;
    let db_ = await database.get(`menu/${contact}`);
    let db_local = new Object();

    if (args[0].toLowerCase() == 'menu') {
        database.set(`menu/${contact}`, {
            id: 1
        });

        let menu_message = `Escolha uma opção abaixo:\n\n`;
        menu_message += `1 - Consultar placa\n\nDigite a opção desejeda:`
        message.reply(menu_message);
    };

    if (await get_var_type(args[0]) == parseInt(1)) {
        let db = await database.get(`menu/${contact}`);
        if (!db) return;
        if (db.id == parseInt(1)) {
            message.reply(`Digite a placa:`);
            database.set(`menu/${contact}`, {
                id: 2
            });
        };
    };

    if (db_ && db_.id == parseInt(2)) {
        fetch(`https://apiplaca.com.br/v2/consultas/${args[0]}/15e8bd6b7a5d411a779c9eb8a0e4e3ca`, {
            method: 'GET'
        }).then(async function (request) {
            let data = await request.json();
            if (data.message) {
                message.reply(data.message);
                database.delete(`menu/${contact}`);
            } else {
                let value = Object.keys(data);
                let message_menu = "";
                value.forEach(async (item, index) => {
                    if(item == 'extra' || item == 'fipe') return;
                    message_menu += `*${item}*: ${data[item]}\n`
                    if (index == (Object.keys(data).length - 1)) {
                        println(message_menu);
                        message_menu = "";
                    };
                });

                function println(message_menu) {
                    message.reply(message_menu);
                    database.delete(`menu/${contact}`);
                };
            };
        });
    };

    async function get_var_type(a) {
        let init_var = a;
        if (typeof (init_var) == "string") {
            let value = parseInt(init_var);
            if (isNaN(init_var)) {
                init_var = a;
                return init_var;
            } else {
                init_var = parseInt(init_var);
                return init_var;
            };
        };
    };
};