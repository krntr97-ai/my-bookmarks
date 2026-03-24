export type Bookmark = {
  id: string
  user_id: string
  title: string
  url: string
  description: string | null
  category: string | null
  created_at: string
  updated_at: string
}

export type BookmarkInsert = Omit<Bookmark, 'id' | 'user_id' | 'created_at' | 'updated_at'>
export type BookmarkUpdate = Partial<BookmarkInsert>
