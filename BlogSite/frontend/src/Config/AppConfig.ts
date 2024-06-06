class AppConfig{
    public usersURL:string = "http://localhost:8000/users/";
    public accountURL:string = "http://localhost:8000/accounts/";
    public postURL:string = "http://localhost:8000/posts/";
}

export const appConfig = new AppConfig();