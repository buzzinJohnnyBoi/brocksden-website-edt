"use server"

export function saveContent(pageJsx) {
    if(pageId !== null) {
      setPage(pageId, pageJsx);
    }
}