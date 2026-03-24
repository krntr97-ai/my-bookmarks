'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

type Props = {
  categories: string[]
}

export function SearchAndFilter({ categories }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const currentSearch = searchParams.get('search') ?? ''
  const currentCategory = searchParams.get('category') ?? ''

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    startTransition(() => {
      router.replace(`/?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          defaultValue={currentSearch}
          onChange={(e) => update('search', e.target.value)}
          placeholder="タイトル・URL・メモで検索..."
          className="w-full h-9 pl-9 pr-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
        />
      </div>

      {categories.length > 0 && (
        <select
          defaultValue={currentCategory}
          onChange={(e) => update('category', e.target.value)}
          className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100"
        >
          <option value="">すべてのカテゴリ</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
