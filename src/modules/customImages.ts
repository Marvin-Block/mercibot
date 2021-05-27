import * as fs from 'fs';
import * as translator from './translator';
import * as nodeHtmlToImage from 'node-html-to-image';
import { getConfig } from '../controlers/CustomConfig.Controller';
import { GuildMember, Message } from 'discord.js';

const cooldowns = new Map();

function checkCooldown(id: string) {
  if (!cooldowns.has(id) || Date.now() > cooldowns.get(id)) {
    cooldowns.set(id, Date.now() + 60000);
    return true;
  }
  return false;
}

export async function sendWelcome(guildMember: GuildMember) {
  if (!checkCooldown(guildMember.id)) return;
  // const dbWelcomeChannel: any = await getConfig('welcomeChannel');
  // const welcomeChannel: any = await guildMember.guild.channels.cache.get(dbWelcomeChannel.value);
  const welcomeChannel: any = await guildMember.guild.channels.cache.get('844283720663564328');
  const image: any = fs.readFileSync('./resources/images/star.png');
  // @ts-ignore
  const base64Image = new Buffer.from(image).toString('base64');
  const starURI: string =
    new Date().getHours() > 20 && new Date().getHours() < 7
      ? 'data:image/jpeg;base64,' + base64Image
      : 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  fs.readFile('./resources/html/welcome.html', (err, data) => {
    // @ts-ignore
    nodeHtmlToImage({
      puppeteerArgs: {
        headless: true,
        args: ['--no-sandbox']
      },
      output: './resources/temp/welcome.png',
      html: data.toString(),
      type: 'png',
      transparent: true,
      content: {
        star: starURI,
        userImage: guildMember.user.avatarURL({ format: 'png' }),
        welcome: translator.t('welcome'),
        name: guildMember.displayName,
        background:
          new Date().getHours() > 20 && new Date().getHours() < 7
            ? 'https://i.pinimg.com/originals/1e/a5/4c/1ea54cb477c75e6036097f49fdef5793.jpg'
            : 'https://cutewallpaper.org/21/summer-anime-wallpaper/Scenic-Summer-Wallpaper-Download-Wallpapers,-Download-.jpg'
      }
    }).then(() => {
      welcomeChannel.send({
        files: ['./resources/temp/welcome.png']
      });
    });
  });
}

export function sendTop10(message: any, users: any[], channel: any) {
  fs.readFile('./resources/html/top10.html', (err, data) => {
    // @ts-ignore
    nodeHtmlToImage({
      puppeteerArgs: {
        headless: true,
        args: ['--no-sandbox']
      },
      output: './resources/temp/Top10.png',
      html: data.toString(),
      type: 'png',
      transparent: true,
      content: {
        users
      }
    }).then((res: any) => {
      message.attachFiles(['./resources/temp/Top10.png']).setImage('attachment://Top10.png');
      channel.send(message);
    });
  });
}

export function sendLevelUp(message: Message, level: number) {
  const member: GuildMember = message.member;
  const image: any = fs.readFileSync('./resources/images/star.png');
  // @ts-ignore
  const base64Image = new Buffer.from(image).toString('base64');
  const starURI = 'data:image/jpeg;base64' + base64Image;
  fs.readFile('./resources/html/lvlup.html', (err, data) => {
    // @ts-ignore
    nodeHtmlToImage({
      puppeteerArgs: {
        headless: true,
        args: ['--no-sandbox']
      },
      output: './resources/temp/lvlup.png',
      html: data.toString(),
      type: 'png',
      transparent: true,
      content: {
        star: starURI,
        userImage: member.user.avatarURL({ format: 'png' }),
        levelup: translator.t('lvlup'),
        name: member.displayName,
        level,
        prevlevel: level - 1
      }
    }).then(() => {
      message.channel.send({
        files: ['./resources/temp/lvlup.png']
      });
    });
  });
}
