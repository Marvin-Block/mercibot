import * as discord from 'discord.js';
import * as config from '../../config.json';
import * as translator from './translator';
import * as adminRole from '../controlers/AdminRole.Controller';
import * as commandEnabledChannel from '../controlers/CommandEnabledChannel.Controller';
import * as fs from 'fs';

// create Collection for command cooldown
const cooldowns = new discord.Collection();

export async function init(client: any) {
  // create collection for commands
  client.commands = new discord.Collection();

  // read commands from directory
  const commandFiles = fs.readdirSync('./src/commands').filter((file) => file.endsWith('.ts'));
  // iterate files and add to collection
  for (const file of commandFiles) {
    const command = await import(`../commands/${file}`)
    client.commands.set(command.name, command);
    console.log('Imported command: ' + command.name);
  }
}

export async function handle(message: any, client: any) {
  const prefix = config.discord.prefix;
  const messageOriginal = message;

  // react only to prefix messages. Ignore bots
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // check for command alias
  const command = client.commands.get(commandName) || client.commands.find((cmd: any) => (cmd.aliases ? cmd.aliases.includes(commandName) : false));

  if (!command) return;

  // check for guildOnly
  if (command.guildOnly && message.channel.type !== 'text') {
    return message.reply(translator.t('err_guildOnly'));
  }

  // get adminRoles from database
  const roleEntries: any[any] = await adminRole.getRoles();
  const roles: string[] = [];

  // create array with admin roles
  roleEntries.forEach((entry: any) => {
    roles.push(entry.roleId);
  });

  // check for permissions
  if (
    command.adminOnly &&
    !roles
      .map((role) => {
        return message.member.roles.cache.has(role);
      })
      .includes(true)
  ) {
    return message.reply(translator.t('err_adminOnly'));
  }

  // get channels from database
  const enabledEntries: any[any] = await commandEnabledChannel.getChannels();
  const channels: string[] = [];
  enabledEntries.forEach((entry: any) => {
    channels.push(entry.channelId);
  });

  // check for channels that have commands enabled
  if (!channels.includes(message.channel.id)) return;

  // check for arguments
  if (command.args && !args.length) {
    let replyString = translator.t('err_noArg');
    if (command.usage) replyString += `\n ${translator.t('err_commandUsage')} \`${prefix}${command.name} ${command.usage}\``;
    return message.channel.send(replyString);
  } else {
    // clean arguments
    args.forEach((value: string, i: number) => {
      // checks for mention and skips it
      if (!value.startsWith('<@')) args[i] = value.replace(/[^[a-zA-Z0-9\x7f-\xff;_.:?!]/gi, '');
    });
  }

  // checks cooldowns for command and adds it
  if (!cooldowns.has(command.name)) cooldowns.set(command.name, new discord.Collection());

  // get current datetime and calculate cooldown
  const now = Date.now();
  const timestamps: any = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expiration = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expiration) {
      const timeLeft = (expiration - now) / 1000;
      return message.reply(translator.t('err_cmdTime', timeLeft.toFixed(1), command.name));
    }
  }
  // set cooldown and delete after time passed
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(translator.t('error'));
  }
}
