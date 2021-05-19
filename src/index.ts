import * as discord from 'discord.js';
import * as config from '../config.json';
import * as commandHandler from './modules/commandHandler';
import * as translator from './modules/translator';
import * as database from './modules/database';

const client = new discord.Client();
translator.init();
commandHandler.init(client);
database.init();

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', message => {
  if(message.author.bot) return;
  commandHandler.handle(message, client);
})

client.login(config.discord.token);