export const name:string = 'ping'
export const description:string = 'Ping!'
export const usage:string = '';
export const guildOnly:boolean = true;
export const adminOnly:boolean = false;
export const cooldown:number = 5;
export function execute(message:any){
  message.channel.send('Pong!');
}