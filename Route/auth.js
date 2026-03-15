const Route = require('express').Router()
const {register , login} = require('../Controllers/auth')

Route.post('/register',register)
Route.post('/login',login)

module.exports = Route