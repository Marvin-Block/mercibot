export class Test {
  readonly name = 'ping';
  readonly description = 'Ping!';
  readonly usage = '<ping>';
  readonly guildOnly = false;
  readonly adminOnly = false;
  readonly cooldown = 5;
  execute(message: any) {
    message.channel.send('Pong.');
  }
}
