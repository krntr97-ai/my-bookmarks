'use client'

import { useState } from 'react'
import Image from 'next/image'
import { deleteBookmark } from '@/app/actions/bookmarks'
import type { Bookmark } from '@/types'
import { BookmarkForm } from './bookmark-form'
import { Dialog } from './dialog'

type Props = {
  bookmark: Bookmark
}

export function BookmarkCard({ bookmark }: Props) {
  const [editing, setEditing] = useState(false)

  const hostname = (() => {
    try {
      return new URL(bookmark.url).hostname
    } catch {
      return bookmark.url
    }
  })()

  return (
    <>
      <article className="group flex flex-col gap-2 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
        <div className="flex items-start justify-between gap-2">
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline line-clamp-1 flex-1"
          >
            {bookmark.title}
          </a>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => setEditing(true)}
              aria-label="編集"
              className="p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
            >
              <PencilIcon />
            </button>
            <form
              action={async () => {
                await deleteBookmark(bookmark.id)
              }}
            >
              <button
                type="submit"
                aria-label="削除"
                className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950 text-zinc-500 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400 transition-colors"
              >
                <TrashIcon />
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
          <Image
            src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=16`}
            alt=""
            width={12}
            height={12}
            className="rounded-sm"
          />
          <span className="truncate">{hostname}</span>
        </div>

        {bookmark.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
            {bookmark.description}
          </p>
        )}

        {bookmark.category && (
          <span className="self-start text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            {bookmark.category}
          </span>
        )}
      </article>

      {editing && (
        <Dialog title="ブックマークを編集" onClose={() => setEditing(false)}>
          <BookmarkForm bookmark={bookmark} onDone={() => setEditing(false)} />
        </Dialog>
      )}
    </>
  )
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
