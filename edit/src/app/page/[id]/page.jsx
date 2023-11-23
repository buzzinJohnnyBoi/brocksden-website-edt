'use server'
import connection from "@/lib/db";
import Edit from "../_src/editPage";

var pageId = null;

function saveContent(pageJsx) {
  if(pageId !== null) {
    setPage(pageId, pageJsx);
  }
}

export default async function main({ params }) {
  const id = params.id;
  pageId = id;
  const page = await getPage(id);
  const createContent = loadPage(page);
  return (
    <div>
      <Edit content={page.layout} saveData={saveContent} />
      {/* {createContent} */}
    </div>
  );
}

function loadPage(page) {
  // let pageText = '';
  // for (let i = 0; i < page.layout.text.length; i++) {
  //   const text = page.layout.text[i];
  //   const content = text.content;
  //   pageText = (
  //     <>
  //       {pageText}
  //       {formatText(content)}
  //       <br></br>
  //     </>
  //   )
  //   console.log(text);
  // }
  // console.log(page.layout)
  // const jsxString = JSON.stringify(page.layout);
  // const Component = JSON.parse(jsxString);
  return page.layout.props.children.map((child) => {
    return child.props.children
  });
}

function formatText(text) {
  const lines = text.split('\n' + '\n');
  let formatedText = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    console.log(line)
    formatedText = (
      <>
        {formatedText}
        {line}
        <br></br>
      </>
    )
  }
  return formatedText;
}

function getPage(name) {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM mainpages WHERE link = ?;", [name], function(error, results, fields) {
      if (error) {
      } else {
        if (results.length > 0) {
          resolve(results[0]);
        }
      }
    });
 });
}

function setPage(name, content) {
  return new Promise((resolve, reject) => {
    connection.query("UPDATE mainpages SET layouts = ? WHERE link = ?;", [content, name], function(error, results, fields) {
      
    });
 });
}