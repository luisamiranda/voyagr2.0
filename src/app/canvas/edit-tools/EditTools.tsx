import React from 'react'
import { Col } from 'react-bootstrap'
import Toolbox from './Toolbox'

interface EditToolsProps {
    tripInfo: any;
    tripInfoRef: any;
    selected: boolean;
    tripId: string | undefined;
    pageInfo: any; //should be all set up for page info view/edit
    pageInfoRef: any; //should be all set up for page info view/edit
    pageId: any;
}

const EditTools = ({ tripInfo, tripInfoRef, selected, tripId, pageInfo, pageInfoRef, pageId }: EditToolsProps): JSX.Element =>
  <Col lg={3}>
    <Toolbox
      tripInfo={tripInfo}
      tripInfoRef={tripInfoRef}
      selected={selected}
      tripId={tripId}
      pageInfo={pageInfo} //should be all set up for page info view/edit
      pageInfoRef={pageInfoRef} //should be all set up for page info view/edit
      pageId={pageId}
    />
  </Col>

export default EditTools