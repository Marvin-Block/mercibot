import * as translator from '../modules/translator';
import * as customImages from '../modules/customImages';
import * as discord from 'discord.js';
import { getAmountUsers } from '../controlers/User.Controller';
import { Collection } from 'discord.js';
export const name: string = 'topusers';
export const description: string = '';
export const aliases: string[] = ['top10'];
export const usage: string[] = [];
export const args: boolean = false;
export const guildOnly: boolean = true;
export const adminOnly: boolean = false;
export const channelRestricted: boolean = false;
export const cooldown: number = 5;
export async function execute(message: any) {
  // todo: shit is slow as fuck, why ?
  const dbUsers: any[any] = await getAmountUsers(10);
  const embed = new discord.MessageEmbed()
    .setColor(0x42aaf4)
    .setTitle(':small_orange_diamond: Top 10 :small_orange_diamond:')
    .setThumbnail(message.guild.iconURL())
    .setDescription('') // todo: add description
    .setTimestamp();

  const discordUsers: Collection<any, any> = await message.guild.members.fetch({ user: dbUsers.map((user: any) => user.discordId) });
  const users: any[any] = [];
  dbUsers.forEach((entry: any, index:number) => {
    users.push({
        username: discordUsers.get(entry.discordId).displayName,
        xp: entry.xp,
        rank: index + 1,
        url: discordUsers.get(entry.discordId).user.displayAvatarURL()
      });
  });
  customImages.sendTop10(embed, users, message.channel);
}
