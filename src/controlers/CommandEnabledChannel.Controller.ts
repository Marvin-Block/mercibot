import 'reflect-metadata';
import { CommandEnabledChannel } from '../entity/CommandEnabledChannel';
import { getConnection } from "typeorm";

export function getChannels() {
  return new Promise((resolve, reject) => {
    const channels = getConnection().manager.find(CommandEnabledChannel);
    resolve(channels);
  });
}

export function setChannels(channelId: string, discordId: string) {
  // a
}

export function setChannelsBulk(channelId: string, discordId: string[]) {
  // a
}
