'use client'

import { useEffect, useRef } from 'react'

type Props = {
  title: string
  children: React.ReactNode
  onClose: () => void
}

export function Dialog({ title, children, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    dialogRef.current?.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
      className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-lg backdrop:bg-black/50 open:flex open:flex-col open:gap-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h2>
        <button
          onClick={onClose}
          aria-label="閉じる"
          className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      {children}
    </dialog>
  )
}
