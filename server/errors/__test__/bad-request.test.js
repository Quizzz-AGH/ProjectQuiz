const BadRequestError = require('../bad-request');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../custom-api');

describe('BadRequestError', () => {
    it('should create a bad request error', () => {
        const message = 'bad request';
        const error = new BadRequestError(message);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(error instanceof CustomAPIError).toBe(true);
    });
    });