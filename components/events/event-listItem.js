import Link from 'next/link';
import React from 'react';
import AddressIcon from '../icons/address-icon';
import RightArrowIcon from '../icons/arrow-right.-icon';
import DateIcon from '../icons/date-icon';
import Button from '../ui/button';
import classes from './event-item.module.css';
const EventItem = (props) => {
    const {title, image, date, location, id } = props;

    const humanReadeableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: "numeric"
    })

    const formattedAddress = location.replace(',', '\n');

    const explorelink = `/events/${id}`;
  return (
    <div>
      <li className={classes.item}>
        <img src={'/' + image} alt={title} />
        <div className={classes.content}>
            <div className={classes.summary}>
               <h2>{title}</h2> 
            </div>
            <div className={classes.date}>
                <DateIcon />
                <time datetime="">{humanReadeableDate}</time>
            </div>
            <div className={classes.address}>
                <AddressIcon />
                <address>
                {formattedAddress}
                </address>
            </div>
            <div className={classes.action}>
                <Button link={explorelink}>
                    <span>Explore More</span> 
                    <span className={classes.icon}><RightArrowIcon /></span>
                    </Button>
            </div>
        </div>
      </li>
    </div>
  )
}

export default EventItem
