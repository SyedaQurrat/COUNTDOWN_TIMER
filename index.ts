#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

console.log( "<<","=".repeat(15), "*".repeat(20) ,"=".repeat(15), ">>");
console.log(chalk.bold.italic.green("\t \t WELCOME TO COUNTDOWN TIMER"));
console.log( "<<","=".repeat(15), "*".repeat(20) ,"=".repeat(15), ">>");

const response = await inquirer.prompt({
  name: "userinput",
  type: "number",
  message: "Enter the amount of seconds",
  validate: (input) => {
    if (isNaN(input)) {
      return "Please enter a number";
    } else if (input > 60) {
      return "Please enter a number less than or equal to 60";
    } else {
      return true;
    }
  }
});

let input = response.userinput;

function startTime(value : number ) {
  const endTime = new Date().getTime() + value * 1000;

  const interval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeDiff = Math.floor((endTime - currentTime) / 1000);

    if (timeDiff <= 0) {
      console.log(chalk.red("Timer has expired"));
      clearInterval(interval);
      return;
    }

    const min = Math.floor(timeDiff / 60);
    const sec = timeDiff % 60;

    console.log(`${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`);
  }, 1000);
}

startTime(input);
