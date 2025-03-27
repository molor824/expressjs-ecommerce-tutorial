/**
 * @param {(req: Request, res: Response, next) => Promise<void>} fn Function to wrap around
 * @returns {(req: Request, res: Response, next) => Promise<void>} Function wrapped in async handler
 */
export default function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
