const { CronJob } = require("cron");
const scrapedSchedule = require("./scraper");

console.log("Scheduler Started...");
const fetchTestingTimes = new CronJob("*/5 * 4 * *", async () => {
  console.log("Fetchhhhhh..");
  await scrapedSchedule.App();
});

fetchTestingTimes.start();
