'use server'
import Page from "../_src/editPage";
import { getPage } from "./getPage";


export default async function main({ params }) {

  const id = params.id;
  const page = await getPage(id);

  return id, (<Page id={id} content={page.layout} />);
}