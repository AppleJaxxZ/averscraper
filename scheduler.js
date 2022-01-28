
const { scraper } = require("./scraper");



function scrapeAll() {
  scraper("2520228", "09/10/1987", "14846579287");

  setTimeout(() => {
    scraper("3729564", "10/02/1989", "14848282651");
  }, 3000);

  setTimeout(() => {
    scraper("5312595", "08/29/1986", "14846800976");
  }, 3000);

  setTimeout(() => {
    scraper("6306574", "10/29/1982", "16106743998");
  }, 9000);

  setTimeout(() => {
    scraper("7657179", "07/05/1990", "15702021509");
  }, 9000);

  setTimeout(() => {
    scraper("5090314", "07/05/1985", "16103336159");
  }, 12000);

  setTimeout(() => {
    scraper("3332929", "03/27/1995", "14845548828");
  }, 1000);

  setTimeout(() => {
    scraper("9450901", "08/13/1974", "14845442541");
  }, 8000);

  setTimeout(() => {
    scraper("9424569", "06/16/1985", "19088783572");
  }, 8000);




}
//19088783572 ken 9424569

//function calls each persons scrape
scrapeAll();
