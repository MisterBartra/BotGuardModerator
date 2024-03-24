const { Client, MessageAttachment } = require('discord.js');
const client = new Client({intents: 32767});

client.once('ready', () => { console.log(`\n Conectado en ${client.guilds.cache.size} servidores para un total de ${client.users.cache.size} usuarios.`);
	client.user.setActivity("Honkai: Star Rail");
});

const fs = require('fs');
const operators = JSON.parse(fs.readFileSync('op/nochecking.json', 'utf8'));
const badwords = JSON.parse(fs.readFileSync('blacklist/badwords.json', 'utf8'));

let symbol = "m!"; // Definido inicialmente
let sended = false;
let channelbot = "";

client.on('messageCreate', (message) => {
	if (!message.author.bot) {
		if (!operators.includes(message.author.id)) {
			if (message.content.toLowerCase().split(/\s+/).find((word) => badwords.includes(word))) {
				// Registrar la información en un archivo externo:
				const logData = `[${message.author.id}]\n ${message.author.tag} el ${new Date().toLocaleString()}\n\t${message.content}\n\n`;

				fs.appendFile('mod_action/badwords.log', logData, (err) => {
				  if (err) {
					console.error('Error al escribir en el archivo de registro:', err);
				  } else {console.log(logData);}
				});
				message.delete();
			} 
		} else {}
		if (message.content.startsWith(symbol)) { mbBot(message); }
		else { //interactMessages(message);
		}
	} else {
		
	}
});

function mbBot(message) {
	/// MisterBartra Command Bot:
		symbol = symbol; console.log(" El simbolo " + symbol + " da entrada a comando para MisterBartra.");
		channelbot = "solo-moderadores";
		const args = message.content.slice(symbol.length).split(" ");
		const command = args.shift().toLowerCase();
		switch (command) {
			case 'ping': {
				const msLantency = Date.now() - message.createdTimestamp;
				message.reply(`Pong!\n> Este mensaje tiene latencia de ${msLantency}ms en esta vez a partir desde la PC que lo envía.`);
				const msSeconds = msLantency/1000;
				if (msLantency>1000) {
					return message.channel.send(`Vaya ${msLantency}ms; eso serían como ${msSeconds} segundos ala xd.\n Parece que necesitaré reacomodar el flujo de las condiciones para mejorar las salidas.\nxd`);
				} else if (msLantency<0) {
					return message.channel.send(`What''; como que ${msLantency}ms; xd.\n Como cuando envias un mensaje antes de que lo envies xd.\nxd`);
				}
			}
			case 'help': {
				message.reply(MBbot.help);
				return console.log("\nRetorna la ayuda.\n");
			}
			case 'clearline': {
					suprimirNum = args.map(del => parseInt(del));
					//	message.channel.send("=purge " + suprimirNum);
					//	message.reply(asterisk_char + ":face_with_raised_eyebrow:" + asterisk_char);
					//	.then(message => console.log(`Ha borrado ${message.size} mensajes.\n`))
					//	.catch(console.error);
					//asterisk_char = "";
					return message.channel.bulkDelete(parseInt(suprimirNum)+1); // Valor con el comando ingresado
					//if (message.content.startsWith(`$symbol`))
					//return message.channel.send('help command');
				//message.channel.bulkDelete(1); // Pa borrar el comando del usuario
				//message.channel.send(`Creo los comandos de este bot no se encuentran en el canal de ${channelbot}.`);
				//return deleteMessages(args, command, channelbot);
			}
			case 'roll' : {
				rdmMax = args.map(rdm => parseInt(rdm));
				if (rdmMax == '1') roll=10;
				roll = parseInt(Math.random()*(rdmMax)+Math.random());
				return message.reply(`El sistema retorna un número azar-roll de ${roll} point(s)`);
			}
			case 'sumar': case '+': {
				const sumArgs = args.map(s => parseFloat(s));
				const suma = sumArgs.reduce((counter, s) => counter += s);
				message.reply(`La suma de valores da como resultado ${suma}!`);
				return;
			}
			case 'restar': case '-': {
				const resArgs = args.map(r => parseFloat(r));
				const resta = resArgs.reduce((counter, r) => counter -= r);
				message.reply(`La resta de valores da como resultado ${resta}!`);
				return;
			}
			case 'multiplicar': case '*': {
				const multiArgs = args.map(m => parseFloat(m));
				const multi = multiArgs.reduce((counter, m) => counter *= m);
				message.reply(`La multiplicación de valores da como resultado ${multi}!`);
				return;
			}
			case 'dividir': case '/': {
				const divArgs = args.map(d => parseFloat(d));
				const div = divArgs.reduce((counter, d) => counter /= d);
				message.reply(`La división de valores da como resultado ${div}!`);
				return;
			}
			case 'join': {
				function botJoinChannel(channelname, botmessage) {
					//const channel = client.channels.cache.get();
					channelSendMessage(channelname);
					channel.message.channel.send(botmessage);
					if (!channel) return console.error("El canal no existe!");
					channel.join().then(connection => {
						// Yay, it worked!
						console.log("Successfully connected.");
					}).catch(e => {
						// Oh no, it errored! Let's log it to console :)
						console.error(e);
					});
				}
//				botJoinChannel("965648749017837749");
				return;
			}
			case '########music': {
				const settings = require('./config/music-config.json');
				var isReady = true;
					function startsWithInList(message, list) {
				  var found = false;
				  list.forEach(function (item) {
					if (message.startsWith(item)) {
					  found = true;
					}
				  })
				  return found;
				}
				function foundsInList(message, list) {
				  var found = false;
				  list.forEach(function (item) {
					if (message === item ) {
					  found = true;
					}
				  })
				  return found;
				}
				//
				if (foundsInList(message.content, settings.commandList)) {
					fs.readdir(settings.filesDir, function (err, files) {
					  if (err) {return message.channel.send(settings.warningFolderNotFoundSentence+settings.filesDir);} 
					  let listTxt = "";
					  files.forEach(function (file) {
						if (file.endsWith('.MP3').toLowerCase()) {
						  listTxt += `\`${file.split('.')[0]}\` `;
						}
					  })
					  message.channel.send(settings.filesListSentence);
					  message.channel.send(listTxt);
					})
					return;
				}
				if (isReady && startsWithInList(message.content, settings.commandPlay)) {
					isReady = false;
					const args = message.content.slice(10).trim().split(' ');
					if (args.length != 1 || !args[0] || args[0] === "" ) {return message.channel.send(settings.warningPlayArgsSentence);}
					var voiceChannel = message.member.voice.channel;
					voiceChannel.join().then( connection => {
					  const dispatcher = connection.play(settings.filesDir+args[0]+'.mp3')
					  dispatcher.on('finish', () => {
						voiceChannel.leave();
						isReady = true;
					  })
					});
				}
				if (startsWithInList(message.content, settings.commandStop)) {
					message.member.voice.channel.leave();
					isReady = true;
				}
				console.log("Entra en la situación de música");
				return;
			}
			case 'ip': {
//				const file = new MessageAttachment('');
				// for a file on projects root if your file is in another subfolder just type the relative path to it 
				message.channel.send({files: ['https://www.wikihow.com/images_en/thumb/c/c9/Trace-an-IP-Address-Step-1-Version-10.jpg/v4-728px-Trace-an-IP-Address-Step-1-Version-10.jpg']})
				//message.channel.send(file);
				return;
			}
			case "write": {
				let ideas = client.data[master]//.message;
				let number = ideas + 1;
				let random = Math.floor(Math.random() * ideas);
				editedmessage = message.content.slice(7);
				client.msgs [number] = {
				  message: editedmessage
				}
				const readout = message.guild.channels.cache.find(c => c.name === "bartra-commands");
				fs.writeFile("./msgs.json", JSON.stringify(client.msgs, null, 4), err => {
				  if (err)throw err});
				  message.channel.send("Message Writen");
				fs.writeFile("./data.json", JSON.stringify(client.data, null, 4), err => {
				  if (err)throw err});
				  message.channel.send("Message Writen");
				fs.writeFile("./XRay.json", JSON.stringify(client.xray/*, null, 4*/), err => {
					if (err)throw err});
				return;
			}
			case "showerthought": {
				let _message = client.msgs[random]//.message;
				message.channel.send(`Shower thought ${random}: ` + _message);
				return;
			}
			case "members": {
				let memCount = message.guild.members.cache.size;
				let userCount = message.client.users.cache.size;
				let aver = client.guilds.cache.size;
				message.channel.send(`Cache Size: ${memCount} members and ${userCount}, ${aver} all users.`);
			}
			case "react": {
			}
			default: return;
		}

}

function canSendMessage() {
	sended = (!sended) ? (((6*Math.random()).toFixed() == "1") ? true : false) : false;
	return sended;
}

function refReplyOrNot(message, usermessage, botMessageSend) {
	if (canSendMessage()) { 
		//botMessageSend = ((2*Math.random()).toFixed() == "1") ? botMessageSend.toLowerCase() : botMessageSend;
		botMessageSend = (message.content.toLowerCase() == usermessage) ? message.content : (((2*Math.random()).toFixed() == "1") ? botMessageSend.toLowerCase() : botMessageSend);
		if ((3*Math.random()).toFixed() == "1") {
			if ((2*Math.random()).toFixed() == "1") message.reply(botMessageSend);
		} else {
			if ((2*Math.random()).toFixed() == "1") message.channel.send(botMessageSend);
		}
		sended = false;
	}
}

function specificContentMessage(usermessage) {
	if (canSendMessage()) { return message.content == usermessage;} // El mensaje es totalemente indentico a lo comprobado
}
function contentMessage(usermessage) {
	if (message.content.toLowerCase() == usermessage.toLowerCase()) {
		if (canSendMessage()) { return message.content.toLowerCase() == usermessage.toLowerCase();} // El mensaje es en minisculas igual a lo comprobado
	}
}

function botSendMessages(usermessage, botsend) {
	if (canSendMessage()) { // 
		message.channel.send(botsend);
		return
	}
}
function botReplyMessages(usermessage, botreply) {
	if (canSendMessage()) { // 
		message.reply(botreply);
		return
	}
}
function interactMessages(message) {
//	if (!message.content.startsWith(symbol)) {
	//refReplyOrNot(message,"@everyone","CHICOSS!!!");
	refReplyOrNot(message,"xd","XD");
	refReplyOrNot(message,"holas", "Holas");
	refReplyOrNot(message,"xd", "ala no");
	refReplyOrNot(message,":0", ":0");
}

client.login(require('./key.json').key)