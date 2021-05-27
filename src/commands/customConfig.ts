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
export const channelRestricted: boolean = true;
export const cooldown: number = 5;
export async function execute(message: any, args:any[]) {
    switch (args[0]){
        case 'add':
            const key = args[1]
            const value = args[2]
            const description = ''; // todo: add description with quotes or something

            break;
        case 'set':
            // set
            break;
        case 'get':
            const config:any = await customConfig.getConfig(args[1]);
            if(!config) return message.channel.send('Nothing found for the Key: `' + args[1] + '`');
            message.channel.send(`Key: ${config.key ?? ''}\nValue: ${config.value ?? ''}\nDescription: ${config.info ?? ''}`);
            break;
        case 'delete':
            // delete
            break;
        case 'help':
            // help
            break;
        default:
            message.channel.send('Unkown argument. Usage is as follows:```~customconfig add [key] [value]\n~customconfig set [key] [value]\n~customconfig get [key]\n~customconfig delete [key]\n~customconfig help```')
    }

}