import React from 'react'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './PageNavButtons.css';


interface PageNavButtonsProps {
  pageInfo: any;
  tripId: string;
  addNewPage: any;
}

const PageNavButtons = ({ pageInfo, tripId, addNewPage }: PageNavButtonsProps) => {
  let nextPageDisabled, previousPageDisabled;
  if (pageInfo) {
    nextPageDisabled = pageInfo.nextPage === ''
    previousPageDisabled = pageInfo.previousPage === ''
  }
  return (
    <ButtonGroup id="page-nav">
      <Button
        href={`/canvas/${tripId}/${pageInfo.previousPage}`}
        disabled={previousPageDisabled}
      >
        Previous Page
      </Button>
      <Button
        href={`/canvas/${tripId}/${pageInfo.nextPage}`}
        disabled={nextPageDisabled}
      >
        Next Page
      </Button>
    {/*if next page is enabled, then add a page is disabled*/}
      <Button
        onClick={addNewPage}
        disabled={!nextPageDisabled}
      >
        Add A Page
      </Button>
    </ButtonGroup>
  )
}

export default PageNavButtons