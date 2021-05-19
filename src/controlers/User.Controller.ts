import 'reflect-metadata';
import { User } from '../entity/User';
import { getRepository } from "typeorm";


export function getUsers() {
    return new Promise((resolve, reject) => {
        resolve(getRepository(User).find());
    });
}

export function addUser(discordId: string, ...args:any[]) {
    // a
}

export function addXpUser(message:any, xp:number){
    // a
}

export function getUserList(amount:number){
    // a
}

export function getUserStats(discordId:string){
    return new Promise((resolve, reject) => {
        resolve(getRepository(User).findOne(discordId));
    });
}
