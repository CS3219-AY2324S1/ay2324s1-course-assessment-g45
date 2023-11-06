import Environment from '../enums/Environment';

const environment = process.env.NODE_ENV;

const Config = {
  Env: environment,
  Common: {
    QuestionApiBaseUrl:
      environment === Environment.production
        ? 'http://localhost:3002'
        : 'http://localhost:3002',
    UserApiBaseUrl:
      environment === Environment.production
        ? 'http://localhost:3001'
        : 'http://localhost:3001',
    CollabSessionApiBaseUrl:
      'http://localhost:3003',
    MatchingApiBaseUrl:
      'http://localhost:3004',
    ChatGPTApiBaseUrl:
      environment === Environment.production
        ? 'http://localhost:3006'
        : 'http://localhost:3006',
    CodeExecApiBaseUrl:
      environment === Environment.production
        ? 'judge0-ce.p.rapidapi.com'
        : 'judge0-ce.p.rapidapi.com'
  },
};

export default Config;
