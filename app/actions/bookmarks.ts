'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { BookmarkInsert, BookmarkUpdate } from '@/types'

export async function getBookmarks(search?: string, category?: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  let query = supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (search) {
    query = query.or(`title.ilike.%${search}%,url.ilike.%${search}%,description.ilike.%${search}%`)
  }
  if (category) {
    query = query.eq('category', category)
  }

  const { data } = await query
  return data ?? []
}

export async function getCategories() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('bookmarks')
    .select('category')
    .eq('user_id', user.id)
    .not('category', 'is', null)

  if (!data) return []
  const unique = [...new Set(data.map((b) => b.category as string))]
  return unique.filter(Boolean).sort()
}

export async function createBookmark(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: '未認証です' }

  const bookmark: BookmarkInsert = {
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    description: (formData.get('description') as string) || null,
    category: (formData.get('category') as string) || null,
  }

  if (!bookmark.title || !bookmark.url) {
    return { error: 'タイトルとURLは必須です' }
  }

  const { error } = await supabase.from('bookmarks').insert({
    ...bookmark,
    user_id: user.id,
  })

  if (error) return { error: error.message }

  revalidatePath('/')
  return { error: null }
}

export async function updateBookmark(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: '未認証です' }

  const updates: BookmarkUpdate = {
    title: formData.get('title') as string,
    url: formData.get('url') as string,
    description: (formData.get('description') as string) || null,
    category: (formData.get('category') as string) || null,
  }

  const { error } = await supabase
    .from('bookmarks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/')
  return { error: null }
}

export async function deleteBookmark(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: '未認証です' }

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/')
  return { error: null }
}
