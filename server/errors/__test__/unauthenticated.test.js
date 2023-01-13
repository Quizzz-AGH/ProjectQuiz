const UnauthenticatedError = require('../unauthenticated');
const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('../custom-api');

describe('UnauthenticatedError', () => {
    it('should create an unauthenticated error', () => {
        const message = 'unauthenticated error';
        const error = new UnauthenticatedError(message);
        expect(error.message).toBe(message);
        expect(error.statusCode).toBe(StatusCodes.UNAUTHORIZED);
        expect(error instanceof Error).toBe(true);
    });
}
);