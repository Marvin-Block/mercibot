import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { CommandEnabledChannel } from '../entity/CommandEnabledChannel';

export function getChannels() {
  return new Promise((resolve, reject) => {
    createConnection().then(async (connection) => {
      const commandEnabledChannelRepository = connection.getRepository(CommandEnabledChannel);
      const channels = await commandEnabledChannelRepository.find();
      resolve(channels);
    });
  });
}

export function setChannels(channelId: string, discordId: string) {
  // a
}

export function setChannelsBulk(channelId: string, discordId: string[]) {
  // a
}
