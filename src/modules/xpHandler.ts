import * as discord from 'discord.js';
import * as config from '../../config.json';
import * as translator from './translator';
import * as userController from '../controlers/User.Controller';

const messageXPAmountMax = 20; // orig val 20
const messageXPAmountMin = 10; // orig val 10
const messageXPCooldown = 0; // orig val 60

export function getXPForLevel(level: number): number {
  return Math.pow(level + 5, 2) * 20;
}

export function getLvlForXP(xp: number): number {
  let lvl = 1;
  while (this.getXPForLevel(lvl) < xp) {
    lvl++;
  }
  return lvl;
}

export function addXpMessage(message: any) {
  if (!cooldowns.has(message.author.id) || Date.now() > cooldowns.get(message.author.id)) {
    userController.addXpUser(message, Math.floor(Math.random() * (messageXPAmountMax - messageXPAmountMin + 1)) + messageXPAmountMin);
    cooldowns.set(message.author.id, Date.now() + messageXPCooldown * 1000);
  }
}

export const cooldowns: any[any] = new Map();
