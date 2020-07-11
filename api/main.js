const api = require('./src/api')

api.listen(process.env.PORT || 3000, () => {})
