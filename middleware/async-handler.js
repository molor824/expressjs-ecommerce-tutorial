/**
 *
 * @param {(req: Request, res: Response, next) => Promise<void>} fn
 * @returns (req: Request, res: Response, next) => Promise<void>
 */
export default function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
