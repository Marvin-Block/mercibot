import 'reflect-metadata';
import { AdminRole } from '../entity/AdminRole';
import {  getRepository } from "typeorm";


export function getRoles() {
  return new Promise((resolve) => {
    resolve(getRepository(AdminRole).find({select:['roleId']}))
  });
}

export function getRole(roleId:string){
  return new Promise((resolve) => {
    resolve(getRepository(AdminRole).findOne({roleId:roleId}))
  });
}

export function addRole(discordId: string, roleId: string) {
  return new Promise( async (resolve, reject) => {
    const role = new AdminRole();
    role.discordId = discordId;
    role.roleId = roleId;
    const isKnown = await getRole(role.roleId);
    if(!isKnown){
      resolve(getRepository(AdminRole).save(role).catch((error:any) => {return error}));
    }
    else {
      reject('Role `' + role.roleId + '` is already an admin role')
    }
  });
}

export function deleteRole(roleId: string) {
  return new Promise((resolve, reject) => {
    resolve(getRepository(AdminRole).delete({roleId: roleId}))
  });
}