import React from 'react'
import Form from 'react-bootstrap/Form'

interface EditPhotoOrVideoElementProps {
    selectedElement: any;
    handleSizeChange: any;
}

const EditPhotoOrVideoElement = ({selectedElement, handleSizeChange}: EditPhotoOrVideoElementProps): JSX.Element => {

    return (
      <Form.Group controlId="formControlsSelect">
        <Form.Label>Select New Size</Form.Label>
        <Form.Select value={selectedElement.size} onChange={handleSizeChange} placeholder="select">
          <option value="native">Original Size</option>
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </Form.Select>
      </Form.Group>
    )
}

export default EditPhotoOrVideoElement;
