'use client'

import { useState } from 'react'
import { BookmarkForm } from './bookmark-form'
import { Dialog } from './dialog'

export function AddBookmarkButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 h-9 px-4 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5v14" />
        </svg>
        追加
      </button>

      {open && (
        <Dialog title="ブックマークを追加" onClose={() => setOpen(false)}>
          <BookmarkForm onDone={() => setOpen(false)} />
        </Dialog>
      )}
    </>
  )
}
