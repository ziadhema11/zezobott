const { MessageEmbed } = require('discord.js');
require('discord-reply');
const { ping, Other } = require("../../src/utils/Constants.js").bot.emojis;
const { support, Dashboard, invite, devs } = require("../../src/utils/Constants.js").bot;
module.exports.run = async (message, args, client) => {
  if (!devs.includes(message.author.id)) return;
  let i0 = 0;
  let i1 = 10;
  let page = 1;

  let description =
    `Total Servers - ${client.guilds.cache.size}\n\n` +
    client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map(r => r).map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`).slice(0, 10).join("\n\n");

  let embed = new MessageEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setFooter(`Page - ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
    .setDescription(description);

  let msg = await message.channel.send(embed);

  await msg.react("⬅");
  await msg.react("➡");
  await msg.react("❌");

  let collector = msg.createReactionCollector(
    (reaction, user) => user.id === message.author.id
  );

  collector.on("collect", async (reaction, user) => {
    if (reaction._emoji.name === "⬅") {

      i0 = i0 - 10;
      i1 = i1 - 10;
      page = page - 1;


      if (i0 + 1 < 0) {
        console.log(i0)
        return msg.delete();
      }
      if (!i0 || !i1) {
        return msg.delete();
      }

      description =
        `Total Servers - ${client.guilds.cache.size}\n\n` +
        client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map(
            (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
          .slice(i0, i1)
          .join("\n\n");


      embed
        .setFooter(
          `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
        )
        .setDescription(description);


      msg.edit(embed);
    }

    if (reaction._emoji.name === "➡") {

      i0 = i0 + 10;
      i1 = i1 + 10;
      page = page + 1;


      if (i1 > client.guilds.cache.size + 10) {
        return msg.delete();
      }
      if (!i0 || !i1) {
        return msg.delete();
      }

      description =
        `Total Servers - ${client.guilds.cache.size}\n\n` +
        client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map(
            (r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
          .slice(i0, i1)
          .join("\n\n");


      embed
        .setFooter(
          `Page - ${page}/${Math.round(client.guilds.cache.size / 10 + 1)}`
        )
        .setDescription(description);


      msg.edit(embed);
    }

    if (reaction._emoji.name === "❌") {
      return msg.delete();
    }


    await reaction.users.remove(message.author.id);
  });

}

module.exports.help = {
  name: 'top-servers',
  cooldown: 10
}
module.exports.options = {
  owner: true
};