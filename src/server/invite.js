'use strict'

const router = require('express').Router()
const admin = require('firebase-admin')
const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = {
    apiKey: "AIzaSyCkGzYPNnBN1wgojYpMlid9S3yvDU52BsY",
    authDomain: "voyagr-59d3e.firebaseapp.com",
    databaseURL: "https://voyagr-59d3e.firebaseio.com",
    projectId: "voyagr-59d3e",
    storageBucket: "voyagr-59d3e.appspot.com",
    messagingSenderId: "903756024411",
    appId: "1:903756024411:web:11c69bb6e537dd6a214d7e",
};

const serviceAccount = require('../../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://voyagr-59d3e.firebaseio.com'
})

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