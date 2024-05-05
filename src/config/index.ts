interface Config {
  apiUrl: string;
  apiEngine: string;
  apiWinners: string;
}

const config: Config = {
  apiUrl: 'http://localhost:3000/garage',
  apiEngine: 'http://localhost:3000/engine?id=',
  apiWinners: 'http://localhost:3000/winners',
};

export default config;
