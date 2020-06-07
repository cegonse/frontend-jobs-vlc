const express = require('express')
const api = express()

api.patch('/jobs', (req, res) => {
    res.sendStatus(200)
})

api.listen(4000, () => {})
