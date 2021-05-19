import 'reflect-metadata';
import { AdminRole } from '../entity/AdminRole';
import { getConnection } from "typeorm";


export function getRoles() {
  return new Promise((resolve, reject) => {
    const adminRoles = getConnection().manager.find(AdminRole);
    resolve(adminRoles);
  });
}

export function setRole(roleId: string, discordId: string) {
  // a
}

export function setRoleBulk(roleId: string, discordId: string[]) {
  // a
}
