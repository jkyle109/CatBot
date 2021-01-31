const Discord = require("discord.js");
require("dotenv").config();
const axios = require("axios");

const client = new Discord.Client();

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;
const key = process.env.CAT_API_KEY;

const sadge = client.emojis.cache.get("736434669364576347");

sendCatPic = async (message) => {
    try {
        axios.defaults.headers.common["x-api-key"] = key; // Replace this with your API Key

        let response = await axios.get(
            "https://api.thecatapi.com/v1/images/search",
            { params: { limit: 1, size: "full" } }
        ); // Ask for 1 Image, at full resolution

        let image = response.data[0]; // the response is an Array, so just use the first item as the Image
        let url = image.url;
        console.log("url:", url);
        message.reply({ files: [url] });
    } catch (err) {
        console.log(err);
        message.channel.send(
            "C.A.T.exe has stopped working. " + sadge.toString()
        );
    }
};

client.on("ready", () => {
    console.log("I'm Ready!");
});

client.on("message", (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content.toLowerCase().startsWith(prefix + "cat")) {
        sendCatPic(message);
    }
});

client.login(token);
