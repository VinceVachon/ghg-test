import React, { useState, useEffect } from 'react';

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

    const [useActiveFilters, setActiveFilters] = useState({});

    const [useDescriptionFilterValue, setDescriptionFilterValue] = useState();
    const [useSensorFilterValue, setSensorFilterValue] = useState(ALL);

    useEffect(() => {
        filter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useActiveFilters, useSensorFilterValue, useDescriptionFilterValue])

    // Filter results with selected sensor
    function setSensorFilter(sensor) {
        let filters = useActiveFilters;

        if (sensor === ALL) {
            filters['sensor'] = false;
        } else {
            filters['sensor'] = true;
        }

        setSensorFilterValue(sensor);
        setActiveFilters(filters);
    }

    // TODO: optimize with a Debounce function
    function setDescriptionFilter(descritpionValue) {
        let filters = useActiveFilters;

        // // If no description or 2 or less characters, set the default data
        if (descritpionValue === "" || descritpionValue.length <= 2) {
            filters['description'] = false;
        } else {
            filters['description'] = true;
        }

        setDescriptionFilterValue(descritpionValue)
        setActiveFilters(filters)
    }

    function filter() {
        let filteredData = [];

        if (useActiveFilters.description) {
            filteredData = observationsData.features.map(observable => {
                if (observable.properties.description.toLowerCase().indexOf(useDescriptionFilterValue.toLowerCase()) !== -1) {
                    observable.visible = true;
                } else {
                    observable.visible = false;
                }
                return observable;
            })
        } else {
            filteredData = observationsData.features.map(observable => {
                observable.visible = true;
                return observable;
            })
        }

        if (useActiveFilters.sensor) {
            filteredData = observationsData.features.map(observable => {
                if (observable.visible !== false) {
                    observable.visible = observable.properties.sensor === useSensorFilterValue;
                }
                return observable;
            })
        }

        // extend the array to make sure it's new data and use effect is applied
        setFilteredObservations([...filteredData]);
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
