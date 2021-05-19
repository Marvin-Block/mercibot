export const name:string = 'clear'
export const description:string = '';
export const aliases:string[] = ['purge'];
export const usage:string[] = ['@user amount', '@user', 'amount'];
export const args:boolean = true;
export const guildOnly:boolean = true;
export const adminOnly:boolean = true;
export const cooldown:number = 5;
export function execute(message:any, args: any[]){
  // todo: translation
  let amount = 0;
  const maxMessages = 100;
  const user = message.mentions.members.first();
  if(user)
    if(!args[1])
      amount = maxMessages;
    else
      amount = args[1];
  else
    amount = args[0];
  if(amount && !isNaN(amount)){
    if(amount >= 1 && amount <= maxMessages)
    {
      // amount = parseInt(amount);
      message.channel.messages.fetch({
        limit: 100,
      }).then((messages:any) => {
        if(user) {
          const filterBy = user.id;
          messages = messages.filter((m:any) => m.author.id === filterBy).first(amount);
        }
        else{
          messages = amount
        }
        message.channel.bulkDelete(messages).catch((error:any) => console.log(error.stack));
      });
    }
    else {
      return message.reply('Anzahl zwischen 1 und 100!');
    }
  }
  else {
    return message.reply('Bitte gültige Zahl angeben.');
  }
    
}