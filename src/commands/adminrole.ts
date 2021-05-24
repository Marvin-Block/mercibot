import * as AdminRoleController from '../controlers/AdminRole.Controller';
import * as _ from 'lodash';
export const name:string = 'adminrole'
export const description:string = '';
export const aliases:string[] = [''];
export const usage:string[] = ['(<add> <list> <remove>) <@role>'];
export const args:boolean = true;
export const guildOnly:boolean = true;
export const adminOnly:boolean = true;
export const cooldown:number = 5;
export async function execute(message:any, args: any[]){
    if(args[0] === 'add') {
        const roles = message.mentions.roles
        if(roles.length > 0){
            // do mention work
        }
        else {
            // filter args for roleIds
            const roleIds = _.filter(args, (o) => {return /^\d{18}$/.test(o) && message.guild.roles.resolve(o) !== null})
            if(roleIds.length === 1){
                // single insert
                AdminRoleController.addRole(message.author.id, roleIds[0]).then((result) => {
                    return message.channel.send(':ok_hand: added.');
                }).catch((reason => {
                    return message.channel.send(reason)
                }))
            }
            else if(roleIds.length > 1) {
                // bulk insert
                return message.channel.send(':wheelchair: work in progress');
            }
            else {
                return message.channel.send('Dude, where the roles at ????')
            }
        }
    }
    if(args[0] === 'list') {
        let databaseRoles:any[any] = await AdminRoleController.getRoles();
        let adminRoles = databaseRoles.map( (a:any) => a.roleId);
        let discordRoles = await message.guild.roles.cache.filter((role:any) => {return adminRoles.includes(role.id)});
        let textArr = await discordRoles.map((role:any) => `${role.id} - ${role.name}`);
        return message.channel.send(textArr,{split:true});
    }
    if(args[0] === 'remove') {
        const roles = message.mentions.roles
        if(roles.length > 0){
            // do mention work
            return message.channel.send(':wheelchair: work in progress');
        }
        else {
            // filter args for roleIds
            const roleIds = _.filter(args, (o) => {return /^\d{18}$/.test(o) && message.guild.roles.resolve(o) !== null})
            if(roleIds.length === 1){
                // single insert
                AdminRoleController.deleteRole(roleIds[0]).then((result:any) => {
                    if(result.affected > 0)
                        return message.channel.send(':ok_hand: removed.');
                    else
                        return message.channel.send(':x: Not an AdminRole.');
                }).catch((reason => {
                    return message.channel.send(reason)
                }))
            }
            else if(roleIds.length > 1) {
                // bulk insert
                return message.channel.send(':wheelchair: work in progress');
            }
            else {
                return message.channel.send('Dude, where the roles at ????')
            }
        }
    }
}