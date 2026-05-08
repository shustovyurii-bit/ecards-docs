export default function SupportCTA() {
  return (
    <div className="my-6 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30">
      <div className="flex items-start gap-4">
        <div className="text-2xl">💬</div>
        <div>
          <p className="font-semibold text-blue-900 dark:text-blue-100">Не нашли ответ?</p>
          <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            Напишите в поддержку — поможем разобраться.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="https://t.me/ecards_support"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              @ecards_support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
