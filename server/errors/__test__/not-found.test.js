const NotFoundError = require('../not-found');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../custom-api');

describe('NotFoundError', () => {
    it('should create a not found error', () => {
        const message = 'not found error';
        const error = new NotFoundError(message);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(StatusCodes.NOT_FOUND);
        expect(error instanceof Error).toBe(true);
    });
}
);