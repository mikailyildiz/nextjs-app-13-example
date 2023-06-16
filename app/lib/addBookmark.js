'use server';

import { cookies } from 'next/headers';

export async function addBookmark({productId}) {

  const cookieStore = cookies()
  const cookieBookmarks = cookieStore.get('bookmarks')

  const parseBookmarks = cookieBookmarks ? JSON.parse(cookieBookmarks.value) : []

  let bookmarkList

  if (parseBookmarks.includes(productId)) {
    bookmarkList = parseBookmarks.filter((e) => e != productId)
  } else {
    bookmarkList = [...parseBookmarks, productId]
  }
  
  cookies().set({
    name: 'bookmarks',
    value: JSON.stringify(bookmarkList),
    secure: true,
    httpOnly: true,
    path: '/',
  })

  return bookmarkList
}