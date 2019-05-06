const connectionString = process.env.DB_CONNECTION_STRING;

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: connectionString
});

const executeQuery = (request, response) => {
    pool.query(request.query.sql)
        .then(res => {
            //console.log('Query executed successfully!');
            //console.log('RESULT:', res);
            response.render('index', {
                query: request.query.sql,
                success: true,
                result: res.rows
            });
        })
        .catch(e => {
            //console.error(e.message);
            response.render('index', {
                query: request.query.sql,
                success: false,
                result: e.message
            });
        });
};

module.exports = {
  executeQuery,
};



















/*
pool
  .query("SELECT NOW()")
  .then(res => console.log(""))
  .catch(e => console.error(e.stack));

const client = new Client({
  connectionString: connectionString
});

client.connect();

var data = "";

exports.saveAndGetInitialData = function() {
  client.query("CREATE TABLE IF NOT EXISTS emps(data jsonb)");
  client.query("TRUNCATE TABLE emps;");
 
  client.query("SELECT * FROM emps", (err, res) => {
    if (err) console.log("ERROR OCCURED");
    if (res) {
      data = res.rows;
      console.log("Data received:", data);
      return data;
    }
  });
}
*/