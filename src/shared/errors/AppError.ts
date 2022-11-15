export class AppError {
    public code: number;
    public message: string;

    constructor(message: string, code = 400) {
        this.message = message;
        this.code = code;
    }
}