import AWS from 'aws-sdk-mock';
import LambdaTester from 'lambda-tester';
import handler from '../build/handler';

describe('resolvers', () => {
  describe('getSongs()', () => {
    describe('success', () => {
      const event = {
        path: '/graphql',
        httpMethod: 'POST',
        headers: {},
        body: {
          query: '{ songs { title } }',
        },
      };

      beforeEach(() => {
        AWS.mock('DynamoDB.DocumentClient', 'scan', { Items: [{ id: '1', title: 'foo', artist: 'bar', duration: 1 }] });
      });

      afterEach(() => {
        AWS.restore('DynamoDB.DocumentClient');
      });

      test('Get list of songs from DB', () =>
        LambdaTester(handler.graphql)
          .event(event)
          .expectResult(data => expect(data).toMatchSnapshot()),
      );
    });
  });

  describe('getSongById()', () => {
    describe('success', () => {
      const event = {
        path: '/graphql',
        httpMethod: 'POST',
        headers: {},
        body: {
          query: '{ song(id: 1) { title } }',
        },
      };

      beforeEach(() => {
        AWS.mock('DynamoDB.DocumentClient', 'get', { Item: { id: '1', title: 'foo', artist: 'bar', duration: 1 } });
      });

      afterEach(() => {
        AWS.restore('DynamoDB.DocumentClient');
      });

      test('Get single song from DB', () =>
        LambdaTester(handler.graphql)
          .event(event)
          .expectResult(data => expect(data).toMatchSnapshot()),
      );
    });
  });

  describe('createSong()', () => {
    describe('success', () => {
      const event = {
        path: '/graphql',
        httpMethod: 'POST',
        headers: {},
        body: {
          query: 'mutation { createSong(title: "A New Song", artist: "123", duration: 120) { title, duration } }',
        },
      };

      beforeEach(() => {
        AWS.mock('DynamoDB.DocumentClient', 'put', {});
      });

      afterEach(() => {
        AWS.restore('DynamoDB.DocumentClient');
      });

      test('Create new song in DB', () =>
        LambdaTester(handler.graphql)
          .event(event)
          .expectResult(data => expect(data).toMatchSnapshot()),
      );
    });
  });
});
