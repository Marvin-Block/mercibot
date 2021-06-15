import * as translator from '../modules/translator';
import * as customImages from '../modules/customImages';
import * as discord from 'discord.js';
import { getAmountUsers } from '../controlers/User.Controller';
import * as customConfig from '../controlers/CustomConfig.Controller';
import { Collection } from 'discord.js';
export const name: string = 'customconfig';
export const description: string = '';
export const aliases: string[] = ['cc'];
export const usage: string[] = [];
export const args: boolean = true;
export const guildOnly: boolean = true;
export const adminOnly: boolean = true;
export const channelRestricted: boolean = false;
export const cooldown: number = 5;
export async function execute(message: any, args: any[]) {
  switch (args[0]) {
    case 'add':
      const key = args[1];
      const value = args[2];
      const description = message.content.split('"')[1];
      if (!description) return message.channel.send('Please add a Description \n > ~customconfig add [key] [value] "Description here"');
      message.channel.send(key);
      message.channel.send(value);
      message.channel.send(description);
      break;
    case 'set':
      // set
      break;
    case 'get':
      const config: any = await customConfig.getConfig(args[1]);
      if (!config) return message.channel.send('Nothing found for the Key: `' + args[1] + '`');
      message.channel.send(`Key: ${config.key ?? ''}\nValue: ${config.value ?? ''}\nDescription: ${config.info ?? ''}`);
      break;
    case 'delete':
      // delete
      break;
    case 'list':
      const fullConfig: any = await customConfig.getFullConfig();
      if (!fullConfig) return message.channel.send('No Config found');
      let answerMessage: string = '----- **Custom Config** -----\n\n';
      fullConfig.forEach((entry: any) => {
        answerMessage += `> Created by: ${entry.discordId}
        > Key: ${entry.key}
        > Description: ${entry.info}
        > Value: ${entry.value}\n\n`;
      });
      message.channel.send(answerMessage, { split: true });
      break;
    case 'help':
      // help
      break;
    default:
      message.channel.send(
        'Unkown argument. Usage is as follows:```~customconfig add [key] [value]\n~customconfig set [key] [value]\n~customconfig get [key]\n~customconfig delete [key]\n~customconfig list\n~customconfig help```'
      );
  }
}
