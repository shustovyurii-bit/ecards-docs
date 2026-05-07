import type { ReactNode } from 'react'

interface FrameProps {
  children: ReactNode
  caption?: string
}

export default function Frame({ children, caption }: FrameProps) {
  return (
    <figure className="my-6">
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
