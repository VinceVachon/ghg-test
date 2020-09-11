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
            {observations && observations.map((observation, i) => {
                // if (i <= 100) {
                const { properties } = observation;
                const date = timeConverter(properties.observed_on);

                return (
                    <div onClick={() => setObservable(i)} key={observation.properties.description} id={`observable-id-${i}`} className={`list-item-content ${activeObservable === i ? 'active' : ''}`}>
                        <p className="description">{properties.description}</p>
                        <div className="item-info">
                            <p className={`sensor-pill ${properties.sensor}`}><span className="sensor-name">{properties.sensor}</span></p>
                            <p className="observed">{date}</p>
                        </div>
                    </div>
                )
                // }
            })}

            <div className="back-to-top-container">
                <button onClick={() => window.scrollTo(0, 0)} className="button primary back-to-top">Back to Top</button>
            </div>
        </div>
    );
}

export default ListSection;
