import React from 'react'
import EventItem from './event-listItem';
import classes from './event-list.module.css';
const EventList = (props) => {
    const {list} = props;
  return (
    <div>
      <ul className={classes.list}>
        {list.map(event => <EventItem 
        key={event.id} 
        id={event.id} 
        image={event.image}
        title={event.title} 
        location={event.location} 
        date={event.date} />)}
      </ul>
    </div>
  )
}

export default EventList
