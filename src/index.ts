import * as discord from 'discord.js';
import * as config from '../config.json';
import * as commandHandler from './modules/commandHandler';
import * as translator from './modules/translator';

const client = new discord.Client();
translator.init();
commandHandler.init(client);

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if(message.author.bot) return;
  console.log(message);
  commandHandler.handle(message, client);
})

client.login(config.discord.token);