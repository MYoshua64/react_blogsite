class AppConfig{
    public serverPort:number = 8000;
    public dbHost:string = 'localhost';
    public dbUser:string = 'root';
    public dbPassword:string = '123456';
    public dbName:string = 'blogsite'
}

export const appConfig = new AppConfig();