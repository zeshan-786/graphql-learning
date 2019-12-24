var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "graphqldb"
});


db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('Connected to MYSQL');
  });



module.exports  = {

    insertLink : async function(link) {
        var query = "INSERT INTO links SET ?"
        return new Promise( ( resolve, reject ) => {
            db.query(query,link, function (error, results) {
                resolve (results)
                // Handle error after the release.
                if (error) throw ( error );
                console.log("1 Row Inserted");
                // Don't use the connection here, it has been returned to the pool.
              })
            })
        
    },

    searchLink :  async function(id) {
        var query = "SELECT * FROM links where id ="+id
        return new Promise( ( resolve, reject ) => {
            db.query(query, function (error, results, fields) {
                resolve (results)
                // Handle error after the release.
                if (error) throw error ;
                // Don't use the connection here, it has been returned to the pool.
              })
            })
    },

    allLinks :  async function() {
        var query = "SELECT * FROM links"
        return new Promise( ( resolve, reject ) => {
        db.query(query, function (error, results, fields) {
            resolve (results)
            // Handle error after the release.
            if (error) throw error ;
            // Don't use the connection here, it has been returned to the pool.
          })
        })
        
    },
    updateLink :  async function(link) {
        var query = "UPDATE links SET url ='"+link.url+"', description ='"+link.description+"' WHERE id ="+link.id
        return new Promise( ( resolve, reject ) => {
            db.query(query, function (error, results, fields) {
                resolve (results)
                // Handle error after the release.
                if (error) throw error ;
                // Don't use the connection here, it has been returned to the pool.
              })
            })
    },

    deleteLink :  async function(id) {
        var query = "DELETE FROM links WHERE id="+id
        return new Promise( ( resolve, reject ) => {
            db.query(query, function (error, results) {
                resolve (results)

                if (error) throw error ;
                // Don't use the connection here, it has been returned to the pool.
              })
            })
    }




}