import 'reflect-metadata';
import { CommandEnabledChannel } from '../entity/CommandEnabledChannel';
import { getRepository } from "typeorm";

export function getChannels() {
  return new Promise((resolve, reject) => {
    resolve(getRepository(CommandEnabledChannel).find())
  });
}

export function addChannels(discordId: string, channelId: string) {
  // a
}

export function addChannelsBulk(discordId: string, channelId: string[]) {
  // a
}
