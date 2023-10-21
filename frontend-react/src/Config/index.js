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
    ChatGPTApiBaseUrl:
      environment === Environment.production
        ? 'http://localhost:3005'
        : 'http://localhost:3005',
  },
};

export default Config;
