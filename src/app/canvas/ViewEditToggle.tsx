import React, { MouseEventHandler } from 'react'
import Button from 'react-bootstrap/Button'

export interface ToggleProps extends JSX.IntrinsicAttributes {
    editable: boolean;
    toggleMode: MouseEventHandler;
}

const ViewEditToggle = ({ editable, toggleMode }: ToggleProps ): JSX.Element =>
  <Button onClick={toggleMode}>
    {editable ? 'View' : 'Edit' }
  </Button>

export default ViewEditToggle;