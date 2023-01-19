const { WhatsAppBot } = require("rompot");
const client = new WhatsAppBot({
    printQRInTerminal: true
});

client.on("message", async (message) => {
    require("../events/message")(client, message);
});

client.on("open", async() => {
    require("../events/open")();
});

client.connect({ auth: "../chrome/whatsapp-bot" });