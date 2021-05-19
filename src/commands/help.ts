import * as config from '../../config.json';
export const name:string = 'help'
export const description:string = 'Übersicht der Befehle';
export const aliases:string[] = ['commands', '?'];
export const usage:string[] = ['CommandName'];
export const args:boolean = true;
export const guildOnly:boolean = true;
export const adminOnly:boolean = false;
export const cooldown:number = 5;
export function execute(message:any, args: any[]){
    // todo: add translation
    // todo: add embed
    const data:any[any] = [];
    const { commands } = message.client;
    if(!args){
        data.push('Liste mit Befehlen: ');
        data.push(commands.map((command:any) => command.name).join(', '));
        data.push(`\n mach das für mehr infos -> \`${config.discord.prefix}help commandName\` über andere Befehle`);

        return message.author.send(data, {split:true}).then(()=> {
            if(message.channel.type === 'dm') return;
            message.reply('Ich habe dir eine DM mit allen Befehlen geschickt!');
        }).catch((error:any) => {
            console.error(`Ich konnte dem User  ${message.author.tag} keine help DM schicken.\n`, error);
            message.reply('Ich kann dir leider keine Privaten Nachrichten schicken überprüfe deine Einstellungen.');
        });
    }
    const name = args[0].toLowerCase();
    const command = commands.get(name) || commands.find((c:any) => c.aliases && c.aliases.includes(name));

    if (!command) return message.reply('Kenn ich nicht du bastard.');

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
    if (command.description) data.push(`**Beschreibung:** ${command.description}`);
    if (command.usage) data.push(`**verwendung:** ${config.discord.prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });

}