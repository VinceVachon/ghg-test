import React, { useState, useEffect } from 'react';

import observationsData from '../../assets/data/observations.json';

import { ALL } from '../../app/constants';

import MapSection from '../../features/map/Map';
import ListSection from '../../features/list/List';
import Filters from '../../features/filters/Filters';

import './MapList.scss';

const MapList = () => {
    const [useLoading, setLoading] = useState(false);
    const [useActiveObservable, setActiveObservable] = useState(undefined);
    const [useZoomLevel, setZoomLevel] = useState(6);
    const [useFilteredObservations, setFilteredObservations] = useState(observationsData.features);

    console.log(observationsData);

    function setSensorFilter(sensor) {
        let filteredData = [];

        if (sensor === ALL) {
            filteredData = observationsData.features;
        } else {
            filteredData = observationsData.features.filter(observable => {
                return observable.properties.sensor === sensor;
            })
        }

        setFilteredObservations(filteredData);
    }

    function handleActiveObservableSelection(id) {
        setActiveObservable(id)
        setZoomLevel(8)
    }

    return (
        <React.Fragment>
            {useLoading ?
                <p>Loading...</p>
                :
                <React.Fragment>
                    <div className="filters-container">
                        <Filters
                            setSensorFilter={setSensorFilter}
                            activeObservable={useActiveObservable}
                            observations={useFilteredObservations}
                            observationsData={observationsData}
                        />
                    </div>
                    <div className="map-list-container">
                        <div className="filter-list-container">
                            <ListSection
                                activeObservable={useActiveObservable}
                                setObservable={handleActiveObservableSelection}
                                observations={useFilteredObservations}
                            />
                        </div>
                        <MapSection
                            activeObservable={useActiveObservable}
                            setObservable={handleActiveObservableSelection}
                            observations={useFilteredObservations}
                            zoomLevel={useZoomLevel}
                        />
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default MapList
