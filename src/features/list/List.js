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


    // Scroll in page to the active/selected observable in the list
    function scrollToActiveObservable() {
        if (activeObservable) {
            const activeObservableElement = document.getElementById(`observable-id-${activeObservable}`);
            if (activeObservableElement) {
                const activeObservableElementPosition = getOffset(activeObservableElement);
                window.scrollTo(activeObservableElementPosition.left, activeObservableElementPosition.top - 100);
            }
        }
    }

    // Check if at least one item is visible
    const hasResult = observations && observations.length > 0 && observations.some(observation => observation.visible === true)

    return (
        <div className="list-section-container">
            {hasResult ?
                observations && observations.length > 0 &&
                observations.map((observation, i) => {
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
                })
                :
                <p className="no-results">No Results</p>
            }

            <div className="back-to-top-container">
                <button onClick={() => window.scrollTo(0, 0)} className="button primary back-to-top">Back to Top</button>
            </div>
        </div>
    );
}

export default ListSection;
