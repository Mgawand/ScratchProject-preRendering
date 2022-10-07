import { useRouter } from 'next/router';
import React , {useEffect, useState} from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/result-title';
import Button from '../../components/ui/button';
import {getFilteredEvents} from '../../helpers/api-util';
import ErrorAlert from '../../components/ui/error-alert';
import useSWR from 'swr';
import Head from 'next/head';


const FileredEvents = (props) => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.events;
  const {data, error} = useSWR(`https://nextjs-44e3a-default-rtdb.firebaseio.com/events.json`, (url) => fetch(url).then(res => res.json()));

  useEffect(() => {
  if(data) {
    const events = []

    for(const key in data){
        events.push({
            id: key,
            ...data[key]
        });
    }
    setLoadedEvents(events);
  }
  }, [data])

  let pageHeadData = 
  <Head>
    <title>Filtered events</title>
    <meta name="desccription" content={`All events for ${numMonth}/${numYear}`} />
  </Head>
  
  if(!loadedEvents){
    return <>
    {pageHeadData}
    <p className='center'>Loading</p>
    </>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

    pageHeadData = (   
    <Head>
    <title>Filtered events</title>
    <meta name="desccription" content={'A list of filtered events'} />
    </Head>
  )

  if(isNaN(numYear) || 
  isNaN(numMonth) || 
  numYear > 2030 || 
  numYear < 2021 || 
  numMonth < 1 || 
  numMonth > 12 || error) {
      return (
        <>
          {pageHeadData}
        <ErrorAlert>
      <p>Invalid filter, Please adjust your date</p>
      </ErrorAlert>
      <div className='center'>
      <Button link='/events'> Show All Events</Button>
      </div>
      </>
      )
    }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });


    if(!filteredEvents || filteredEvents.length === 0){
      return (<>
        {pageHeadData}

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
      {pageHeadData}
      <ResultsTitle date={date}/> 
      <EventList list={filteredEvents} />
    </div>
  )
}

// export const getServerSideProps = async (context) => {
//   const {params} = context;

//   const filterData = params.events;
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if(
//     isNaN(numYear) || 
//     isNaN(numMonth) || 
//     numYear > 2030 || 
//     numYear < 2021 || 
//     numMonth < 1 || 
//     numMonth > 12) {
//       return {
//         props: {hasError: true},
//         // notFound: true,
//       }
//     }

//     const fileredEvents = await getFilteredEvents({
//       year : numYear,
//       month: numMonth,
//     });

//   return {
//     props:{
//       events:fileredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FileredEvents
