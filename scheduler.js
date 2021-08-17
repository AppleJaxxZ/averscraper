const { CronJob } = require("cron");
const scrapedSchedule = require("./scraper");

console.log("Scheduler Started...");
const fetchTestingTimes = new CronJob("2 9 * * *", async () => {
  console.log("Fetching testing info....");
  await scrapedSchedule.App();
});

fetchTestingTimes.start();
