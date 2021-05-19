import 'reflect-metadata';
import { AdminRole } from '../entity/AdminRole';
import {  getRepository } from "typeorm";


export function getRoles() {
  return new Promise((resolve, reject) => {
    resolve(getRepository(AdminRole).find())
  });
}

export function addRole(discordId: string, roleId: string) {
  // a
}

export function addRoleBulk(discordId: string, roleId: string[]) {
  // a
}