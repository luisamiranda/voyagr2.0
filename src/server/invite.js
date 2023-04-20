'use strict'

const router = require('express').Router()
const admin = require('firebase-admin')

const config = require('../../firebaseConfig')
const { initializeApp } = require('firebase-admin/app');
// const serviceAccount = require('APP/serviceAccountKey.json')

const app = initializeApp();

const database = admin.database()

router.post('/', (req, res, next) => {
	const email = req.body.email
	const tripId = req.body.tripId

	admin.auth().getUserByEmail(email)
		.then(function(user) {
			const uid = user.uid // invited user id

			// add userId to tripUsers
			database
				.ref(`/tripUsers/${tripId}`)
				.update({
					[uid]: uid
				})
				.catch(console.error)

			// add tripId to userTrips
			database
				.ref(`/userTrips/${uid}`)
				.update({
					[tripId]: tripId
				})
				.catch(console.error)
		})
		.catch(next)
})

router.get('/:userId', (req, res, next) => {
	admin.auth()
		.getUser(req.params.userId)
		.then(user => {
			res.send(user.displayName)
		})
		.catch(next)
})

module.exports = router