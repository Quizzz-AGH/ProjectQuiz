const BadRequestError = require('../bad-request');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../custom-api');

describe('CustomAPIError', () => {
    it('should create a custom API error', () => {
        const message = 'custom API error';
        const error = new CustomAPIError(message);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(StatusCodes.message);
        expect(error instanceof Error).toBe(true);
    });
}
);
