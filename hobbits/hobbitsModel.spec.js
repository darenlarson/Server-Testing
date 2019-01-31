const db = require('../data/dbConfig');
const hobbitModel = require('./hobbitsModel.js');

// before and after Each or before and after All
afterEach(async () => {
    await db('hobbits').truncate();
  });

  describe('hobbits model', () => {
      it('should insert provided hobbit', async () => {
          const hobbit = await hobbitModel.insert({ name: 'daren' });

          let hobbits = await db('hobbits');
          expect(hobbits).toHaveLength(1);
          expect(hobbit.name).toEqual('daren');

          await hobbitModel.insert({ name: 'freddy' });
          hobbits = await db('hobbits');
          expect(hobbits).toHaveLength(2);
      });


  })