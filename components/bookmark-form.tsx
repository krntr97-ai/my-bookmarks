'use client'

import { useActionState, useRef } from 'react'
import { createBookmark, updateBookmark } from '@/app/actions/bookmarks'
import type { Bookmark } from '@/types'

type Props = {
  bookmark?: Bookmark
  onDone: () => void
}

type ActionState = { error: string | null }

const initialState: ActionState = { error: null }

export function BookmarkForm({ bookmark, onDone }: Props) {
  const formRef = useRef<HTMLFormElement>(null)

  const action = bookmark
    ? (_: ActionState, formData: FormData) => updateBookmark(bookmark.id, formData)
    : (_: ActionState, formData: FormData) => createBookmark(formData)

  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    initialState
  )

  // 成功したら閉じる
  if (!pending && !state.error && state !== initialState) {
    onDone()
  }

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={bookmark?.title}
          required
          className="h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="url" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          URL <span className="text-red-500">*</span>
        </label>
        <input
          id="url"
          name="url"
          type="url"
          defaultValue={bookmark?.url}
          required
          placeholder="https://example.com"
          className="h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          カテゴリ
        </label>
        <input
          id="category"
          name="category"
          type="text"
          defaultValue={bookmark?.category ?? ''}
          placeholder="技術, デザイン, etc."
          className="h-9 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          メモ
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={bookmark?.description ?? ''}
          rows={3}
          className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 resize-none"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onDone}
          className="h-9 px-4 rounded-md border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={pending}
          className="h-9 px-4 rounded-md bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {pending ? '保存中...' : bookmark ? '更新' : '追加'}
        </button>
      </div>
    </form>
  )
}
