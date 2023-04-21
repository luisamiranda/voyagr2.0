import React, { useState, useEffect } from 'react'
// import { Provider } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { auth, db } from '../../index'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, ref, push, update } from 'firebase/database'

import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

// import {createStore, applyMiddleware} from 'redux'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import logger from 'redux-logger'
// import rootReducer from '../reducers'

import Canvas from './Canvas'
import EditTools from './edit-tools/EditTools'
import PageNavButtons from './PageNavButtons'
// import ViewEditToggle from './ViewEditToggle'

const CanvasContainer: React.FC =  () => {
    const [selected, setSelected] = useState<any>();
    // const [canvasStore, setCanvasStore] = useState<any>();
    const [editable, setEditable] = useState<boolean>(false);
    const [uid,setUid] = useState<any>();
    // eslint-disable-next-line
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [tripInfo, setTripInfo] = useState<any>();
    const [tripInfoRef, setTripInfoRef] = useState<any>();
    const [pageInfo, setPageInfo] = useState<any>();
    const [pageInfoRef, setPageInfoRef] = useState<any>();

    const { tripId, pageId } = useParams();

        
    // const middlewares = [logger];
    
    // const store = createStore(rootReducer, applyMiddleware(...middlewares));

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUid(uid);
        }
        });
    }, [uid])

    useEffect(() => {
        // const pageActionsRef = ref(db, `pageActions/${pageId}`);
        const tripUsersRef = ref(db, `tripUsers/${tripId}`);
        const tripInfoRef = ref(db, `tripInfo/${tripId}`);
        const pageInfoRef = ref(db, `pageInfo/${pageId}`)

        setTripInfoRef(tripInfoRef);
        setPageInfoRef(pageInfoRef);
    
        onValue(tripInfoRef, snapshot => {
            setTripInfo(snapshot.val());
        });
        
        onValue(pageInfoRef, snapshot => {
            setPageInfo(snapshot.val());
        });
        //get the object of users that belong to this trip from Firebase db
        onValue(tripUsersRef, snapshot => {
            let tripUsers = snapshot.val();
            //get an array of values from the tripUsers object and check current user
            let isCollaborator = Object.values(tripUsers).includes(uid)
            //if current user is in the array, then they can edit, else they can't
            setEditable(isCollaborator);
            setCanEdit(isCollaborator);
        })
    },[pageId, tripId, uid])

    const toggleMode = () => {
        console.log("TOGGLE CLICKED!")
        setEditable(!editable);
    }

    //this function is called from inside page when we move an element
    const selectElement = (type: string, id: number, zIndex: number) => {
      setSelected({id, type, zIndex});
    }

    //this function gets passed down to Page so that selected is cleared before delete
    //otherwise there is a bug when you delete the currently selected element
    const clearSelectedIfDeleted = (type: any, id: any) => {
        if (selected && type === selected.type && id === selected.id) {
            setSelected(null);
        }
    }


    const addNewPage = (e: any) => {
        const pageDefaultData = {
            previousPage: pageId,
            nextPage: '',
        }

        const newPageRef = ref(db, `/tripPages/${tripId}`)
        const newPageKey = push(newPageRef).key
          
        const updates: any = {}
        //creating first page of new trip in firebase db
        updates[`/tripPages/${tripId}/${newPageKey}`] = newPageKey
        updates[`/pageInfo/${newPageKey}`] = pageDefaultData
        updates[`/pageInfo/${pageId}/nextPage`] = newPageKey
          
        return update(ref(db), updates)
        .then(() => {
            console.log("time to navigate")
            navigate(`/canvas/${tripId}/${newPageKey}`)
        })
        .catch(console.error)
    }

    return (
      <div id="canvas">
        <Container id="canvas-header">
          <Col lg={12}>
            <ButtonToolbar className="page-and-view-buttons">
                <Button onClick={toggleMode}>
                    {editable ? 'View' : 'Edit' }
                </Button>
                {pageInfo && tripId ?
                <PageNavButtons
                  pageInfo={pageInfo}
                  tripId={tripId}
                  addNewPage={addNewPage}
                />
                : null
                }
            </ButtonToolbar>
          {
            tripInfo ?
            <div>
              <h2>{`${tripInfo.name}, ${tripInfo.description}, ${tripInfo.startDate}`}</h2>
            </div>
            : null
          }
          </Col>
        </Container>
        {/* <Provider store={store}> */}
          <Container id="canvas-wrapper">
            <EditTools
            tripInfo={tripInfo}
            tripInfoRef={tripInfoRef}
            selected={selected}
            tripId={tripId}
            pageInfo={pageInfo} //should be all set up for page info view/edit
            pageInfoRef={pageInfoRef} //should be all set up for page info view/edit
            pageId={pageId}
            />
            <Col lg={9}>
              <Canvas
                editable={editable}
                selectElement={selectElement}
                clearSelectedIfDeleted={clearSelectedIfDeleted}
              />
            </Col>
          </Container>
        {/* </Provider> */}
      </div>
    )
}

export default CanvasContainer;