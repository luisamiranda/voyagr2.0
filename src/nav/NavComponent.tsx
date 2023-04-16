import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { LinkContainer } from 'react-router-bootstrap'
// import { auth } from 'APP/db/firebase'
// import { browserHistory } from 'react-router'
// import { startNewTrip } from './utils/newTrip'

// function logout () {
//   auth
//   .signOut()
//   .then(() => browserHistory.push('/landing'))
//   .catch(function(error) {
//     let errorCode = error.code
//     let errorMessage = error.message
//     console.log('ERROR', errorCode, errorMessage)
//   })
// }


const NavComponent: React.FC = () => {
//   constructor () {
//     super()
//     this.state = {
//       user: null,
//       tripId: null,
//     }
//     this.renderButtons = this.renderButtons.bind(this)
//   }

//   componentWillMount () {
//     this.unsubscribe = auth.onAuthStateChanged((user) => {
//         this.setState({ user: user })
//     })
//   }

//   componentWillUnmount () {
//     this.unsubscribe()
//   }

//   renderButtons () {
//     if (this.state.user && this.state.user.emailVerified) {
//       return (
//         <div>
//           <Nav pullRight>
//             <LinkContainer to="/timeline">
//               <NavItem eventKey={1}>Timeline</NavItem>
//             </LinkContainer>
//             <NavItem onClick={(startNewTrip)} eventKey={1}>New Trip</NavItem>
//             <LinkContainer to="/suitcase">
//               <NavItem eventKey={2}>Suitcase</NavItem>
//             </LinkContainer>
//             <LinkContainer className="logout-button" active={false} onSelect={logout} to="/">
//               <NavItem eventKey={3}>Log Out</NavItem>
//             </LinkContainer>
//           </Nav>
//         </div>
//       )
//     }
//   }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">voyagr</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/suitcase">suitcase</Nav.Link>
                    <Nav.Link href="/newtrip">new trip</Nav.Link>
                    <Nav.Link href="/logout">logout</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavComponent;