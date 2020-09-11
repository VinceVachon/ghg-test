import React, { useEffect } from 'react';

import { getOffset, timeConverter } from '../../app/utils';

import './List.scss';

const ListSection = (props) => {
    const { activeObservable, observations, setObservable } = props;

    useEffect(() => {
        scrollToActiveObservable();
    }, [activeObservable])

    function scrollToActiveObservable() {
        if (activeObservable) {
            const activeObservableElement = document.getElementById(`observable-id-${activeObservable}`);
            if (activeObservableElement) {
                const activeObservableElementPosition = getOffset(activeObservableElement);
                window.scrollTo(activeObservableElementPosition.left, activeObservableElementPosition.top - 100);
            }
        }
    }

    return (
        <div className="list-section-container">
            <h1>Observations</h1>

            {observations && observations.features.map((observation, i) => {
                if (i <= 100) {
                    const { properties } = observation;
                    const date = timeConverter(properties.observed_on);

                    return (
                        <div onClick={() => setObservable(i)} key={observation.properties.description} id={`observable-id-${i}`} className={`list-item-content ${activeObservable === i ? 'active' : ''}`}>
                            <p className="description">{properties.description}</p>
                            <p className="sensor">Sensor: {properties.sensor}</p>
                            <p className="observed">Observed on: {date}</p>
                        </div>
                    )
                }
            })}
        </div>
    );
}

export default ListSection;
