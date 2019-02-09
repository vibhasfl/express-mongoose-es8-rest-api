require('dotenv').load()

let unusedEnvVars = [ 'MONGO_HOSTNAME', 'MONGO_PORT', 'MONGO_DATABASE' ].filter((i) => !process.env[i])
if (unusedEnvVars.length) throw new Error('Required ENV variables are not set: [' + unusedEnvVars.join(', ') + ']')

const { app } = require('./server/app.js')

app.listen(process.env.PORT)
