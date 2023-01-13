const Account = require('../account');
const bcrypt = require('bcryptjs');

describe('comparePassword', () => {
  let account;

  beforeEach(async () => {
    account = new Account({
      username: 'testuser',
      password: await bcrypt.hash('password123', 10),
      gamesPlayed: 0,
      gamesWon: 0,
      rankingScore: 0,
      isAdmin: false
    });
  });

  it('should return true if the password matches', async () => {
    const isMatch = await account.comparePassword('password123');
    expect(isMatch).toBe(true);
  });

  it('should return false if the password does not match', async () => {
    const isMatch = await account.comparePassword('wrongpassword');
    expect(isMatch).toBe(false);
  });
});

// describe('pre save', () => {
//   let account;

//   beforeEach(async () => {
//     account = new Account({
//       username: 'testuser',
//       password: 'password123',
//       gamesPlayed: 0,
//       gamesWon: 0,
//       rankingScore: 0,
//       isAdmin: false
//     });
//     await account.save();
//   });

//   it('should hash the password before saving', async () => {
//     const match = await bcrypt.compare('password123', account.password);
//     expect(match).toBe(false);
//   });
// });




