import * as discord from 'discord.js';
import * as config from '../../config.json';
import * as translator from './translator';
import * as adminRole from '../controlers/AdminRole.Controller';
import * as serverConfig from '../controlers/CustomConfig.Controller';

export function getXPForLevel(level:number):number {
    return Math.pow(level + 5, 2) * 20;
}

export function getLvlForXP(xp:number):number {
    let lvl = 1;
    while (this.getXPForLevel(lvl) < xp) {
        lvl++;
    }
    return lvl;
}

export async function addXpMessage(message:any){

}

export const cooldowns:any[any] = new Map();