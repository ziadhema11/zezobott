const Discord = require('discord.js');

module.exports.bot = {
supportid: '1003696006770208849',
  emojis: {
    "err": "🙄",
    "done": "✅",
    "ping":"<:DolahBotnetwork:885209222051143740>",
    "other":"<:DolahBotOther:884132163665133609>",
    "bank": ":bank:",
    "cash": "<:wallet:887982626550464514>",
    "total": "",
    "Ministry": "",
    "user": "",// العضو
    "admin": "",//الي حول له
    "open": "",//رقم العمليه
    "pay": "<:transferDolahBot:887982591779676200>",//تحويل
    "info": "",//نوع العمليه
    "log": ""//لوق
  },
  logs: {
  premium: "1003696006770208849"
  },
  support: "https://discord.gg/rdHVty98rJ",
  Dashboard: "https://zezobott.herokuapp.com/",
  invite: "https://discord.com/api/oauth2/authorize?client_id=940378366635290656&permissions=8&redirect_uri=https%3A%2F%2Fpro-system.ml%2Fauth&response_type=code&scope=bot%20identify",
  devs:["910482674915885077"],
  token: process.env.token,
  prefix: '1',
  defaultLanguage: 'en',
  blacklistUsers: ['713207310121435187','467394732042092544']
}

exports.Website = {
  clientUser: {
    secret: "fpbVms00Q84IjCL7dY-5DDYCmD10kpcb",
    scopes: ["guilds", "identify"]
  },
  Websocket: {
    port: process.env.PORT || 3000,
    redirectURI: 'https://zezobott.herokuapp.com/'
  },
  toggle: true,
  checkAuth(req, res, next) {
    if (!req.session.user) return res.redirect('/login');

    return next();
  },
  formatIcon(id, icon, client) {
    if (!icon) return 'https://cdn.discordapp.com/emojis/853049496618139670.gif?v=1';
    let rest = client.rest;
    try {
      return rest.cdn.Icon(id, icon, {}, 2048, true)
    } catch {
      return 'https://cdn.discordapp.com/icons/' + id + '/' + icon + '.png?size=2048';
    }
  },
  Permissions(bitfield) {
    return new Discord.Permissions(bitfield).has("ADMINISTRATOR");
  }
}

module.exports.checkPremium = function checkPremium(client, premium, message) {
  if (premium) return true;

  const premiums = client.database('premiumData', 'premdata', {
    bots: [],
    toggle: true
  }, !0);
  
  const data = premiums.get;
  data.bots = data.bots || [];
  let find = data.bots.filter(e => e.guildID == message.guild.id)[0];
  let guild = message.guild;
  if (!find) return true;
 
  return !guild.members.cache.get(find.clientID);
  
}
