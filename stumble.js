const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const request = require("@i-scrapper/plugins-request");

const questions = [
    {
        type: "input",
        name: "authorization",
        message: color("Authorization keys:"),
        prefix: `${color("[", "redBright")}+${color("]", "redBright")}`,
        suffix: "~",
        validate: function (input) {
            const done = this.async();
            if (!input) {
                done('You need to provide Authorization keys');
                return false;
            }
            let authParse;
            try {
                authParse = JSON.parse(input);
            } catch (error) {
                authParse = error.message;
            }
            if (typeof authParse != "object") {
                done("You need to provide Authorization keys as Object");
                return false;
            }
            return done(null, true);
        },
    },
    {
        type: "list",
        name: "round",
        message: color("Authorization keys taken at 'Round':"),
        prefix: `${color("[", "redBright")}+${color("]", "redBright")}`,
        suffix: "~",
        choices: ["Stage 1", "Stage 2", "Stage 3"],
        filter: (value) => {
            return {
                "Stage 1": 1,
                "Stage 2": 2,
                "Stage 3": 3,
            }[value];
        },
    },
    {
        type: "input",
        name: "interval",
        message: color("Interval Delay:"),
        prefix: `${color("[", "redBright")}+${color("]", "redBright")}`,
        suffix: "~",
        default: 1000,
        validate: function (input) {
            const done = this.async();
            if (input && isNaN(input)) {
                done('You need to provide a number');
                return false;
            }
            return done(null, true);
        },
    }
];

const asciiText = figlet.textSync("VIP NEW", {
    font: 'Graffiti',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 75,
    whitespaceBreak: true
});
console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalkRainbow(`\r[ ${moment().format('HH:mm:ss')} ] Auth Eror !`));

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

      console.log(chalkRainbow(`\r
-  [${moment().format('HH:mm:ss')}]  -
>  ${(`Negara By Lana : ${country}`)}
>  ${(`Nama By Lana : ${username}`)}  
>  ${(`Piala By Lana : ${trophy}`)}  
>  ${(`Mahkota By Lana : ${crown}`)}
>  ${(`Status : Success !`)}`));
      await sleep(6500);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Mampus Banned Makanya jangan brutal`));
      break;
    }
  }

})();
