import React from 'react';
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/event-search';
import { useRouter } from 'next/router';
import Head from 'next/head';

const AllEventsPage = (props) => {
  const router = useRouter();
  const events = props.events;

  const findEventsHandler = (year,month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <Head>
        <title>All Events</title>
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList list={events} />
    </div>
  )
}

export const getStaticProps = async (ctx) => {
  const events = await getAllEvents();

  return {
    props:{
      events: events
    },
    revalidate: 60
  }
}

export default AllEventsPage
