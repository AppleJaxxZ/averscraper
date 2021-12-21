// const { CronJob } = require("cron");
const { scraper } = require("./scraper");

// console.log("Scheduler Started...");
// const fetchTestingTimes = new CronJob("*/5 * 4 * *", async () => {
//   console.log("Fetchhhhhhhhhhh..");
//   await scrapedSchedule.App();
// });

// fetchTestingTimes.start();

scraper("2520228", "09/10/1987", "14846579287");

scraper("3729564", "10/02/1989", "14848282651");

scraper("5312595", "08/29/1986", "14846800976");

scraper("6306574", "10/29/1982", "16106743998");

scraper("7657179", "07/05/1990", "15702021509");

scraper("5090314", "07/05/1985", "16103336159");
