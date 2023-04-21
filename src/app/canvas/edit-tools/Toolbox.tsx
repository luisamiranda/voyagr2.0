import React,  {useState, useEffect} from 'react'

//LIBRARIES
import { connect } from 'react-redux'
import { auth, db } from '../../../index'
import { onAuthStateChanged } from 'firebase/auth'
import { onValue, update} from 'firebase/database'
import { ref as dbRef} from 'firebase/database'
import { DefaultPlayer as Video} from 'react-html5video'

import Button from 'react-bootstrap/Button';
// import Accordian from 'react-bootstrap/Accordian';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Col from 'react-bootstrap/Col';

//COMPONENTS
import EditTextElement from './EditTextElement'
import EditPhotoOrVideoElement from './EditPhotoOrVideoElement'
import InviteUser from './InviteUser'

//REDUCER
import { createTextBox, addAPhoto, setSize, addAVideo, setElementZIndex } from '../../reducers/elements'

interface ToolboxProps {
    tripInfo: any;
    tripInfoRef: any;
    selected: any;
    tripId: string | undefined;
    pageInfo: any; //should be all set up for page info view/edit
    pageInfoRef: any; //should be all set up for page info view/edit
    pageId: any;
}

const Toolbox = ({ tripInfo, tripInfoRef, selected, tripId, pageInfo, pageInfoRef, pageId }: ToolboxProps): JSX.Element => {
    // const [address, setAddress] = useState<any>();
    const [photos, setPhotos] = useState<any>();
    const [videos, setVideos] = useState<any>();
    // eslint-disable-next-line
    const [title, setTitle] = useState<any>();
    // eslint-disable-next-line
    const [description, setDescription] = useState<any>();
    // eslint-disable-next-line
    const [startDate, setStartDate] = useState<any>();
    // eslint-disable-next-line
    const [type, setType] = useState<any>();

    const photoKeys = photos && Object.keys(photos)
    const videoKeys = videos && Object.keys(videos)

    const path = `https://voyagr.co/canvas/${tripId}/${pageId}`

    let selectedElement;
    if (selected) {
      // selectedElement = elements[selected.type][selected.id]
    }

    const makeRandomId = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }

    const handleDepth = (e: any) => {
        //first we are checking if the selected item has a zIndex and
        //if not set it to one
        if (selected.zIndex) {
            selected.zIndex = 1;
        }
        //Here we either add or reduce the zIndex
        const newZIndex = e.target.value === "plus" ? ++selected.zIndex : --selected.zIndex
    
        let elementToUpdate = {
          id: selected.id,
          type: selected.type,
          zIndex: newZIndex,
        }
    
        //send this updated element into the reducer to update the state
        setElementZIndex(elementToUpdate)
    }

    const handleTripInfoSubmit = (e: any) => {
        e.preventDefault()
    
        const infoToUpdate = {
          name: title,
          description: description,
          startDate: startDate
        }
    
        update(tripInfoRef, infoToUpdate)
    }
    
    const handleTripInfoInput = (e: any) => {
      const value = e.target.value
      const type = e.target.name

      setTitle(value.name)
      setDescription(value.description)
      setStartDate(value.startDate)
      setType(type)
    }
    
    const handleSizeChange = (e: any) => {
      let elementToUpdateSize = {
        size: e.target.value,
        id: selected.id,
        type: selected.type,
      }
  
      setSize(elementToUpdateSize)
    }
  
    const addNewTextBox = (e: any) => {
      e.preventDefault()
      
      let newTextBox = {
        [makeRandomId()]: {
          top: 100,
          left: 100,
          size: 'small',
          text: 'i went on a trip',
        }
      }
    
      createTextBox(newTextBox)
    }
    
    const addVideo = (e: any) => {
      console.log("VIDEOS", videos);
      console.log("VIDEOKEYS", videoKeys)
      let newVideo = {
        [makeRandomId()]: {
          source: e.target.getAttribute('id'),
          top: 300,
          left: 300,
          size: 'medium',
        }
      }
  
      addAVideo(newVideo)
    }
    
    const addPhoto = (e: any) => {

      let newPhoto = {
        [makeRandomId()]: {
          source: e.target.getAttribute("id"),
          top: 200,
          left: 200,
          size: 'small',
        }
      }
      addAPhoto(newPhoto)
    }
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid

            const dbUserPhotosRef = dbRef(db, `photos/${uid}`);
            onValue(dbUserPhotosRef, (snapshot) => {
              setPhotos(snapshot.val())
            });

            const dbUserVideoRef = dbRef(db, `videos/${uid}`);
            onValue(dbUserVideoRef, (snapshot) => {
              setVideos(snapshot.val());
            })
          }
        })
    },[])

      return (
        <div id="toolbox-container">
            <Card key="1" onClick={addNewTextBox}>
                <Card.Header>Add Text Box</Card.Header>
            </Card>
            <Card key="2">
                <Card.Header>Add Photo</Card.Header>
              { photos ?
                //if the user has photos we will map over them
                //and display them all
                <div id="photo-Card">
                  {photoKeys ? photoKeys.map((photoKey: any) => {
                    return (
                      <div className="drawer-photo" key={photoKey}>
                        <img src={photos[photoKey].downloadURL} width={200} alt={photoKey}/>
                        <Button id={photos[photoKey].downloadURL} onClick={addPhoto}>+</Button>
                      </div>)
                  }) : null}
                </div>
              :
              //if the user has no uploaded photos this will display
                <div>
                  You don't have any photos yet!
                <br />
                  Head over to your <a href="/suitcase">suitcase</a> to upload some pictures!
                </div>
            }
            </Card>

            <Card key="3">
                <Card.Header>Add a Video</Card.Header>
              { videos ?
                <div>
                  {videoKeys ? videoKeys.map((videoKey: any) => {
                      return (
                        <div key={videoKey}>
                            <Video
                            value={videoKey}
                            className={`element-size-small`}
                            autoPlay
                            loop
                            muted
                            controls={[]}
                            >
                                <source src={videos[videoKey].downloadURL} type="video/webm" />
                            </Video>
                            <Button id={videos[videoKey].downloadURL} onClick={addVideo}>+</Button>
                        </div>
                      )
                    }) : null }
                </div>
                :
                <div>You have no videos yet! <br/> Head over to your <a href="/suitcase">suitcase</a> to upload some. </div>
              }
            </Card>
            
            <Card key="4">
              <Card.Header>Edit Trip Information</Card.Header>
              <strong>Edit your trip information</strong>
            { tripInfo &&
              <Form >
                  <Form.Group controlId="Title">
                    <Col sm={3}>
                      Title
                    </Col>
                    <Col sm={9}>
                      <Form.Control onChange={handleTripInfoInput} name="title" defaultValue={tripInfo.name}  />
                    </Col>
                  </Form.Group>
  
                  <FormGroup controlId="description">
                    <Col sm={3}>
                      Description
                    </Col>
                    <Col sm={9}>
                      <Form.Control name="description" onChange={handleTripInfoInput} defaultValue={tripInfo.description} />
                    </Col>
                  </FormGroup>
  
                  <Form.Group controlId="startDate">
                    <Col sm={3}>
                      Start Date
                    </Col>
                    <Col sm={9}>
                      <Form.Control name="startDate" onChange={handleTripInfoInput} defaultValue={tripInfo.startDate} />
                    </Col>
                  </Form.Group>
  
                  <Form.Group>
                    <Col smOffset={3} sm={10}>
                      <Button type="submit" onSubmit={handleTripInfoSubmit}>
                        Submit
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
                }
            </Card>
            <Card key="5">
                <Card.Header>Edit Element</Card.Header>
              { selected ?
                //if there is a selected item
                <div>
                  {
                    //we will render out different components
                    //based off what different element is selected
                    selected.type === "textBox" ?
                    <EditTextElement elementId={selected.id} handleSizeChange={handleSizeChange} selectedElement={selectedElement}/>
                    : <EditPhotoOrVideoElement handleSizeChange={handleSizeChange} selectedElement={selectedElement}/>
                  }
                  <hr/>
                  <strong>Depth</strong>
                  <br/>
                  <Button onClick={handleDepth} value="minus">-</Button>
                  <Button onClick={handleDepth} value="plus">+</Button>
                </div>
                //if there is no selected element
                : <strong>Please pick an item to edit</strong>
              }
            </Card>
            <Card key="6">
              <Card.Header>Invite your friends!</Card.Header>
              <h3>To View</h3>
                Share This Link: {path}
              <InviteUser tripId={tripId} pageId={pageId} />
            </Card>
        </div>
      )
}

const mapStateToProps = (state: any) => state
// export default Toolbox;
export default connect(mapStateToProps, { createTextBox, addAPhoto, setSize, addAVideo, setElementZIndex })(Toolbox)
