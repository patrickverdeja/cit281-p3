const fs = require("fs");
const fastify = require("fastify")();
const { coinCount } = require("./p3-module.js");

fastify.get("/", (request, reply) => {
  let fileName = __dirname + "/index.html";
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      reply
        .code(500)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("An error has occured");
    } else {
      reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(data);
    }
  });
});


fastify.get("/coin", (request, reply) => {
  const { denom = 0, count = 0 } = request.query;
  let parseDenom = parseInt(denom);
  let parseCount = parseInt(count);
  let coin = { denom: parseDenom, count: parseCount };
  let coinValue = coinCount(coin);
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});


fastify.get("/coins", (request, reply) => {
  const { option } = request.query;
  let parseOption = parseInt(option);
  const coins = [
    { denom: 25, count: 2 },
    { denom: 1, count: 7 },
  ];
  let coinValue;
  switch (parseOption) {
    case 1:
      coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 }); // option = 1
      break;
    case 2:
      coinValue = coinCount(...coins); // option = 2
      break;
    default:
      coinValue = 0;
      break;
  }
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});