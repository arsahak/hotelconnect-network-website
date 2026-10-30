/**
 * Photos uploaded in local development are served by the API at
 * http://localhost:8000/uploads/… — Next's image optimizer doesn't fetch from
 * there, so those are shown as they are. Production photos (https, Spaces)
 * are optimized as usual.
 */
export function skipOptimizer(src: string): boolean {
  return src.startsWith("http://");
}
