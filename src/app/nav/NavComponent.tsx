import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../index'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { child, push, update } from 'firebase/database';
import { ref as dbRef} from 'firebase/database';
import { redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { LinkContainer } from 'react-router-bootstrap'
// import { browserHistory } from 'react-router'


const NavComponent: React.FC = () => {
    const [user, setUser] = useState<any>();
    const [uid, setUid] = useState<any>();
    const [tripId, setTripId] = useState<any>();

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            const uid = user.uid;
            setUid(uid);
        }
        });
    }, [user, auth])


    const logout = () => {
        signOut(auth).then(() => {
            navigate('/');
          }).catch((error) => {
            // An error happened.
          });
    }

    const startNewTrip = () => {
        
        const tripDefaultData = {
            name: 'A Trip',
            description: 'A description',
            startDate: '1/1/2000',
            startPage: " ",
        }
    
        const pageDefaultData = {
            nextPage: ' ',
            previousPage: ' ',
        }
    
        const newTripKey = push(child(dbRef(db), `/userTrips/${uid}`)).key
        console.log("TRIP KEY", newTripKey);
        const newPageKey = push(child(dbRef(db), `/tripPages/${newTripKey}`)).key
        console.log(newPageKey);
    
        //set the startPage to be the new page key
        tripDefaultData.startPage = newPageKey ? newPageKey : "";
    
        const updates: any = {}
        //creating trip in firebase db
        updates[`/tripInfo/${newTripKey}`] = tripDefaultData
        updates[`/userTrips/${uid}/${newTripKey}`] = newTripKey
        updates[`/tripUsers/${newTripKey}/${uid}`] = uid
    
        //creating first page of new trip in firebase db
        updates[`/tripPages/${newTripKey}/${newPageKey}`] = newPageKey
        updates[`/pageInfo/${newPageKey}`] = pageDefaultData
    
        return update(dbRef(db), updates)
        .then(() => {
            console.log("time to navigate")
            navigate(`/canvas/${newTripKey}/${newPageKey}`)
        })
        .catch(console.error)
    }


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
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                <Navbar.Brand href="/">voyagr</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/timeline">timeline</Nav.Link>
                    <Nav.Link href="/suitcase/">suitcase</Nav.Link>
                    <Nav.Link onClick={startNewTrip}>new trip</Nav.Link>
                    <Nav.Link href="/" onClick={logout}>logout</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavComponent;