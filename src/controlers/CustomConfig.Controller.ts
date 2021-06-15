import 'reflect-metadata';
import { CustomConfig } from '../entity/CustomConfig';
import { DeleteResult, getRepository } from "typeorm";

export async function getConfig(key: string) {
  return new Promise((resolve, reject) => {
    resolve(getRepository(CustomConfig).findOne({key}));
  });
}

export async function getFullConfig() {
  return new Promise((resolve, reject) => {
    resolve(getRepository(CustomConfig).find());
  });
}

export async function deleteConfig(key:string) {
  return new Promise((resolve, reject) => {
    getRepository(CustomConfig).delete({key}).then((entry:DeleteResult) => {
      resolve(DeleteResult)
    }).catch((err:any) => {
      reject('Key does not exist.')
    })
  });
}

export function addConfig(discordId: string, key: string, value: string, info: string) {
  return new Promise( async(resolve, reject) => {
    const isKnown = await getRepository(CustomConfig).findOne({key});
    if(!isKnown){
      const config = new CustomConfig();
      config.discordId = discordId;
      config.key = key;
      config.value = value;
      config.info = info;
      resolve(getRepository(CustomConfig).save(config).catch((error:any)=>{return error;}))
    } else {
      reject('Key is already known.')
    }
  });
}

export function updateConfig(discordId: string, key: string, value: string, info: string) {
  return new Promise( async(resolve, reject) => {
    const config = await getRepository(CustomConfig).findOne({key});
    if(config){
      config.discordId = discordId;
      config.key = key;
      config.value = value;
      config.info = info;
      resolve(getRepository(CustomConfig).save(config).catch((error:any)=>{return error;}))
    } else {
      reject('This Key does not exist.')
    }
  });
}
