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
