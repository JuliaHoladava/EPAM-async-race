interface Config {
  apiUrl: string;
  apiEngine: string;
}

const config: Config = {
  apiUrl: 'http://localhost:3000/garage',
  apiEngine: 'http://localhost:3000/engine?id=',
};

export default config;
