export class Ping {
  name: 'ping';
  description: 'Ping!';
  usage: '<ping>';
  guildOnly: false;
  adminOnly: false;
  cooldown: 5;
  execute(message: any) {
    message.channel.send('Pong.');
  }
}
