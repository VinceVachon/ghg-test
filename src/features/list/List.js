import React, { useEffect } from 'react';

import { getOffset } from '../../app/utils';

import ListItem from './listItem/ListItem';

import './List.scss';

const ListSection = (props) => {
    const { activeObservable, observations, setObservable } = props;

    useEffect(() => {
        scrollToActiveObservable();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                if (observation.visible !== false) {
                    return <ListItem
                        key={i}
                        activeObservable={activeObservable}
                        observation={observation}
                        setObservable={setObservable}
                        itemIndex={i}
                    />
                }
                return false;
            })}

            <div className="back-to-top-container">
                <button onClick={() => window.scrollTo(0, 0)} className="button primary back-to-top">Back to Top</button>
            </div>
        </div>
    );
}

export default ListSection;
