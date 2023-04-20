import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { DefaultPlayer as Video } from 'react-html5video'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { auth, db } from '../../index'
import { onAuthStateChanged } from 'firebase/auth';
import { set, onValue } from 'firebase/database';
import { ref as dbRef} from 'firebase/database';
import { getStorage, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";

import './Suitcase.css';

const Suitcase: React.FC = () => {
  const [user, setUser] = useState<any>();
  const [uid, setUid] = useState<string>()
  const [files, setFiles] = useState<FileList>();
  const [mediaType, setMediaType] = useState<string>("photos");
  const [trips, setTrips] = useState<any>();
  const [photos, setPhotos] = useState<any[]>();
  const [videos, setVideos] = useState<any[]>();

  const storage = getStorage();
  const navigate = useNavigate();

  const photoKeys = photos && Object.keys(photos)
  const videoKeys = videos && Object.keys(videos)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        const uid = user.uid;
        setUid(uid);
        // ...
      } else {
        navigate('/');
      }
    });
  }, [user, auth, navigate])
  
  useEffect(() => {
    const photosRef = dbRef(db, `photos/${uid}`);
    onValue(photosRef, (snapshot) => {
      const data = snapshot.val();
      setPhotos(data);
    });
  }, [user, db])

  useEffect(() => {
    const videosRef = dbRef(db, `videos/${uid}`);
    onValue(videosRef, (snapshot) => {
      const data = snapshot.val();
      setVideos(data);
    });
  }, [user, db])

  const handleUploadChange = (e: any) => {
    e.preventDefault();
    setFiles(e.target.files);
  }

  const handleMediaTypeChange = (e: any) => {
    e.preventDefault();
    setMediaType(e.target.value);
  }
  
  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filesRef = storageRef(storage, `${uid}/${file.name}`);
        const uploadTask = uploadBytesResumable(filesRef, file);

        uploadTask.on('state_changed',
        (snapshot) => {
          console.log("Bytes Transferred = ", snapshot.bytesTransferred)
        },
        (error) => {
          console.error("Error = ", error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const trimmedFileName = file.name.split(".")
            const normFileName = trimmedFileName[0].split(" ").join("%20")
 
            const userPhotosRef = dbRef(db, `${mediaType}/${uid}/${normFileName}`)
            set(userPhotosRef, {downloadURL})
          });

          alert('Upload successful!');
        });
      }
    }
  }

  return (
    <div id="suitcase-container">
      {/* media display */}
      <div id="souvenirs">
          <h1>Your Souvenirs</h1><br />
          { photos && photoKeys ?  
            photoKeys.map((photoKey: any) => {
                let photo = photos[photoKey];
                let src = photo.downloadURL;

                return (
                  <div key={photoKey} style={{
                    display: 'inline-block',
                    margin: 1 + 'em',
                  }}>
                    <img src={src} height="300px" />
                  </div>
                )
              }) 
              : <p>Upload some photos!</p>}
            
            { videos && videoKeys ?  
              videoKeys.map((videoKey: any) => {
                let video = videos[videoKey];
                let src = video.downloadURL;

                return (
                  <div 
                  key={videoKey} 
                  onClick={() => console.log("VIDEO", video)}
                  style={{
                    display: 'inline-block',
                    margin: 1 + 'em',
                  }}>
                    <Video
                        value={videoKey}
                        type={video}
                        className={`element-size-small`}
                        autoPlay
                        loop
                        muted
                        controls={[]}
                        >
                      <source src={src} />
                      <track label="English" kind="subtitles" srcLang="en" default />
                    </Video>
                  </div>
                )
              }) 
              : <p>Upload some photos!</p>}
        </div>
      { user &&
        <div id="suitcase flex-container">
          <div id="flex-item">
            <h1>Welcome back, {user.email}! </h1>
            <h4>This is your suitcase. Stash your photos and videos here until you create your trip.</h4>
          </div>
          <div id="upload flex-item">
            <Card>
              <Card.Body>
              <Form className="file-upload"  onSubmit={handleSubmit} >
                <Form.Group controlId="FileUploadMultiple" className="mb-3">
                  <Form.Control type="file" multiple onChange={handleUploadChange}/>
                </Form.Group>
                <p className="help-block">
                  File types supported: .jpg, .png, .gif, .mp4, .mov, .mp3
                </p>

                {/*  media type select */}
                <Form.Group>
                  <Form.Select
                    id="Form.Select.MediaType"
                    aria-label="media type"
                    placeholder="Select photos or videos"
                    onChange={handleMediaTypeChange}
                  >
                    <option value="photos">photos</option>
                    <option value="videos">videos</option>
                  </Form.Select>
                </Form.Group>
                <p className="help-block">
                  {/* File Types Supported: Video, Pictures */}
                </p>

                {/* trip selector */}
                <Form.Group>
                  <Form.Label>Add to trip (optional)</Form.Label> <br />
                  <Form.Select
                    id="Form.Select.Trip"
                    aria-label="trip select"
                    >
                  <option value="select">select</option>
                  {trips ? trips.tripIds.map((tripId: number, idx: number) => {
                    return (
                      <option key={idx} value={tripId}>{trips[tripId]}</option>
                    )
                  }) : <option>You don't have any trips yet.</option> }
                  </Form.Select> 
                </Form.Group>

                <br />

                <Button type="submit">Upload</Button>
              </Form>
            </Card.Body>
          </Card>
          </div>
        </div>
        }
        <br />
    </div>
  );
}

export default Suitcase;