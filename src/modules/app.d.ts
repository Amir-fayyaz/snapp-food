//For request
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
