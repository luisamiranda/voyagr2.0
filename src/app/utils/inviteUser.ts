
import axios from 'axios'

export const inviteUser = (email: string, tripId: string) => {
	axios.post('/api/invite/', { email, tripId })
		.then((res: any) => {
			// return whether or not the response contained an error
			if (res.data.code) return true
			return false
		})
		.catch((error) => {
			console.log("ERRROR", error)
		})
}

export const listUsers = (userId: string) => {
	return axios.get(`/api/invite/${userId}`)
		.then((res: any) => res.data)
		.catch(console.error)
}