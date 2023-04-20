import React, { useState, useEffect } from 'react'
// import update from 'react/lib/update'
import { Alert, Button, Col, Form, FormControl, FormGroup, ListGroup, ListGroupItem } from 'react-bootstrap'
import { inviteUser, listUsers } from '../../utils/inviteUser'
import { db } from '../../index'
import { ref, get } from 'firebase/database'

interface InviteUserProps {
    tripId: any;
    pageId: any;
}
const InviteUser = ({ tripId, pageId }: InviteUserProps) => {
    const [email, setEmail] = useState<any>();
    const [showInvalidAlert, setShowInvalidAlert] = useState<boolean>(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
    const [collaboratorNames, setCollaboratorNames] = useState<any[]>();

    useEffect(() => {
        const tripUsersRef = ref(db, `tripUsers/${tripId}`)
        get(tripUsersRef)
        .then((snapshot: any) => {
            const users = snapshot.val();
            for (let id in users) {
                listUsers(id)
                .then((name: string) => {
                    collaboratorNames?.push(name)
                })
                .catch(console.error)
            }
        })
    }, [])

	const handleChange = (e:any) => {
		setEmail(e.target.value);
	    setShowInvalidAlert(false);
		setShowSuccessAlert(false);
	}

	const handleSubmit = (e: any) => {
		e.preventDefault()

		// inviteUser(email, tripId)
        // .then((status: any) => {
		// 	if (status) {
		// 		setShowInvalidAlert(true)
		// 	} else {
		// 		setShowSuccessAlert(true)
		// 	}
		// })
	}

	const handleInvalidEmail = () => {
		return (
			<Alert variant='danger'>
				<p>There is no user registered with that email address.</p>
			</Alert>
		)
	}

	const handleSuccess = () => {
		return (
			<Alert variant='success'>
				<p>User can now collaborate on this trip.</p>
			</Alert>
		)
	}

	return (
		<div>
    		<h4>Invite To Edit</h4>
            <Col sm={12}>
            <strong>Current collaborators:</strong>
            <ListGroup>
                {collaboratorNames ? collaboratorNames.map(name => {
                return (
                    <ListGroupItem key={name}>
                    {name}
                    </ListGroupItem>
                )
                }) : <p>Invite some friends !</p>}
            </ListGroup>
            </Col>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Col sm={2}>
                        Email
                    </Col>
                    <Col sm={10}>
                        <FormControl
                            type="email"
                            name="email"
                            placeholder="friend@flashback.biz"
                            onChange={handleChange}
                        />
                        <Form.Text className="text-muted">
                        The email must already be associated with a Voyagr account.    
                        </Form.Text>
                    </Col>
                </Form.Group>

                <Form.Group>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" value="Submit">
                            Invite
                        </Button>
                    </Col>
                </Form.Group>
                {showInvalidAlert ? handleInvalidEmail() : null}
                {showSuccessAlert ? handleSuccess() : null}
            </Form>
		</div>
	)
}

export default InviteUser;
