import 'reflect-metadata';
import { CustomConfig } from '../entity/CustomConfig';
import { getRepository } from 'typeorm';

export async function getConfig(key: string) {
  return new Promise((resolve, reject) => {
    resolve(getRepository(CustomConfig).findOne({key}));
  });
}

export function addConfig(discordId: string, key: string, value: string, info: string) {
  // a
}
