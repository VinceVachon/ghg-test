import React, { useState } from 'react';

import observationsData from '../../assets/data/observations.json';

import { ALL } from '../../app/constants';

import MapSection from '../../features/map/Map';
import ListSection from '../../features/list/List';
import Filters from '../../features/filters/Filters';

import './MapList.scss';

const MapList = () => {
    const [useActiveObservable, setActiveObservable] = useState(undefined);
    const [useZoomLevel, setZoomLevel] = useState(6);
    const [useFilteredObservations, setFilteredObservations] = useState(observationsData.features);

    console.log(observationsData);

    // Filter results with selected sensor
    function setSensorFilter(sensor) {
        let filteredData = [];

        // If sensor is set to ALL, set the default data
        if (sensor === ALL) {
            filteredData = observationsData.features;
        } else {
            filteredData = observationsData.features.filter(observable => {
                return observable.properties.sensor === sensor;
            })
        }

        setFilteredObservations(filteredData);
    }

    // TODO: optimize with a Debounce function
    function setDescriptionFilter(descritpionValue) {
        let filteredData = [];

        // If no description, set the default data
        if (descritpionValue === "" || descritpionValue.length <= 2) {
            filteredData = observationsData.features;
        } else {
            filteredData = observationsData.features.filter(observable => {
                return observable.properties.description.toLowerCase().indexOf(descritpionValue.toLowerCase()) !== -1;
            })
        }

        setFilteredObservations(filteredData);
    }

    // Set the selected id of the clicked observable
    function handleActiveObservableSelection(id) {
        setActiveObservable(id)
        setZoomLevel(8)
    }

    return (
        <React.Fragment>
            <div className="filters-container">
                <Filters
                    setSensorFilter={setSensorFilter}
                    setDescriptionFilter={setDescriptionFilter}
                    activeObservable={useActiveObservable}
                    observations={useFilteredObservations}
                    observationsData={observationsData}
                />
            </div>
            <div className="map-list-container">
                <ListSection
                    activeObservable={useActiveObservable}
                    setObservable={handleActiveObservableSelection}
                    observations={useFilteredObservations}
                />
                <MapSection
                    activeObservable={useActiveObservable}
                    setObservable={handleActiveObservableSelection}
                    observations={useFilteredObservations}
                    zoomLevel={useZoomLevel}
                />
            </div>
        </React.Fragment>
    );
}

export default MapList
