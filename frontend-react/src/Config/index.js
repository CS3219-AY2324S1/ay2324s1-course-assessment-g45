import Environment from '../enums/Environment';

const environment = process.env.NODE_ENV;

const Config = {
  Env: environment,
  Common: {
    QuestionApiBaseUrl:
      environment === Environment.production
        ? process.env.QUESTION_SERVICE_URL
        : 'http://localhost:3002',
    UserApiBaseUrl:
      environment === Environment.production
        ? process.env.USER_SERVICE_URL
        : 'http://localhost:3001',
    CollabSessionApiBaseUrl:
      environment === Environment.production
        ? process.env.COLLAB_SERVICE_URL
        : 'http://localhost:3003',
    MatchingApiBaseUrl:
      environment === Environment.production
        ? process.env.MATCHING_SERVICE_URL
        : 'http://localhost:3004',
    ChatGPTApiBaseUrl:
      environment === Environment.production
        ? process.env.AI_SERVICE_URL
        : 'http://localhost:3006',
  },
};

export default Config;
