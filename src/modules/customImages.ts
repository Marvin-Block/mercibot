import * as fs from 'fs';
import * as translator from './translator';
import * as customConfig from '../controlers/CustomConfig.Controller';
import * as nodeHtmlToImage from 'node-html-to-image';

const cooldowns = new Map();

function checkCooldown(id: string) {
  if (!cooldowns.has(id) || Date.now() > cooldowns.get(id)) {
    cooldowns.set(id, Date.now() + 60000);
    return true;
  }
  return false;
}

export function sendWelcome(guildMember: any) {
  // a
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
      message.attachFiles(['./resources/temp/Top10.png'])
        .setImage('attachment://Top10.png');
      channel.send(message);
    });
  });
}
