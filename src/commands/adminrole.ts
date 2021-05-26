import * as AdminRoleController from '../controlers/AdminRole.Controller';
import * as _ from 'lodash';
import * as discord from 'discord.js';
import * as translator from '../modules/translator';
import * as moment from 'moment';
import { bulkAddRole } from '../controlers/AdminRole.Controller';
export const name: string = 'adminrole';
export const usage: string[] = ['(<add> <list> <remove>) <roleId> <roleId> <roleId>'];
export const args: boolean = true;
export const guildOnly: boolean = true;
export const adminOnly: boolean = true;
export const cooldown: number = 5;
export async function execute(message: any, args: any[]) {
  // todo: add embed
  // todo: add translation
  if (args[0] === 'add') {
    // filter args for roleIds
    const roleIds = _.filter(args, (o) => {
      return /^\d{18}$/.test(o) && message.guild.roles.resolve(o) !== null;
    });
    if (roleIds.length === 1) {
      // single insert
      AdminRoleController.addRole(message.author.id, roleIds[0])
        .then((result) => {
          const roleInfo = message.guild.roles.resolve(roleIds[0]);
          return message.channel.send(`Die Rolle "${roleInfo.name}" mit der ID: ${roleInfo.id} wurde als Adminrolle hinzugefügt.`);
        })
        .catch((reason) => {
          return message.channel.send(reason);
        });
    } else if (roleIds.length > 1) {
      AdminRoleController.bulkAddRole(message.author.id, roleIds)
      return message.channel.send('Die Rollen wurden eingefügt.');
    } else {
      return message.channel.send('Dude, where the roles at ????');
    }
  }
  if (args[0] === 'list') {
    const databaseRoles: any[any] = await AdminRoleController.getRoles();
    const adminRoles = databaseRoles.map((a: any) => a.roleId);
    const discordRoles = await message.guild.roles.cache.filter((role: any) => {
      return adminRoles.includes(role.id);
    });
    const textArr = await discordRoles.map((role: any) => `${role.id} - <@&${role.id}>`);

    const embed = new discord.MessageEmbed()
      .setColor(0x42aaf4)
      .setTitle(':small_orange_diamond: Adminroles :small_orange_diamond:') // todo: add translation
      .setTimestamp()
      .setThumbnail(message.guild.iconURL())
      .setDescription(textArr.join('\n'));
    // return message.channel.send(textArr, { split: true });
    return message.channel.send({ embed });
  }
  if (args[0] === 'remove') {
    // filter args for roleIds
    const roleIds = _.filter(args, (o) => {
      return /^\d{18}$/.test(o) && message.guild.roles.resolve(o) !== null;
    });
    if (roleIds.length === 1) {
      // single insert
      AdminRoleController.deleteRole(roleIds[0])
        .then((result: any) => {
          if (result.affected > 0) {
            const roleInfo = message.guild.roles.resolve(roleIds[0]);
            return message.channel.send(`Die Rolle "${roleInfo.name}" mit der ID: ${roleInfo.id} wurde als Adminrolle entfernt.`);
          } else return message.channel.send(':x: Not an AdminRole.');
        })
        .catch((reason) => {
          return message.channel.send(reason);
        });
    } else if (roleIds.length > 1) {
      AdminRoleController.bulkDeleteRole(roleIds)
      return message.channel.send('Die Rollen wurden gelöscht.');
    } else {
      return message.channel.send('Dude, where the roles at ????');
    }
  }
}
