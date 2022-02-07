const Discord = require("discord.js");
async function nuke(mesaj) {
    const Stergere= await mesaj.channel.messages.fetch(100);
    mesaj.channel.bulkDelete(Stergere,true);
}
function Play(message, actiune, argument) {
    let vc = message.member.voice.channel;
    if (!vc) {
        console.log(vc);
        actiune.mesaj = "Tre sa intri intr-un canal fraiere";
    }
    else {
        if (typeof argument === 'undefined') {
            console.log("om indecis");
            actiune.mesaj = "Bine, da gen ce vrei sa pun?";
        }
        else {
            console.log("s-a pus o melodie");
            actiune.properties = actiune.properties * 5;
        }
    }
}
function iesi(message, actiune, argument) {
    if (!message.member.voice.channel) {
        actiune.mesaj = "Tre sa intri intr-un canal fraiere";
    }
    else {
        if (argument === "terog") {
            actiune.mesaj = "bine frate hai daca ma rogi";
            actiune.properties = 4;
            console.log("guta iese din actiune");
        }
        else {
            actiune.mesaj = "Da' iesi tu!";
            actiune.properties = 6;
            console.log("un fraier");
        }
    }
}
function Skip(message, actiune) {
    if (!message.member.voice.channel) {
        actiune.mesaj = "Tre sa intri intr-un canal fraiere";
    }
    else {
        if (!message.member.voice.channel) {
            actiune.mesaj = "Tre sa intri intr-un canal fraiere";
        }
        else {
            actiune.properties = 7;
            actiune.mesaj = "Sarim peste o melodie baietii";
            console.log("Skip");
        }
    }
}
function Dedicatie(argument, actiune) {
    if (typeof argument === 'undefined') {
        actiune.mesaj = "cui vrei sa-i dedici?";
    }
    else {
        if (argument === "andrei") {
            actiune.mesaj = "Cel mai smecher asta e frate cu mine s-a nascut destept si o mai invatat";
        }
        else {
            actiune.mesaj = `Cel mai smecher asta e frate cu mine se stieeeeee ${argument}`;
        }
    }
    actiune.properties = actiune.properties * 2;
    console.log("dedicatie");
}
module.exports={
    nuke,
    Skip,
    iesi,
    Play,
    Dedicatie
}