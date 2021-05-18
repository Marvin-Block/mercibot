# Mercibot
## Administrative Economy Discord Bot

[comment]: <> ([![CodeFactor]&#40;https://www.codefactor.io/repository/github/xcrashsystemx/otaku-treffpunkt-re/badge?s=98b0ae6f2011ec863845f5219dde0daa9ccfb71b&#41;]&#40;https://www.codefactor.io/repository/github/xcrashsystemx/otaku-treffpunkt-re&#41;)

## Features:
* Commands with Handler
* Full Level system (Needs DB - Migrations from Laravel Project)
* Reaction Role assigner
* ...

[comment]: <> ([Roadmap]&#40;&#41;)

## Commandhandler usage:
```javascript
name: 'help',// name of the command
description: 'Übersicht aller Befehle oder zu Infos zu einem bestimmten Befehl.',// Short description for help command
alisases: ['commands'], // aliases
usage: ['command name'], // Usage hint for example when a argument is needed
cooldown: 5, //cooldown for the command when not declarced = 3 seconds
guildOnly: true,// Command is only available in Guilds not in DMs when not declard = false
args: true, //if command has extra agruments like !mute 10
adminOnly: true, //command is only for admins/mods
execute(message) {
	message.channel.send('Pong.');// example
...
```

[comment]: <> (## Download and Installation)

[comment]: <> (To begin using this bot, choose one of the following options to get started:)

[comment]: <> (* Clone the repo: `git clone https://github.com/xCrashsystemx/Otaku-Treffpunkt-Re.git`)

[comment]: <> (* npm install)

[comment]: <> (* php artisan migrate &#40;in Laravel Project&#41;)

[comment]: <> (Help: [Fork, Clone, or Download on GitHub]&#40;https://github.com/xCrashsystemx/Otaku-Treffpunkt-Re&#41;)


[comment]: <> (## Bugs and Issues)

[comment]: <> (Have a bug or an issue with this template? [Open a new issue]&#40;https://github.com/xCrashsystemx/Otaku-Treffpunkt-Re/issues&#41; here on GitHub or leave a comment on the [Bot Overview]&#40;https://github.com/xCrashsystemx/Otaku-Treffpunkt-Re&#41;.)

## About

#### Frameworks and Languages used:
* [Eslint](https://eslint.org/docs/rules/)
* [Jimp](https://www.npmjs.com/package/jimp)
* [MySql](https://www.npmjs.com/package/mysql2)
* [sequelize](https://sequelize.org/)
* [NodeJS](https://nodejs.org/en/)
* [DiscordJS](https://discord.js.org/#/)
* [Good entry point for DiscordJS](https://discordjs.guide/)
* JavaScript

#### Contact:
Discord: Muffin#4222
