const Discord = require("discord.js");
const { Client, Util, MessageAttachment, MessageEmbed} = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const dotenv = require("dotenv").config();
const randomPuppy = require("random-puppy");
const wiki = require("wikijs").default();
const weather = require('weather-js');
const db = require('quick.db');
const ownerid = "383340415409193002";
const request = require("node-superfetch");



// test ye
const superagent = require("superagent")
require("./server.js");

const TOKEN = process.env.BOT_TOKEN;
const PREFIX = process.env.PREFIX;
const GOOGLE_API_KEY = process.env.YTAPI_KEY;

const hook = new Discord.WebhookClient('713158157102350397', 'qSeLDTa8XIoGSz9jPnD1fNhz2EKc1-7BtlfCAqz5jQ_W2UD_o0ZdcZXEpOEU3iaODxBc');
hook.send('Isekriyid **FripeX** <== AQLII "**ON**"'); // hook

const bot = new Client({
    disableMentions: "all"
  
});


const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
let statuses = [
    `ALI LA V2`,
    "!help",
    `LJEAN TACHE`
]
setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {type: "STREAMING"});

}, 5000)


bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("ready", () => console.log(`${bot.user.tag} Conneected!`));
bot.on("shardDisconnect", (event, id) => console.log(`Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect!`));
bot.on("shardReconnecting", (id) => console.log(`Shard ${id} reconnecting...`));

bot.on('message', msg => {
  if(msg.author.bot) return;
  console.log(msg.mentions);
  if(msg.content.toLowerCase().startsWith('!stats')) {
    const args = msg.content.split(' ');
    console.log(args);
    if(args.length > 2) {
      msg.channel.send(`Incorrect Usage: !stats | !stats <user_id> | !stats @mention`);
    } else if(args.length === 2) {
      const member = msg.mentions.members.size === 1 ? 
        msg.mentions.members.first() :
        msg.guild.members.cache.get(args[1]);
      if(member) {
        const embed = new MessageEmbed()
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
          .setThumbnail(member.user.displayAvatarURL())
          .addField('Created On', member.user.createdAt.toLocaleString(), true)
          .addField('Joined On', member.joinedAt, true)
          .addField('Kickable', member.kickable, false)
          .addField('Voice Channel', member.voice.channel ? member.voice.channel.name + `(${member.voice.channel.id})` : 'None')
          .addField('Status', member.presence.status)
          .setDescription(`${member.roles.cache.map(role => role.toString()).join(' ')}`);
        msg.channel.send(embed);
      } else {
        msg.channel.send(`Doufighara hbibna agui faut le **mentionner**, je trouve pas => **${args[1]}**`);
      }
      
    } else {
      const { guild } = msg;
      const embed = new MessageEmbed()
        .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
        .setThumbnail(guild.iconURL())
        .addField('Créer le', guild.createdAt.toLocaleString(), true)
        .addField('Server Owner', guild.owner.user.tag)
        .addField('Total Members', guild.memberCount, true)
        .addField('Total Real Members', guild.members.cache.filter(member => !member.user.bot).size, true)
        .addField('Total Bots', guild.members.cache.filter(member => member.user.bot).size, true)
        .addField('Total Channels', guild.channels.cache.size, true)
        .addField('Total Text Channels', guild.channels.cache.filter(ch => ch.type === 'text').size, true)
        .addField('Total Voice Channels', guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
        .setColor('#5CC5FF')
        .setDescription(`${guild.roles.cache.map(role => role.toString()).join(' ')}`);
      msg.channel.send(embed);
    }
  }
});




bot.on('messageDelete', msg => {
    if(!msg.partial) {
        const channel = bot.channels.cache.get('713546625901002803');
        if(channel) {
            const embeddd = new MessageEmbed()
                .setTitle('Il a delete un message a hbibit !\nContent => ')
                .addField('Author', `${msg.author.tag} (${msg.author.id})`, true)
                .addField('di l\'Channel', `${msg.channel.name} (${msg.channel.id})`, true)
                .setDescription(msg.content)
                .setTimestamp();
            channel.send(embeddd);
               }
    }
});
    

bot.on("message", async (msg) => { // eslint-disable-line
    if (msg.author.bot) return;
    if (!msg.content.startsWith(PREFIX)) return;

    const args = msg.content.split(" ");
    const searchString = args.slice(1).join(" ");
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
    const serverQueue = queue.get(msg.guild.id);

    //var bot = new Discord.Client();

    function randomRange(min, max) { // returns an int >= min and <= max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

 
    
    let command = msg.content.toLowerCase().split(" ")[0];
    command = command.slice(PREFIX.length);

    try {
		if(command == "cv" || command == "userinfo" || command == "play" || command == "ping" || command == "lyrics" || command == "help" || command == "stats"  || command == "wiki"  || command == "weather"  || command == "meme"  || command == "cstatus"  || command == "search" || command == "mimi" || command == "cheems" || command == "mute" || command == "skip" || command == "pl" || command == "join" || command == "stop" || command == "resume" || command == "walid" || command == "koci" || command == "nowplaying" || command == "queue" || command == "volume") {
			//command.execute(msg, bot);
		} else {
			command.execute(msg);
		}
	} catch (error) {
		console.error(error);
		msg.reply('Inas i **FripeX#7224** aydyer la commande agui je ne l\'est pas config ! ');
	}

    if (command === "help" || command == "cmd") {
        let hEmbed = new Discord.MessageEmbed()
            .setColor("#7289DA")
            .setThumbnail(bot.user.displayAvatarURL())
            .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
            .setTitle (`BOT PREFIX => **${process.env.PREFIX}**`)
            .setDescription(`
__**Commands List**__
> \`play\` > **\`play [title/url]\`**
> \`search\` > **\`search [title]\`**
> \`lyrics\` > **\`lyrics [title]\`**
> **Music Moderation** =>\`skip\`, \`stop\`,  \`pause\`, \`resume\`, \`join\`,\`nowplaying\`, \`queue\`, \`volume\`
> **MODERATION/FUN** => \`walid\`,  \`koci\`, \`cheems\`, \`cv\`, \`stats\`, \`userinfo\`, \`cstatus\`, \`meme\`, \`weather\`, \`wiki\`, \`ping\``)

            //.setFooter("ALI LJEAN TACHE V2", "FripeX#7224");
            msg.channel.send({embed: hEmbed});
    }
    if (command === "play" || command === "p") {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return msg.channel.send("A hbibit, ilaq atilid dakhel voice channel");
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT")) {
            return msg.channel.send("S3ighara les perms a hbibit !");
        }
        if (!permissions.has("SPEAK")) {
            return msg.channel.send("S3ighara les perms pour parler a hibibt");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send(`✅  **|**  Playlist: **\`${playlist.title}\`** Ajoutaghtt ar la queue`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    var video = await youtube.getVideoByID(videos[0].id);
                    if (!video) return msg.channel.send("🆘  **|**  J'ai rien trouver a rbkk !");
                } catch (err) {
                    console.error(err);
                    return msg.channel.send("🆘  **|**  J'ai rien trouver a rbkk !");
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    }
    if (command === "search" || command === "sc") {
        const voiceChannel = msg.member.voice.channel;
        if (!voiceChannel) return msg.channel.send("A hbibit oukidoufigh ara dakhel voice channel !");
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        if (!permissions.has("CONNECT")) {
            return msg.channel.send("S3ighara les perms a hbibit !");
        }
        if (!permissions.has("SPEAK")) {
            return msg.channel.send("S3ighara les perms pour parler a hbibit !");
        }
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return msg.channel.send(`✅  **|**  Playlist: **\`${playlist.title}\`** Ajoutaght ar la queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    msg.channel.send(`
__**Song selection**__

${videos.map(video2 => `**\`${++index}\`  |**  ${video2.title}`).join("\n")}

Akhthir a hibibt entre 1-10.
					`);
                    // eslint-disable-next-line max-depth
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            max: 1,
                            time: 10000,
                            errors: ["time"]
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send("Tekhtaredh ara a hbibit !, Annulation ...");
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send("🆘  **|**  Pas trouver a hbibit");
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }

    } else if (command === "skip") {
        if (!msg.member.voice.channel) return msg.channel.send("ilaq atilid dakhel voice channel");
        if (!serverQueue) return msg.channel.send("Oulach achou ar a  **\`skipigh\`**.");
        serverQueue.connection.dispatcher.end("**Skip** tettwayouza !");
        return msg.channel.send("⏭️  **|**  **Skip** tettwayouza !");

    } else if (command === "stop") {
        if (!msg.member.voice.channel) return msg.channel.send("ilaq atilid dakhel voice channel");
        if (!serverQueue) return msg.channel.send("Oulach achou ar a  **\`stoppigh\`.");
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end("**Stop** tettwayouza !");
		return msg.channel.send("⏹️  **|**  Aqli stoppaghtt!");
		
	} else if (command === "walid") {
		const attachment = new MessageAttachment('https://i.imgur.com/L3hbzYH.png');
		msg.channel.send(attachment);

  
    
	} else if (command === "koci") {
		const attachment = new MessageAttachment('https://i.imgur.com/bn4pdXz.png');
		msg.channel.send(attachment);
    
    
    
    
    } else if (command === "meme") {
		const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle("meme!")
            .setURL(`https://reddit.com/r/${random}`);

        msg.channel.send(embed);
    
    
      
    
    } else if (command === "cstatus") {
		

        let user = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || msg.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || msg.member;

        if (!user.presence.activities.length) {
            const sembed = new MessageEmbed()
                .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                .setColor("GREEN")
                .setThumbnail(user.user.displayAvatarURL())
                .addField("**No Status**", 'This user does not have any custom status!')
                .setFooter(msg.guild.name, msg.guild.iconURL())
                .setTimestamp()
            msg.channel.send(sembed)
            return undefined;
        }

        user.presence.activities.forEach((activity) => {

            if (activity.type === 'CUSTOM_STATUS') {
                const embed = new MessageEmbed()
                    .setAuthor(user.user.username, user.user.displayAvatarURL({ dynamic: true }))
                    .setColor("GREEN")
                    .addField("**Status**", `**Custom status** -\n${activity.emoji || "No Emoji"} | ${activity.state}`)
                    .setThumbnail(user.user.displayAvatarURL())
                    .setFooter(msg.guild.name, msg.guild.iconURL())
                    .setTimestamp()
                msg.channel.send(embed)
            }
            else if (activity.type === 'PLAYING') {
                let name1 = activity.name
                let details1 = activity.details
                let state1 = activity.state
                let image = user.user.displayAvatarURL({ dynamic: true })

                const sembed = new MessageEmbed()
                    .setAuthor(`${user.user.username}'s Activity`)
                    .setColor(0xFFFF00)
                    .setThumbnail(image)
                    .addField("**Type**", "Playing")
                    .addField("**App**", `${name1}`)
                    .addField("**Details**", `${details1 || "No Details"}`)
                    .addField("**Working on**", `${state1 || "No Details"}`)
                msg.channel.send(sembed);
            }
            else if (activity.type === 'LISTENING' && activity.name === 'Spotify' && activity.assets !== null) {

                let trackIMG = `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`;
                let trackURL = `https://open.spotify.com/track/${activity.syncID}`;

                let trackName = activity.details;
                let trackAuthor = activity.state;
                let trackAlbum = activity.assets.largeText;

                trackAuthor = trackAuthor.replace(/;/g, ",")

                const embed = new MessageEmbed()
                    .setAuthor('Details Spotify', 'https://cdn.discordapp.com/emojis/408668371039682560.png')
                    .setColor("GREEN")
                    .setThumbnail(trackIMG)
                    .addField('Isem la musique', trackName, true)
                    .addField('Album', trackAlbum, true)
                    .addField('Author', trackAuthor, false)
                    .addField('Listen to Track', `${trackURL}`, false)
                    .setFooter(user.displayName, user.user.displayAvatarURL({ dynamic: true }))
                msg.channel.send(embed);
            }
        })
      
      
      
    } else if (command === "mute") {
		 
          if(!msg.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']))
            msg.channel.send("S3idhara les perms !");
        else {
            let memberId = msg.content.substring(msg.content.indexOf(' ')+1);
            let member = msg.guild.members.cache.get(args);
            if(member) {
                if(member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']) && !msg.member.hasPermission('ADMINISTRATOR'))
                    msg.channel.send("Smirghara at **Mutigh**");
                else {
                    let mutedRole = msg.guild.roles.cache.get('712712501527052350');
                    if(mutedRole) {
                        member.roles.add(mutedRole);
                        msg.channel.send("Mutaghth ez :white_check_mark:");
                    }
                    else
                        msg.channel.send("Doufighara le role.");
                }
            }
            else
                msg.channel.send("Doufighara le member !.");
        }
                    
                  

        
	} else if (command === "cv") {
		
        return msg.reply('Oui oui ça va et toi ?');
    
  } else if (command === "wiki") {
    if (!args[0]) return msg.channel.send("**Enter A Query!**")
        let m = await msg.channel.send({
            embed: {
                color: "GREEN",
                title: `Searching Wikipedia just for you ⌛`,
                description: `Please stand by...`,
            },
        });
        let result;
        const search = await wiki.search(args.join(' '));
        if (!search.results.length) {
            return m.edit({
                embed: {
                    color: "GREEN",
                    title: "What was that again? 📚🤓",
                    description: "Even Wikipedia doesn't seem to know what you're talking about.",
                    footer: {
                        text: "Check for typos or try searching for something else!",
                    },
                },
            });
        }
        result = await wiki.page(search.results[0]);
        try {
            let description = await result.summary();
            if (description.length > 8192) {
                const FirstEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(`${description.substring(0, 1950)}...\nArticle is too long, click [**here**](${result.raw.fullurl}) to read more!`);
                return m.edit(FirstEmbed);
            } if (description.length < 2048) {
                const SecondEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(`${description.slice(0, 2048)}`)
                return m.edit('', SecondEmbed)
            } if (description.length > 2048) {
                const ThirdEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048))
                const FourthEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096))
                m.edit('', ThirdEmbed)
                msg.channel.send('', FourthEmbed)
            } if (description.length > 4096 && description.length < 6144) {
                const FifthEmbed = new MessageEmbed()
                    .setAuthor(result.raw.title)
                    .setColor("GREEN")
                    .setDescription(description.slice(0, 2048))
                const SixthEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(2048, 4096))
                const SeventhEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(4096, description.length))
                await m.edit('', FifthEmbed)
                msg.channel.send(SixthEmbed)
                msg.channel.send(SeventhEmbed)
            } if (description.length > 6144 && description.length < 8192) {
                const EightEmbed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(description.slice(0, 2048));
                const NinthEmbed = new MessageEmbed()
                    .setColor('GREEN')
                    .setDescription(description.slice(2048, 4096));
                const TenthEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(4096, 6144));
                const EleventhEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(description.slice(6144, description.length))
                await m.edit('', EightEmbed);
                msg.channel.send(NinthEmbed);
                msg.channel.send(TenthEmbed);
                msg.channel.send(EleventhEmbed);
            }
        } catch (e){
            return m.edit("Not Available!")
        }
    
    
    } else if (command === "mimi") {
		
        return msg.channel.send('Mimi is a horse and i love having a discussion with him/her');

        } else if (command === "uptime") {
		
            function duration(ms) {
                const sec = Math.floor((ms / 1000) % 60).toString()
                const min = Math.floor((ms / (1000 * 60)) % 60).toString()
                const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
                const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
                return `${days.padStart(1, '0')} jours, ${hrs.padStart(2, '0')} heures, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `
            }
        
            msg.channel.send(`Ysekriyid **FripeX** depuis: ${duration(bot.uptime)}`)


    } else if (command === "volume" || command === "vol") {
        if (!msg.member.voice.channel) return msg.channel.send("ilaq atilid dakhel voice channel !");
        if (!serverQueue) return msg.channel.send("Pas de musiques a jouer.");
        if (!args[1]) return msg.channel.send(`Atan l volume => : **\`${serverQueue.volume}%\`**`);
        if (isNaN(args[1]) || args[1] > 100) return msg.channel.send("volume kan entre **1** - **100**.");
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolume(args[1] / 100);
        return msg.channel.send(`Aqli arrigh lvolume ar => : **\`${args[1]}%\`**`);

    } else if (command === "nowplaying" || command === "np") {
        if (!serverQueue) return msg.channel.send("Pas de musiques a jouer.");
		return msg.channel.send(`🎶  **|**  Aqli ads3edayagh => : **\`${serverQueue.songs[0].title}\`**`);

	} else if (command === "cheems" || command === "np") {
		 let message = await msg.channel.send("Arjou dqiqa...")
		 msg.channel.send("```Here is your subreddit r/cheems, cheemstard```")
		msg.channel.send("https://i.redd.it/iysnv0fpu9341.png")
    let {body} = await superagent
    .get(`https://i.redd.it/iysnv0fpu9341.png`)
    //console.log(body.file)
    if(!{body}) return msg.channel.send("Ouzmirghara merde sem7as :/")

    let cEmbed = new Discord.MessageEmbed()
    .setColor("#7289DA")
    .setAuthor(`${msg.author.username} > ydemendad cheems`, msg.guild.iconURL())
    .setImage(body.file)
    .setDescription(`Attan ouwsawen`)
    .setTimestamp()
    .setFooter(`ALI LJEAN TACHE V2`, bot.user.displayAvatarURL())
    msg.channel.send({embed: cEmbed})
    message.delete();

	} else if (command === "pl" || command === "pl") {
        
        return msg.channel.send(`La playlist n **DEBI POSTING**\n1- Cheb Bello feat dj Moulay-3inehom Mesawsa ©️2020Clip Officiel By Harmonie \n2-Cheb MEHDI -Tmanit El Mout-© (Studio.Clip.Live)\n3-Cheb "9alwa" -[Cha Gatli]\n4-cheb zebi la faute diali\n5-Cheb BELLO -GOOD BYE-© (Ft FETHI Samouraii).`);
    } else if (command === "aqjoun" || command === "dog") {
        let message = await msg.channel.send("Arjou dqiqa...")

        let {body} = await superagent
        .get(`https://dog.ceo/api/breeds/image/random`)
        //console.log(body.file)
        if(!{body}) return msg.channel.send("Ouzmirghara merde sem7as :/")
    
        let cEmbed = new Discord.MessageEmbed()
        .setColor("#7289DA")
        .setAuthor(`${msg.author.username} > ydemendad aqjoun`, message.guild.iconURL())
        .setImage(body.msg)
        .setTimestamp()
        .setFooter(`ALI LJEAN TACHE V2`, bot.user.displayAvatarURL())
        msg.channel.send({embed: cEmbed})
        msg.delete();
      
    
    

		
	} else if (command === "say" || command === "say") {
        if(!msg.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return msg.channel.send("Zmirdhara ayahviv")
    
        let argsresult;
        let mChannel = msg.mentions.channels.first()
    
        msg.delete()
        if(mChannel) {
            argsresult = args.slice(1).join(" ")
            mChannel.send(argsresult)
        } else {
            argsresult = args.join(" ")
            msg.channel.send(argsresult)
        }
} else if (command === "serverinfo" || command === "si") {
        
	let sEmbed = new Discord.MessageEmbed()
    .setColor("#7289DA")
    .setTitle("Server Info")
    .setThumbnail(bot.user.displayAvatarURL())
    .setAuthor(`${msg.guild.name} Info`, msg.guild.iconURL())
	.addField("**Isem server:**", `${msg.guild.name}`, true)
    .addField("**Owner server:**", `${msg.guild.owner}`, true)
    .addField("**Chhal les users:**", `${msg.guild.memberCount}`, true)
  .addField("**Créer le**", `${msg.guild.createdAt}`, true)
  .addField("**Text Channels**", `${msg.guild.channels.cache.filter(r => r.type === "text").size}`)
  .addField("**Voice Channels**", `${msg.guild.channels.cache.filter(c => c.type === "voice").size}`)
    .addField("**Roles Count**", `${msg.guild.roles.cache.size}`, true)
    .setFooter(`ALI LJEAN TACHE V2`, bot.user.displayAvatarURL());
    msg.channel.send({embed: sEmbed});
		
	} else if (command === "userinfo" || command === "ui") {
        
        let member = await msg.mentions.members.first() || msg.guild.members.cache.get(args[0]) || msg.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || msg.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || msg.member;
          let uEmbed = new Discord.MessageEmbed()
		  .setColor("#7289DA")
		.setTitle("Server Info")
		.setThumbnail(msg.guild.iconURL())
		.setAuthor(`${msg.author.username} Info`, msg.author.displayAvatarURL())
		.addField("**Ismis:**", `${msg.author.username}`, true)
		.addField("**#:**", `${msg.author.discriminator}`, true)
		.addField("**ID:**", `${msg.author.id}`, true)
		.addField("**Status:**", `${msg.author.presence.status}`, true)
		.addField("**Créer le:**", `${msg.author.createdAt}`, true)
		.setFooter(`ALI LJEAN TACHE V2`, bot.user.displayAvatarURL());
     member.presence.activities.forEach((activity) => {
        if (activity.type === 'PLAYING') {
            uEmbed.addField('Currently playing',`\n**${activity.name}**`)
        }
            })
	
        msg.channel.send({embed: uEmbed});
    
 
      
  } else if (command === "ping") {
   
  msg.channel.send("**Arjou je calcule...**").then(m => {
            let ping = m.createdTimestamp - msg.createdTimestamp
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setTitle("<:hourglass_flowing_sand:699128011743690794> = l'Pong ynou\n💓 = Latency ynou")
                .setThumbnail(bot.user.displayAvatarURL())
                .setDescription(`<:hourglass_flowing_sand:699128011743690794> **${ping}**\n\n💓 **${Math.round(bot.ws.ping)}**`)
                
                .setFooter(`ALI LJEAN TACHE V2`, bot.user.displayAvatarURL());
            msg.channel.send(embed)
            m.delete()
        })
    
      
      
        
  } else if (command === "weather") {
    if(!args[0]) return msg.channel.send('**Please Enter A City Name!**')
      
        weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result){
        
        if(err) msg.channel.send(err.message);

        if(result.length === 0) {
            msg.channel.send('**Please Enter A Valid Location.**')
            return undefined;
        }

            var current = result[0].current;
            var location = result[0].location;

            const embed = new MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("GREEN")
                .addField('**Timezone**', `UTC ${location.timezone}`, true)
                .addField('**Les degres a hbibit**', `${location.degreetype}`, true)
                .addField('**Temp**', `${current.temperature} Deg`, true)
                .addField('**A peu prés**', `${current.feelslike} Deg`, true)
                .addField('**Ave7ri**', `${current.winddisplay}`, true)
                .addField('**L\'humidité**', `${current.humidity}%`, true)
                .addField('**Date**', `${current.date}`, true)
                .addField('**Day**', `${current.day}`, true)
                .setFooter(msg.member.displayName, msg.author.displayAvatarURL())
                .setTimestamp()

            msg.channel.send({embed})

        });
    
    
        
       
        } else if (command === "join" || command === "jn") {
        
        const voiceChannel = msg.member.voice.channel;
         voiceChannel.join()
    .then(connection => console.log('Connected!'))
    .catch(console.error);

        

    } else if (command === "queue" || command === "q") {
        if (!serverQueue) return msg.channel.send("Pas de musiques a jouer.");
        return msg.channel.send(`
__**Attan la queue**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}

**Aqli ads3edayagh => : \`${serverQueue.songs[0].title}\`**
        `);

    } else if (command === "pause") {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send("⏸  **|**  Aqli pauzaghtt");
        }
        return msg.channel.send("Pas de musiques a jouer");

   
        
 } else if (command === "lyrics") {
   const genius = require("genius-lyrics")
   const G = new genius.Client(process.env.GENIUS)
   
   
   G.tracks.search(msg.content.split(' ').slice(1).join(' '), {limit: 1})
   .then(results => {
     const song = results[0]
     msg.channel.send(`**${song.artist.name} - ${song.title}**\n<${song.url}>`)
   })
   
   .catch(err => msg.reply(err))
   
 
 

    } else if (command === "resume") {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send("▶  **|**  Aqli resumaghtt a hbibit");
        }
        return msg.channel.send("Pas de musiques a jouer");
    } else if (command === "loop") {
        if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return msg.channel.send(`:repeat: **|** Ad3awed sans arret => **!loop** pour désactiver ${serverQueue.loop === true ? "✅" : ":x: pour désactiver **!loop**"}!`);
        };
        return msg.channel.send("Oulach les musiques a hbibit");
    }
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 100,
            playing: true,
            loop: false
        };
        queue.set(msg.guild.id, queueConstruct);

        queueConstruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
            console.error(`j'arrive pas a join voice => : ${error}`);
            queue.delete(msg.guild.id);
            return msg.channel.send(`j'arrive pas a join voice => : **\`${error}\`**`);
        }
    } else {
        serverQueue.songs.push(song);
        if (playlist) return;
        else return msg.channel.send(`✅  **|** **\`${song.title}\`** Ajoutaght ar la queue !`);
    }
    return;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        return queue.delete(guild.id);
    }




    const dispatcher = serverQueue.connection.play(ytdl(song.url))
        .on("finish", () => {
            const shiffed = serverQueue.songs.shift();
            if (serverQueue.loop === true) {
                serverQueue.songs.push(shiffed);
            };
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolume(serverQueue.volume / 100);

    serverQueue.textChannel.send({
        embed: {
            color: "RANDOM",
            description: `🎶  **|**  Aqli ads3edayagh => : **\`${song.title}\`**`
        }
    });
}

bot.login(TOKEN);
