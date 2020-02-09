/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';

const init = async () => {
  const server = new Server({
    port: process.env.port || 8080,
    host: '0.0.0.0'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return {
        hello: 'world'
      };
    }
  });

  server.route({
    method: "GET",
    path: '/stock/{symbol}/chart/{range}/{date}',
    handler: (request, h) => {
      let stockData = {};
      if (request.params.symbol = "{symbol}") {
        stockData = {
          "range": "1m",
          "data": [
            {
          "date": "2017-04-03",
          "open": 143.1192,
          "high": 143.5275,
          "low": 142.4619,
          "close": 143.1092,
          "volume": 19985714,
          "uOpen": 143.1192,
          "uHigh": 143.5275,
          "uLow": 142.4619,
          "uClose": 143.1092,
          "uVolume": 19985714,
          "change": 0.039835,
          "changePercent": 0.028,
          "label": "Apr 03, 17",
          "changeOverTime": -0.0039
            }
          ]
        }
      }
    }
  })

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
