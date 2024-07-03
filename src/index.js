const { Client, IntentsBitField } = require("discord.js");
const botToken = process.env["token"];

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});

//method for when a user deletes a message sending the funny haha gif lmao
client.on("messageDelete", (msg) => {
  const username = msg.author.username;
  const content = msg.content;
  const userID = msg.author.id;
  const botUsername = client.user.username;
  const channel = msg.channel;

  console.log("Message deleted by " + msg.author.username);
  console.log("Message content: " + msg.content);

  channel.send(
    "https://tenor.com/view/i-saw-w-gus-fring-gus-gustavo-deleted-gif-25440636",
  );
});

//social credits system
//as well as checking for when a user sends a message
const socialCredits = {};

client.on("messageCreate", (msg) => {
  //statements that will increase the social credit score

  const goodWords = [
    "love china",
    "west has fallen",
    "chairman mao",
    "china is great",
    "china is the best",
    "china is the greatest",
    "China is awesome",
    "China is fantastic",
    "China is amazing",
    "China is superb",
    "China is excellent",
    "China is phenomenal",
    "China is outstanding",
    "China is marvelous",
    "China is splendid",
    "China is magnificent",
    "china is sweet",
    "china fucks",
  ];

  //statments that will decrease the social credit score
  const badWords = [
    "hate china",
    "west will rise",
    "america",
    "i hate China",
    "i despise China",
    "China is terrible",
    "China is awful",
    "China is bad",
    "China is horrible",
    "China is disgusting",
    "China is repulsive",
    "i can't stand China",
    "I detest China",
  ];

  const user = msg.author;
  const botUsername = client.user.username;
  let credits = socialCredits[user.id] || 0;
  const username = msg.author.username;

  //check the user's social credit score
  if (msg.content === "!socialcredit") {
    msg.reply("你有 " + credits + " SOCIAL CREDITS!!");
  }

  //increasing social credit
  if (goodWords.some((goodWords) => msg.content.includes(goodWords))) {
    credits += 10000;
    socialCredits[user.id] = credits;
    msg.reply(
      `+10000 SOCIAL CREDITS!! 現在你的信用為 ${socialCredits[user.id]} 點`,
    );
  }

  //decreasing social credit
  if (badWords.some((badWords) => msg.content.includes(badWords))) {
    credits -= 10000;
    socialCredits[user.id] = credits;
    msg.reply(
      `-10000 SOCIAL CREDITS!! 現在你的信用為 ${socialCredits[user.id]} 點`,
    );
  }

  //resetting if the dreaded year 1989 is used
  if (msg.content.includes("1989") && username != botUsername) {
    msg.reply("不要討論任何有關 1989 年的事情, CREDIT SCORE RESET!!!");
    credits = 0;
    socialCredits[user.id] = credits;
  }

  //help command
  if (msg.content === "!help") {
    msg.reply(
      "I AM CHAIRMAN MAO, GLORY BE TO CHINA\n ANYTHING AGAINST THE STATE IS A CRIME AND WILL RESULT IN A DEDUCTION OF SOCIAL CREDITS\n GOOD BEHAVIOR WILL BE REWARDED. \n !socialcredit: to check your social credit score",
    );
  }
});

client.login(botToken);
