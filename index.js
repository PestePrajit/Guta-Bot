require('dotenv').config();
const { DisTube, Song, Queue } = require('distube');
const actiuni=require("./GutaActiuni");
const replici = require("./GutaReplici");
const Discord = require("discord.js");
const { Client, Intents, Permissions } = require('discord.js');
const client = new Discord.Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ], });
const { SpotifyPlugin } = require('@distube/spotify')

const ytdl = require('ytdl-core');
const {YTSearcher} = require('ytsearcher');
const searcher= new YTSearcher({
    key: process.env.YTKEY,
    reveled: true
});
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
    ]
  })
var reactFinishSong=true;
//porneste bot-ul cu tokenul personal
client.login(process.env.TOKEN)
//Da un semn la pornirea bot-ului si update-uri in consola o date pe minut
client.on("ready", () => {
    console.log("Atentiune natiune, intra Guta in actiune");
    setInterval(function(){console.log("Guta este in actiune")},60000);
})
//Reactia la mesaje
client.on("messageCreate", async (message) => {
    const prefix = '$';
    //Verifica sa ignore alti boti, mesajele fara prefix si canalul "sugestii-guta"
    if(message.author.bot || message.content.charAt(0)!==prefix || message.channelId==='937969515571077160'){
        return;
    }    
    //Separa string-ul din mesaj in mai multe valori. Args este comana/argumentul la comanda; command este efectiv comanda
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command=args.shift().toLowerCase();  
    //Alege replica cu functia din modulul GutaReplici
    const mesajul=replici.AlegeriReplici(message,command,args[0]);
    //Verifica proprietatile comenzilor
    switch(mesajul.properties){
        case 2:
            message.reply(mesajul.mesaj);
            break;
        case 3:
            //Verifica daca cel care trimite mesajul are permisiuni, sa nu stearga omul de rand tot canalu
            if(message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
                actiuni.nuke(message);
            message.channel.send(mesajul.mesaj);
            }
            else{
                message.reply("Ba tu te crezi smeker!?");
                console.log("asta se crede smeker");
            }
            break;
        case 4:
            client.distube.voices.get(message)?.leave()
            message.channel.send(mesajul.mesaj);
            reactFinishSong=false;
            console.log("Guta a iesit de pe canal");
            break;
        case 5:        
            client.distube.play(message, args.join(" "))                
            break;
        case 6:
            message.member.voice.disconnect("bulangiu");
            message.channel.send(mesajul.mesaj);
            break;
        case 7:
            try{
                const Lista=client.distube.getQueue(message);
                if (Lista.songs.length<=1){
                    message.channel.send("Bine, dar gen trebuie sa mai fie un cantec in queue ca sa dai skip");
                    return;
                }
                reactFinishSong=false;
                client.distube.skip(message);
                message.channel.send(mesajul.mesaj);
            }
            catch(err){
                message.channel.send("Bine, dar gen trebuie sa mai fie un cantec in queue ca sa dai skip");
                console.error(err);
            }   
            finally{
                break;
            }        
        case 8:
            const Lista=client.distube.getQueue(message);
            if(!Lista){
                message.channel.send("Ba geniule vezi ca n-ai vreun queue");
            }               
            else{
                message.channel.send(
                    `${mesajul.mesaj}${Lista.songs
                        .map((song, id) => `**${id ? id : "Lautarii canta: "}**. ${song.name} - \`${song.formattedDuration}\``)
                        .slice(0, 10)
                        .join("\n")}`
                )
            }
            break;        
        default:
            message.channel.send(mesajul.mesaj);
            break;
    }
})
//Evenimente pentru Distube. Self-explanatory
client.distube.on("playSong", (queue, song)=>{
    queue.textChannel.send(`Lautarii canta:\n${song.url}`);
    console.log("o melodie a inceput sa cante");
});
client.distube.on("addSong", (queue,song)=>{
    if(song.member.nickname){
        queue.textChannel.send(`${song.member.nickname} a cerut maneaua asta ${song.name}`);
    }
    else
    queue.textChannel.send(`${song.user.tag} a cerut maneaua asta\n ${song.name}`);
    
});
client.distube.on("finishSong", (queue,song)=>{
    if(reactFinishSong){
        queue.textChannel.send(`s-a terminat dedicatia ${song.name}`);        
    }   
    console.log("s-a terminat o melodie");
    reactFinishSong=true;
});
client.distube.on("empty", queue =>{
    queue.textChannel.send("bulangii m-ati lasat singur. Da-va dreq");
    console.log("Guta e singur");
})