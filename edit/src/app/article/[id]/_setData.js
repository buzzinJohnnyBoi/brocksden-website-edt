'use server'
import connection from "@/lib/db";

export default async function saveContent(id, content) {
  // function saveContent(pageJsx) {
    console.log(id);
    console.log(content);
    setPage(id, content);
  // if(pageId !== null) {
  //   setPage(pageId, pageJsx);
  // }
}

function setPage(name, content) {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE articles SET layout = ? WHERE link = ?;", [content, name], function(error, results, fields) {
      if(error) {
        console.log(error);
      }
    });
 });
}