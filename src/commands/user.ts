import { getUser } from '../controlers/User.Controller';
export const name: string = 'user';
export const guildOnly: boolean = true;
export const adminOnly: boolean = false;
export const channelRestricted: boolean = false;
export const cooldown: number = 0;
export async function execute(message: any) {
  const user:any = await getUser('268055000536580099')
  const discordUser = await message.guild.members.fetch('268055000536580099')
  console.log(user, discordUser)
}
