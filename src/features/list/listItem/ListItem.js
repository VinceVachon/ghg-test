import React from 'react';

import { timeConverter } from '../../../app/utils';

import './ListItem.scss';

const ListItem = (props) => {
    const { activeObservable, itemIndex, observation, setObservable } = props;

    const { properties } = observation;
    const date = timeConverter(properties.observed_on);

    return (
        <div onClick={() => setObservable(itemIndex)} key={observation.properties.description} id={`observable-id-${itemIndex}`} className={`list-item-content ${activeObservable === itemIndex ? 'active' : ''}`}>
            <p className="description">{properties.description}</p>
            <div className="item-info">
                <p className={`sensor-pill ${properties.sensor}`}><span className="sensor-name">{properties.sensor}</span></p>
                <p className="observed">{date}</p>
            </div>
        </div>
    );
}

export default ListItem;
