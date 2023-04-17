module.exports = class apiError extends Error{
    status;
    errors;
    littleMessage;

    constructor(status, littleMessage, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
        this.littleMessage = littleMessage;
    }

    static BadRequest(littleMessage, message, errors = []) {
        return new apiError(400, littleMessage, message, errors);
    }

    static Forbidden() {
        return new apiError(403, 'FORBIDDEN', 'Ошибка доступа');
    }
}