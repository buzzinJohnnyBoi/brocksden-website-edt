'use server'
import connection from "@/lib/db";
import Edit from "../_src/editPage";
import { getPage } from "./getPage";


export default async function main({ params }) {

  const id = params.id;
  const page = await getPage(id);

  return (
      <Edit id={id} content={page.layout} />
  );
}

function setPage(name, content) {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE mainpages SET layout = ? WHERE link = ?;", [content, name], function(error, results, fields) {
      
    });
 });
}

function addPage(name, content) {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO mainpages(layout, name, link) VALUES(?, ?, ?);", [content, name, name], function(error, results, fields) {
      
    });
 });
}