import React from 'react'
import { connect } from 'react-redux'
import { Form, Button} from 'react-bootstrap'
import { editBackgroundColor, editTextColor } from '../../reducers/elements' //setElementZIndex

interface TextEditElementProps {
    elementId: any;
    handleSizeChange: any;
    selectedElement: any;
}

const EditElement = ({elementId, handleSizeChange, selectedElement}: TextEditElementProps): JSX.Element => {

  const handleBackgroundChange = (e: any) => {
    console.log(e.target)

    if (!e.target.value) e.target.value = "none"

    let elementToUpdate = {
      id: elementId,
      background: e.target.value
    }

    editBackgroundColor(elementToUpdate)
  }

  const handleColorChange = (e: any) => {
    let elementToUpdate = {
      id: elementId,
      color: e.target.value
    }

    editTextColor(elementToUpdate)
  }

    return (
      <div>
      <Form.Group controlId="formControlsSelect">
        <Form.Label>Select New Size</Form.Label>
        <Form.Select onChange={handleSizeChange} value={selectedElement.size} placeholder="select">
          <option value="large">Large</option>
          <option value="medium">Medium</option>
          <option value="small">Small</option>
        </Form.Select>

        <hr />
        <Form.Label>Select a new background color</Form.Label>
        <input onChange={handleBackgroundChange} type="color" />
        <Button onClick={handleBackgroundChange}>No background</Button>
        <hr />
        <Form.Label>Select a new text color</Form.Label>
        <input onChange={handleColorChange} type="color" />

      </Form.Group>


      </div>
    )
}


export default connect(state => state, { editBackgroundColor, editTextColor })(EditElement)