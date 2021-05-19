import * as translator from '../modules/translator';
import * as discord from 'discord.js';
export const name:string = 'serverinfo'
export const description:string = translator.t('d_serverinfo');
export const aliases:string[] = [];
export const usage:string[] = [];
export const args:boolean = false;
export const guildOnly:boolean = true;
export const adminOnly:boolean = false;
export const cooldown:number = 5;
export function execute(message:any){
    //add welcome channel in resolve
    const channel = message.guild.channels.resolve('844283720663564328');
    channel.createInvite().then(function(invite:any) {
        const embed = new discord.MessageEmbed()
            .setColor(0x42aaf4)
            .setTitle(':small_orange_diamond: Server Info :small_orange_diamond:')
            .setTimestamp()
            .setThumbnail(message.guild.iconURL())
            .addField(translator.t('name'), message.guild.name, true)
            .addField(translator.t('member'), message.guild.memberCount, true)
            .addField(translator.t('created_at'), message.guild.createdAt.toDateString())
            .addField(translator.t('invite_link'), invite.url);
        message.channel.send(embed);
    });
}