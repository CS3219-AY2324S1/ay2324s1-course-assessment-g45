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

    // QuestionApiBaseUrl:
    //   'https://question-g5qibfavfa-uc.a.run.app',
    // UserApiBaseUrl:
    //   'https://user-g5qibfavfa-uc.a.run.app',
    // CollabSessionApiBaseUrl:
    //   'https://collab-g5qibfavfa-uc.a.run.app',
    // MatchingApiBaseUrl:
    //   'https://matching-g5qibfavfa-uc.a.run.app',
    // ChatGPTApiBaseUrl:
    //   'https://ai-g5qibfavfa-uc.a.run.app'
  },
};

export default Config;
