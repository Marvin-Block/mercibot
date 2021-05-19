import 'reflect-metadata';
import { AdminRole } from '../entity/AdminRole';
import {  getRepository } from "typeorm";


export function getRoles() {
  return new Promise((resolve, reject) => {
    resolve(getRepository(AdminRole).find())
  });
}

export function addRole(discordId: string, roleId: string) {
  return new Promise((resolve, reject) => {
    const role = new AdminRole();
    role.discordId = discordId;
    role.roleId = roleId;
    resolve(getRepository(AdminRole).save(role).catch((error:any) => {return error.stack}));
  });
}

export function deleteRole(roleId: string) {
  return new Promise((resolve, reject) => {
    resolve(getRepository(AdminRole).delete({roleId: roleId}))
  });
}