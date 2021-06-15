import chalk from 'chalk';
import * as config from '../../config.json';
import * as discord from 'discord.js';
import * as customConfig from '../controlers/CustomConfig.Controller';
import {Client, DMChannel, Guild, GuildMember, Message} from "discord.js";
const mandatoryConfig = [
  {
    key: 'messageXPAmountMin',
    value: '10',
    info: 'Minimum xp per message',
    type: 'Number less than messageXPAmountMax. Not below 0'
  },
  {
    key: 'messageXPAmountMax',
    value: '20',
    info: 'Maximum xp per message',
    type: 'Number bigger than messageXPAmountMin'
  },
  {
    key: 'messageXPCooldown',
    value: '10',
    info: 'Cooldown for xp gain in seconds',
    type: 'Number bigger or equal 0'
  },
  {
    key: 'locale',
    value: config.locale,
    info: 'Language for command translation',
    type: 'Locale format (de-DE / en_US / en_UK)'
  },
  {
    key: 'prefix',
    value: '~',
    info: 'Command prefix for bot',
    type: 'Any Character or text (~ / a! / ! / test~)'
  }
];

export async function init(client: any) {
  // get full config from database
  let configList: any[any] = await customConfig.getFullConfig();

  // automatically set certain configs. Can be changed.
  mandatoryConfig.forEach((custConfig:any) => {
    if(!configList.map( (x:any) => x.key).includes(custConfig.key)) {
      customConfig.addConfig(config.discord.botOwner, custConfig.key, custConfig.value, custConfig.info);
    }
  })

  await loadConfig(client);
}

export async function loadConfig(client: any) {
  client.customConfig = new discord.Collection();
  // re-read config and add it to client
  const configList: any[any] = await customConfig.getFullConfig();
  console.log(chalk.redBright('Loading custom config...'));
  configList.forEach((config:any) => {
    client.customConfig.set(config.key, config)
    console.log(`Loading: "${chalk.blueBright('Custom config - ' + config.key)}"`);
  })
}