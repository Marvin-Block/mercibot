import * as discord from 'discord.js';
import * as config from '../config.json';
import * as commandHandler from './modules/commandHandler';
import * as customConfigController from './controlers/CustomConfig.Controller';
import * as translator from './modules/translator';
import * as database from './modules/database';
import * as xpHandler from './modules/xpHandler';
import * as customConfig from './modules/customConfig';
import * as userController from './controlers/User.Controller';
import { sendWelcome } from './modules/customImages';

// let counterChannelId: any = null;
const counterChannelId = '850489762099757116';
const noXpChannels = ['850489762099757116'];

const client = new discord.Client();
translator.init();
commandHandler.init(client);
database.init();

client.once('ready', async () => {
  console.log('Ready!');
  customConfig.init(client);
  // counterChannelId = await customConfig.getConfig('memberCounterChannel');
  if (counterChannelId) {
    const channel = client.guilds.cache.first().channels.cache.find((ch) => ch.id === counterChannelId);
    if (channel) {
      channel.setName(translator.t('counterChannelText', client.guilds.cache.first().memberCount));
    }
  }
});

client.on('message', (message) => {
  if (message.author.bot) return;
  commandHandler.handle(message, client);
  if (!noXpChannels.includes(message.channel.id)) {
    xpHandler.addXpMessage(message);
  }
});

client.on('guildMemberAdd', (member) => {
  if (member.user.bot) {
    return;
  }
  userController.addUser(member);
  sendWelcome(member);
  if (counterChannelId) {
    const channel = member.guild.channels.cache.find((ch) => ch.id === counterChannelId);
    if (channel) {
      channel.setName(translator.t('counterChannelText', member.guild.memberCount));
    }
  }
});

client.on('guildMemberRemove', (member) => {
  if (counterChannelId) {
    member.guild.channels.cache.find((ch) => ch.id === counterChannelId).setName(translator.t('counterChannelText', member.guild.memberCount));
  }
});

client.login(config.discord.token);
