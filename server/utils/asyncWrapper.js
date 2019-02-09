/*
*  Wrapper to handle exception in routes
*  Note : passing next in catch ,calls any next error handler defined  you can override if needed
*/
export const asyncWrapper = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
