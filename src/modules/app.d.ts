//For env
namespace NodeJs {
  interface ProcessEnv {
    //For App
    PORT: number;

    //For DB
    DB_PORT: number;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_USERNAME: string;
    DB_HOST: string;
  }
}
//For request
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
