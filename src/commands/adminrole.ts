import * as AdminRoleController from '../controlers/AdminRole.Controller';
export const name:string = 'adminrole'
export const description:string = '';
export const aliases:string[] = [''];
export const usage:string[] = ['add roleId'];
export const args:boolean = true;
export const guildOnly:boolean = true;
export const adminOnly:boolean = true;
export const cooldown:number = 5;
export async function execute(message:any, args: any[]){
    const roleId:string = '389834269884809226';
    if(args[0] === 'add') {
        const test = await AdminRoleController.addRole(message.author.id, roleId);
        console.log(test);
    }
    if(args[0] === 'list') {
        let test = await AdminRoleController.getRoles();
        test = JSON.stringify(test);
        console.log(test);
    }
    if(args[0] === 'delete') {
        const test = await AdminRoleController.deleteRole(roleId);
        console.log(test)
    }
    message.reply(':ok_hand:');
}