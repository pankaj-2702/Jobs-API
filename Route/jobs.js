const {getAllJobs , getJob , createJob , updateJob , deleteJob } = require('../Controllers/jobs')

const Route = require('express').Router()

Route.route('/').get(getAllJobs).post(createJob)
Route.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = Route