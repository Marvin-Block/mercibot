import * as xpHandler from '../modules/xpHandler';
import { getUser } from '../controlers/User.Controller';
import * as discord from 'discord.js';
import {sendLevelUp, sendWelcome} from "../modules/customImages";
export const name: string = 'debug';
export const guildOnly: boolean = true;
export const adminOnly: boolean = false;
export const channelRestricted: boolean = false;
export const cooldown: number = 1;
export async function execute(message: any) {
  sendLevelUp(message, 2)
  sendWelcome(message.member)
}
