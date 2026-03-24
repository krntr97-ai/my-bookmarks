import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getBookmarks, getCategories } from '@/app/actions/bookmarks'
import { logout } from '@/app/actions/auth'
import { BookmarkCard } from '@/components/bookmark-card'
import { AddBookmarkButton } from '@/components/add-bookmark-button'
import { SearchAndFilter } from '@/components/search-and-filter'

type Props = {
  searchParams: Promise<{ search?: string; category?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { search, category } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [bookmarks, categories] = await Promise.all([
    getBookmarks(search, category),
    getCategories(),
  ])

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <h1 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            My Bookmarks
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-500 dark:text-zinc-400 hidden sm:block truncate max-w-48">
              {user?.email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="h-8 px-3 rounded-md border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                ログアウト
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <Suspense fallback={<div className="h-9 flex-1 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded-lg" />}>
            <SearchAndFilter categories={categories} />
          </Suspense>
          <AddBookmarkButton />
        </div>

        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-2 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              {search || category
                ? '検索条件に一致するブックマークがありません。'
                : 'ブックマークがまだありません。「追加」から登録しましょう。'}
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              {bookmarks.length}件
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bookmarks.map((bookmark) => (
                <BookmarkCard key={bookmark.id} bookmark={bookmark} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
