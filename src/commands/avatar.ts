import * as discord from 'discord.js';
export const name: string = 'avatar';
export const description: string = '';
export const aliases: string[] = [];
export const usage: string[] = [];
export const args: boolean = false;
export const guildOnly: boolean = true;
export const adminOnly: boolean = false;
export const channelRestricted: boolean = false;
export const cooldown: number = 5;
export async function execute(message: any) {
  const member = message.mentions.members.size > 0 ? message.mentions.members.first() : message.member;
  const embed = new discord.MessageEmbed()
    .setColor(0x42aaf4)
    .setTitle('Hier der Avator von ' + member.displayName)
    .setImage(member.user.displayAvatarURL({dynamic:true,size:4096}))
  return message.channel.send(embed);
}

