'use server';
import connection from "@/lib/db";


export async function getPage(name) {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM mainpages WHERE link = ?;", [name], function (error, results, fields) {
      if (error) {
      } else {
        if (results.length > 0) {
          resolve(results[0]);
        }
      }
    });
  });
}
