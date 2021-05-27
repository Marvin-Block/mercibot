import * as xpHandler from '../modules/xpHandler';
import { getUser } from '../controlers/User.Controller';
import * as discord from 'discord.js';
export const name: string = 'user';
export const guildOnly: boolean = true;
export const adminOnly: boolean = false;
export const channelRestricted: boolean = false;
export const cooldown: number = 1;
export async function execute(message: any) {
  const user: any = await getUser(message.author.id);
  message.channel.send(`${user.xp} XP / ${xpHandler.getXPForLevel(user.level)}XP`);
}
