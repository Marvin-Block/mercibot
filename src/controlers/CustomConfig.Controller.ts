import 'reflect-metadata';
import { CustomConfig } from '../entity/CustomConfig';
import { getRepository } from "typeorm";


export function getConfig() {
    return new Promise((resolve, reject) => {
        resolve(getRepository(CustomConfig).find());
    });
}

export function addConfig(discordId: string, key:string, value:string, info:string) {
    // a
}

export function addRoleBulk(discordId: string, key:string[], value:string[], info:string[]) {
    // a
}
