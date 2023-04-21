import React, {useEffect, useState} from 'react'
// import update from 'react/lib/update'
import { auth, db } from '../../index'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onValue, remove } from 'firebase/database'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'

const Timeline: React.FC = () => {
    // eslint-disable-next-line
    const [user, setUser] = useState<any>();
    const [uid, setUid] = useState<any>();
    const [trips, setTrips] = useState<any>();
    const [tripIds, setTripIds] = useState<any>();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setUid(user.uid);
                console.log("USER", user.uid);
            }
        })
    }, []);

    useEffect(() => {
        // get the ids of that user's trips
        const tripsRef = ref(db, `userTrips/${uid}`)
        onValue(tripsRef, (snapshot: any) => {
            const userTrips = snapshot.val();
            console.log("userTrips", snapshot.val())
            let tripIds;

            if (userTrips) {
                tripIds = Object.keys(userTrips);
                setTripIds(tripIds);
            }

            // get the info for that user's trips
            if (tripIds) tripIds.map((tripId: any) => {
                const tripIdRef = ref(db, `tripInfo/${tripId}`)
                onValue(tripIdRef, snap => {
                    // add the trips to the state
                    setTrips(snap.val())
                })
                return tripId;
            })
        })
    }, [uid])



    const deleteTrip = (e: any) => {
        const confirmDelete = window.confirm('Deleting this trip will only remove it from your own personal timeline; any other contributors will still have access. Are you sure you want to continue?')

        if (confirmDelete) {
            const tripId = e.target.value
            const deleteRef = ref(db, `userTrips/${uid}/${tripId}`);
            remove(deleteRef)
        }
    }

    return (
      <div>
            <div>
                <Container>
                    <Col lg={12}>
                    <h1>Timeline</h1>
                    <h4>Click on a trip to edit, or click above to start a new trip.</h4>
                    </Col>

                    {/* trip boxes */}
                    {trips && tripIds ? tripIds.map((tripId: any) => {
                    return (
                        <Col lg={6} key={tripId}>
                        <div className="trip-card">
                            <a href={`/canvas/${tripId}/${trips.startPage}`}>
                            <Image src="https://picsum.photos/640/360" thumbnail />
                            <h3>{trips.name}</h3>
                            </a>
                            {/* trip info */}
                            <p>
                            {trips.description}
                            </p>
                            <p>
                            <strong>Start date:</strong> {trips.startDate}
                            </p>
                            {/* delete button */}
                            <Button
                            // bsStyle="danger"
                            // bsSize="xsmall"
                            onClick={deleteTrip}
                            value={tripId}
                            >
                            Delete trip
                            </Button>
                            </div>
                        </Col>
                    )
                    }) :
                    <Col lg={12}>
                    <h4>No trips to show. Start putting some images in your Suitcase.</h4>
                    </Col>
                }
                </Container>
                </div>
      </div>
    )
}

export default Timeline;