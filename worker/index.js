// this file has redis connection values.
const keys = require('./keys');

const redis = require('redis');

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    //if connection lost every 1 sec, connection wil be retried.
    retry_strategy: () => 1000
});

//subscription to the redis client to watch changes
const sub = redisClient.duplicate();

//recurive approch is used to slow down the calc so that we can use worker.
function fib(index){
    if(index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

sub.on('message',(channel, message) => {
 redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');