import React from 'react'
import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'

import Signup from './Signup'
import Login from './Login'
// import OAuth from './OAuth'
// import { auth } from '../../index' // even though it isn't used, it initializes firebase auth

import './Landing.css'

const Landing: React.FC = () => {

    return (
    <div id="landing">
        <CardGroup>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Sign up</Card.Title>
                    <Signup />
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Log in</Card.Title>
                    <Login />
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>OAuth</Card.Title>
                    <Login />
                </Card.Body>
            </Card>

        </CardGroup>
    </div>
    )

}

export default Landing;