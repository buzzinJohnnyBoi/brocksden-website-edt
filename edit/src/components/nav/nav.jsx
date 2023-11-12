import NavClass from "./navmain";

import connection from "@/lib/db";

function queryDatabase() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM mainpages;", function(error, results, fields) {
      if (error) {
        reject(error);
      } else {
        let mainData = [];
        if (results.length > 0) {
          let returnJson = [];
          for (let i = 0; i < results.length; i++) {
            const row = results[i];
            mainData.push({
                name: row.name,
                link: row.link
            });
          }
        }
        resolve(mainData);
      }
    });
  });
}

// function createNewPage() {
//   const jsxStuff = (
//     <div>
//       <p>Stan Puklicz</p>
//       <p>Mark Puklicz</p>
//       <p>John Campbell</p>
//     </div>
//   );
//   const serialzedJSN = JSON.stringify(jsxStuff);
//   console.log("Good");
//   connection.query("INSERT INTO mainpages (layout, name, link) VALUES (?, ?, ?);", [serialzedJSN, "Museum", "Museum"], function(error, results, fields) {
//     if (error) {
//       reject(error);
//     } else {
//       let mainData = [];
//       if (results.length > 0) {
//         let returnJson = [];
//         for (let i = 0; i < results.length; i++) {
//           const row = results[i];
//           mainData.push({
//               name: row.name,
//               link: row.link
//           });
//         }
//       }
//     }
//   });
// }

export default async function Home({ params }) {
//   const id = params.id;
  const mainData = await queryDatabase();
  // createNewPage();
  return ( <NavClass links={mainData} /> );
}
