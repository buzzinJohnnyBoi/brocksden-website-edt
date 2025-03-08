'use server'
import connection from "@/lib/db";

export async function getAllArticles() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT link FROM articles;", function (error, results, fields) {
          if (error) {
          } else {
            if (results.length > 0) {
                let names = [];
                for (let i = 0; i < results.length; i++) {
                    names.push(results[i].link);
                }
                resolve(names);
            }
          }
        });
    });
}