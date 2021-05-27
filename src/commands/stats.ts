import * as translator from '../modules/translator';
import * as discord from 'discord.js';
import * as userController from '../controlers/User.Controller';
import { Collection } from 'discord.js';
import * as xpHandler from '../modules/xpHandler';
import * as moment from 'moment';
export const name: string = 'stats';
export const description: string = translator.t('d_stats');
export const aliases: string[] = ['rank'];
export const usage: string[] = [];
export const args: boolean = false;
export const guildOnly: boolean = true;
export const adminOnly: boolean = false;
export const channelRestricted: boolean = false;
export const cooldown: number = 5;
export async function execute(message: any) {
  const member = message.mentions.members.size > 1 ? message.mentions.members.first() : message.member;
  const dbUser: any = await userController.getUser(member.id);
  const messagesSent = Math.floor((dbUser.xp / xpHandler.messageXPAmountMax + dbUser.xp / xpHandler.messageXPAmountMin) / 2);
  const options = { dateStyle: 'short' };
  const embed = new discord.MessageEmbed()
    .setColor(0x42aaf4)
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(translator.t('title_stats') + member.displayName)
    // .addField(translator.t('rank'), result[0].rank, true)
    .addField(translator.t('level'), dbUser.level, true)
    .addField(translator.t('xp'), dbUser.xp, true)
    .addField(translator.t('level_progress'), generateProgress(dbUser.level, dbUser.xp), true)
    .addField(translator.t('messages_sent'), messagesSent)
    .addField(translator.t('joined_on'), moment(dbUser.createdAt).format('DD.MM.YYYY'));
  message.channel.send(embed);
}

function generateProgress(level: number, xp: number) {
  level = xpHandler.getLvlForXP(xp);
  let xpBefore = 0;
  if (level > 1) xpBefore = xpHandler.getXPForLevel(level - 1);
  const xpAfter = xpHandler.getXPForLevel(level);
  const percent = ((xp - xpBefore) / (xpAfter - xpBefore)) * 10;
  let progressbar = '';
  for (let i = 1; i <= 10; i++) {
    i <= percent ? (progressbar += '■') : (progressbar += '□');
  }
  progressbar += ' ' + Math.trunc(percent * 10) + '%';
  return progressbar;
}
