import * as customConfig from '../controlers/CustomConfig.Controller';
import { DeleteResult } from "typeorm";
export const name: string = 'customconfig';
export const description: string = '';
export const aliases: string[] = ['cc'];
export const usage: string[] = [];
export const args: boolean = true;
export const guildOnly: boolean = true;
export const adminOnly: boolean = true;
export const channelRestricted: boolean = false;
export const cooldown: number = 0;
export async function execute(message: any, args: any[]) {
  const key = args[1];
  const value = args[2];
  const description = message.content.split(`'`)[1];
  switch (args[0]) {
    case 'add':
      customConfig.addConfig(message.author.id, key, value, description).then(() => {
        message.channel.send(`Successfully added ${key}`);
      }).catch((err:any) => {
        message.channel.send(err);
      });
      break;
    case 'update':
      if (!description) return message.channel.send('Please add a Description \n > ~customconfig update [key] [value] \'Description here\'');
      customConfig.updateConfig(message.author.id, key, value, description).then(() => {
        message.channel.send(`Successfully updated ${key}`);
      }).catch((err:any) => {
        message.channel.send(err);
      });
      break;
    case 'get':
      const config: any = await customConfig.getConfig(key);
      if (!config) return message.channel.send('Nothing found for the Key: `' + key + '`');
      message.channel.send(`Key: ${config.key ?? ''}\nValue: ${config.value ?? ''}\nDescription: ${config.info ?? ''}`);
      break;
    case 'delete':
      if(!key) return message.channel.send('Please add a Key \n > ~customconfig delete [key]')
      await customConfig.deleteConfig(key).then((item:DeleteResult) => {
        message.channel.send('Successfully deleted ' + key)
      }).catch((err:string) => {
        message.channel.send(err);
      })
      break;
    case 'list':
      const fullConfig: any = await customConfig.getFullConfig();
      if (!fullConfig) return message.channel.send('No Config found');
      let answerMessage: string = '----- **Custom Config** -----\n\n';
      fullConfig.forEach((entry: any) => {
        answerMessage += `> Key: ${entry.key}
        > Value: ${entry.value}
        > Description: ${entry.info}
        > Created by: ${entry.discordId}\n\n`;
      });
      message.channel.send(answerMessage, { split: true });
      break;
    case 'help':
      message.channel.send(
        'Unkown argument. Usage is as follows:```~customconfig add [key] [value] \'Description here\'\n~customconfig update [key] [value] \'Description here\'\n~customconfig get [key]\n~customconfig delete [key]\n~customconfig list\n~customconfig help```'
      );
      break;
    default:
      message.channel.send(
        'Unkown argument. Usage is as follows:```~customconfig add [key] [value] \'Description here\'\n~customconfig update [key] [value] \'Description here\'\n~customconfig get [key]\n~customconfig delete [key]\n~customconfig list\n~customconfig help```'
      );
  }
}
