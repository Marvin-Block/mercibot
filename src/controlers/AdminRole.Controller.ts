import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { AdminRole } from '../entity/AdminRole';

export function getRoles() {
  return new Promise((resolve, reject) => {
    createConnection().then(async (connection) => {
      const adminRoleRepository = connection.getRepository(AdminRole);
      const adminRoles = await adminRoleRepository.find();
      resolve(adminRoles);
    });
  });
}

export function setRole(roleId: string, discordId: string) {
  // a
}

export function setRoleBulk(roleId: string, discordId: string[]) {
  // a
}
