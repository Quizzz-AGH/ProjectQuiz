// const connectDatabase = require("../connect");
// const mongoose = require("mongoose");
// const { StatusCodes } = require("http-status-codes");
// const CustomAPIError = require("../../errors/custom-api");
// const url = "mongodb://localhost:27017/test";
// describe("connectDatabase", () => {
//     it("should connect to the database", async () => {
//         const db = await connectDatabase("mongodb://localhost:5000/test");
//         expect(db).toBeInstanceOf("");
//         expect(db.readyState).toBe(1);
//     });
//     it("should throw an error if the connection fails", async () => {
//         const db = await connectDatabase("mongodb://localhost:5000/test");
//         expect(db).toBeInstanceOf(mongoose.Connection);
//         expect(db.readyState).toBe(1);
//     });
// }
// );