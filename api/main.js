const express = require('express')
const api = express()

api.get('/jobs', (req, res) => {
    res.json([])
})

api.listen(3000, () => {})
