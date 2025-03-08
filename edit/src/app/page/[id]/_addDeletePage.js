'use server'
import connection from "@/lib/db";

export async function deletePage(name) {
  const query = "DELETE FROM mainpages WHERE name = ?;"
  return new Promise((resolve, reject) => {
    connection.query(query, [name], function(error, results) {
      if(error) {
        console.log(error);
        resolve(false);
      }
      else {
        resolve(true);
      }
    });
 });
}

export async function addPage(name) {
    console.log("adding");
    const query = "INSERT INTO mainpages (name, link, layout) VALUES(?, ?, ?)";
    const layout = (
        <div>
            <p>Add Something!</p>
            <p>Add Something!</p>
        </div>
    )
    return new Promise((resolve, reject) => {
      connection.query(query, [name, name, JSON.stringify(layout)], function(error, results) {
        if(error) {
          console.log(error);
          resolve(false);
        }
        else {
          resolve(true);
        }
      });
   });
}