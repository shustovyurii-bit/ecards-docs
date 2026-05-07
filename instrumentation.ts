export async function onRequestError(
  err: Error & { digest?: string },
  _request: unknown,
  _context: unknown,
) {
  console.error(
    '[INSTRUMENT] digest=%s name=%s message=%s\nstack=%s',
    (err as any).digest,
    err.name,
    err.message,
    err.stack,
  )
}
