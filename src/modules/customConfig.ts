import * as translator from '../modules/translator';
import * as customImages from '../modules/customImages';
import * as discord from 'discord.js';
import { getAmountUsers } from '../controlers/User.Controller';
import * as customConfig from '../controlers/CustomConfig.Controller';
import { Collection, DMChannel, Guild, GuildChannel, GuildMember, Message, Snowflake } from 'discord.js';
import { channel } from 'diagnostic_channel';
const mandatoryConfig = [
  {
    key: 'botOwner',
    value: '322659763643088897',
    info: 'Bot Owner Discord ID',
    type: 'UserID'
  },
  {
    key: 'welcomeChannel',
    value: '',
    info: 'Channel for welcome messages',
    type: 'ChannelID'
  },
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
    key: 'counterChannel',
    value: '',
    info: 'Channel ID to display member counter',
    type: 'ChannelID'
  },
  {
    key: 'locale',
    value: 'de-DE',
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
  const guild: Guild = await client.guilds.cache.first();
  const ownerID: string = guild.ownerID;
  const ownerGuildMember: GuildMember = await guild.members.fetch(ownerID);
  const channelDM: DMChannel = await ownerGuildMember.createDM();
  const filter = (m: Message) => m.author.id === ownerID;

  // get full config from database
  const configList: any[any] = await customConfig.getFullConfig();

  // compare mandatory config with databse config and return missing config items
  const missingConfig: string[] = mandatoryConfig.map( ( x: any ) => x.key).filter( ( e: any ) => {return !configList.map((x: any) => x.key).includes(e)});

  // filter and save default values
  const defaultConfig: string[] = missingConfig.filter( (e: string) => mandatoryConfig.map((a:any) => a.value !== ''))
  console.log(defaultConfig)

  // create multipage embed for missing entries
  // example command in

  // mandatoryConfig.forEach((entry: any) => {
  //   if (!entry.value) {
  //     channelDM.send(`Please enter a value for the Key:\n> ${entry.key} {${entry.type}} \nInfo: ${entry.info}`);
  //     const collector = channelDM.createMessageCollector(filter, { time: 150000 });
  //   }
  // });
}
