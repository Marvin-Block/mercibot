import 'reflect-metadata';
import { ModRole } from '../entity/ModRole';
import { getRepository } from 'typeorm';

export function getRoles() {
  return new Promise((resolve) => {
    resolve(getRepository(ModRole).find({ select: ['roleId'] }));
  });
}

export function getRole(roleId: string) {
  return new Promise((resolve) => {
    resolve(getRepository(ModRole).findOne({ roleId }));
  });
}

export function addRole(discordId: string, roleId: string) {
  return new Promise(async (resolve, reject) => {
    const role = new ModRole();
    role.discordId = discordId;
    role.roleId = roleId;
    const isKnown = await getRole(role.roleId);
    if (!isKnown) {
      resolve(
        getRepository(ModRole)
          .save(role)
          .catch((error: any) => {
            return error;
          })
      );
    } else {
      reject('Role `' + role.roleId + '` is already an admin role');
    }
  });
}

export function bulkAddRole(discordId: string, roleIds: string[]) {
  roleIds.forEach((roleId) => {
    const role = new ModRole();
    role.discordId = discordId;
    role.roleId = roleId;
    getRepository(ModRole)
      .findOne({ roleId })
      .then((knownRole: any) => {
        if (!knownRole) {
          getRepository(ModRole)
            .save(role)
            .catch((error: any) => {
              return error;
            });
        }
      });
  });
}

export function deleteRole(roleId: string) {
  return new Promise((resolve, reject) => {
    resolve(getRepository(ModRole).delete({ roleId }));
  });
}

export function bulkDeleteRole(roleIds: string[]) {
  // getRepository(AdminRole).delete({ roleId })
  roleIds.forEach((roleId) => {
    getRepository(ModRole).delete({ roleId })
  });
}
