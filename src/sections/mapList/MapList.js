import React, { useState, useEffect } from 'react';

import observationsData from '../../assets/data/observations.json';

import MapSection from '../../features/map/Map';
import ListSection from '../../features/list/List';

import './MapList.scss';

const MapList = () => {
    const [useActiveObservable, setActiveObservable] = useState(undefined);

    console.log('update')
    const observations = observationsData;


    return (
        <div className="map-list-container">
            <MapSection
                activeObservable={useActiveObservable}
                setObservable={setActiveObservable}
                observations={observations}
            />
            <ListSection
                activeObservable={useActiveObservable}
                setObservable={setActiveObservable}
                observations={observations}
            />
        </div>
    );
}

export default MapList
