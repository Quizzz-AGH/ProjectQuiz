const Question = require("../../models/question");
const { getMultipleRandom } = require('../pick-questions');
const { pickRandomQuestions } = require('../pick-questions');



describe('pickQuestions', () => {
  test('pickQuestions returns expected number of elements', () => {
    const arr = [1, 2, 3, 4, 5];
    const num = 3;
    const result = getMultipleRandom(arr, num);
    expect(result.length).toBe(num);
  })

  test('pickQuestions returns expected elements', () => {
    const arr = [1, 2, 3];
    const num = 3;
    const result = getMultipleRandom(arr, num);
    expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
  })
}
)

describe('pickRandomQuestions', () => {
  beforeEach(() => {
    jest.spyOn(Question, 'find').mockImplementation(() => Promise.resolve([
      { id: 1, question: 'What is your name?' },
      { id: 2, question: 'What is your age?' },
      { id: 3, question: 'Where are you from?' },
    ]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an array of 3 random questions', async () => {
    const result = await pickRandomQuestions();
    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ id: 1, question: 'What is your name?' });
    expect(result).toContainEqual({ id: 2, question: 'What is your age?' });
    expect(result).toContainEqual({ id: 3, question: 'Where are you from?' });
  });
});

