var pg = require('pg');

var postgresUrl = 'postgres://localhost/wikistack';


var client = new pg.Client(postgresUrl);

client.connect();

console.log(client);










module.exports = client;