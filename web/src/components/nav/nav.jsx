// import NavClass from "./navmain";
import connection from "@/lib/db";
import HomeNavClass from "./homepagenav";

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
            if(row.link !== "Home") {
              mainData.push({
                  name: row.name,
                  link: row.link
              });
            }
            else {
              mainData.splice(0, 0, {
                  name: row.name,
                  link: row.link
              });
            }
          }
        }
        resolve(mainData);
      }
    });
  });
}


export default async function Home(params) {
  const pageName = params.pageName;
  const mainData = await queryDatabase();
  console.log(pageName)
  // if(pag") {
    return ( <HomeNavClass links={mainData} /> );
  // }
  // else {
  //   return ( <NavClass links={mainData} /> );
  // }
}
