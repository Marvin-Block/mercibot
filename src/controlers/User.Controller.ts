import 'reflect-metadata';
import { User } from '../entity/User';
import { getRepository, getConnection, createQueryBuilder } from 'typeorm';
import * as xpHandler from '../modules/xpHandler';
import * as _ from 'lodash';

async function insertOrIgnore(entity: any, values: any) {
  const q: any = await getConnection().createQueryBuilder().insert().into(entity).values(values);
  const [sql, args] = q.getQueryAndParameters();
  const nsql: any = sql.replace('INSERT INTO', 'INSERT OR IGNORE INTO');
  return await getConnection().manager.query(nsql, args);
}

export function getUser(discordId: string) {
  return new Promise((resolve, reject) => {
    resolve(getRepository(User).findOne({ discordId }));
  });
}

export function getAmountUsers(amount: number) {
  return new Promise((resolve, reject) => {
    getRepository(User).createQueryBuilder('user').orderBy('user.xp', 'DESC').take(amount).getMany().then((users) => {
      resolve(users)
    });
  });
}

export function getUsers() {
  return new Promise((resolve, reject) => {
    resolve(getRepository(User).find());
  });
}

export function addUser(guildMember: any) {
  return new Promise((resolve) => {
    const user = new User();
    user.discordId = guildMember.id;
    user.name = escape(guildMember.user.username) + '#' + guildMember.user.discriminator;
    return resolve(getRepository(User).save(user));
  });
}

export function addXpUser(message: any, xp: number) {
  const userRepo = getRepository(User);
  userRepo.findOne({ discordId: message.author.id }).then((selectedUser: any) => {
    if (selectedUser) {
      const lvl = xpHandler.getLvlForXP(selectedUser.xp) !== selectedUser.level ? xpHandler.getLvlForXP(selectedUser.xp) : null;
      const nXp = selectedUser.xp + xp;
      const lvlUp = xpHandler.getLvlForXP(nXp) > xpHandler.getLvlForXP(selectedUser.xp);
      selectedUser.xp = nXp;
      selectedUser.level = xpHandler.getLvlForXP(selectedUser.xp);
      selectedUser.name = escape(message.author.username) + '#' + message.author.discriminator;
      userRepo.save(selectedUser);
      // if (xpHandler.getLvlForXP(nXp) > xpHandler.getLvlForXP(selectedUser.xp))
      // message.channel.send('LvL up oder so.')

      // const lvl = utils.getLvlForXP(result[0].exp) != result[0].level ? utils.getLvlForXP(result[0].exp) : null;
      // if(lvl) {
      //   sql = 'UPDATE users SET level = ' + lvl + ' WHERE discord_id =' + userId;
      //   Database.connection.query(sql, function(err) {
      //     if (err) throw err;
      //     customImages.sendLvlUp(message, lvl);
      //     sql = 'SELECT required_lvl,rank_id FROM ranks WHERE required_lvl<' + lvl + ' ORDER BY required_lvl desc';
      //     Database.connection.query(sql, function(err, results) {
      //       if (err) throw err;
      //       const roles = message.member.roles;
      //       for(let i = results.length - 1;i >= 0;i--) {
      //         const role = roles.cache.find(e => e.id === results[i].rank_id);
      //         if(role) {roles.remove(role);}
      //       }
      //       if(results.length > 0) {message.member.roles.add(results[0].rank_id.toString()).catch(console.error);}
      //     });
      //   });
      // }
    } else {
      const user = new User();
      user.discordId = message.author.id;
      user.name = escape(message.author.username) + '#' + message.author.discriminator;
      user.xp = 0;
      user.level = 0;
      const lvl = xpHandler.getLvlForXP(user.xp) !== user.level ? xpHandler.getLvlForXP(user.xp) : null;
      const nXp = user.xp + xp;
      const lvlUp = xpHandler.getLvlForXP(nXp) > xpHandler.getLvlForXP(user.xp);
      user.xp = nXp;
      user.level = xpHandler.getLvlForXP(user.xp);
      userRepo.save(user);
    }
  });
}

export function getUserList(amount: number) {
  // a
}

export function getUserStats(discordId: string) {
  return new Promise((resolve, reject) => {
    resolve(getRepository(User).findOne(discordId));
  });
}
