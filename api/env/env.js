const production = require('./production.env')
const def = require('./default.env')

const env = process.env.NODE_ENV
let env_variables = {}

switch(env) {
  case 'production':
    env_variables = {...def, ...production}
    break;

  default:
    env_variables = def
}

module.exports = env_variables
