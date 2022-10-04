import { useRouter } from 'next/router';
import React from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/result-title';
import Button from '../../components/ui/button';
import {getFilteredEvents} from '../../dummy-data';
import ErrorAlert from '../../components/ui/error-alert'
const FileredEvents = () => {
  const router = useRouter();

  const filterData = router.query.events;

  if(!filterData){
    return <p className='center'>Loading</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if(
    isNaN(numYear) || 
    isNaN(numMonth) || 
    numYear > 2030 || 
    numYear < 2021 || 
    numMonth < 1 || 
    numMonth > 12) {
      return (
        <>
        <ErrorAlert>
      <p>Invalid filter, Please adjust your date</p>
      </ErrorAlert>
      <div className='center'>
      <Button link='/events'> Show All Events</Button>
      </div>
      </>
      )
    }

    const fileredEvents = getFilteredEvents({
      year : numYear,
      month: numMonth,
    });

    if(!fileredEvents || fileredEvents.length === 0){
      return (<>
      <ErrorAlert>
      <p>No events fount for this date</p>
      </ErrorAlert>
      <div className='center'>
      <Button link='/events'> Show All Events</Button>
      </div>
      </>
      )
    }

    const date = new Date(numYear,numMonth -1)

  
  return (
    <div>
      <ResultsTitle date={date}/> 
      <EventList list={fileredEvents} />
    </div>
  )
}

export default FileredEvents
