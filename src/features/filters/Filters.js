import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { useDebouncedCallback } from 'use-debounce';

import { ghgSatDefault } from '../../assets/styles/js/Select';
import { ALL } from '../../app/constants';

import './Filters.scss';

const Filters = (props) => {
    const { observations, observationsData, setSensorFilter, setDescriptionFilter } = props;
    const allSensorFilter = {
        value: ALL,
        label: 'All Sensors',
    };

    const [useDescriptionValue, setDescriptionValue] = useState('');

    // Debounce callback
    const [debouncedCallback] = useDebouncedCallback(
        // function
        (useDescriptionValue) => {
            handleDescriptionFilterChanger(useDescriptionValue);
        },
        // delay in ms
        500
    );

    const [useSensorOptions, setSensorOptions] = useState(undefined);
    const [useSelectedSensor, setSelectedSensor] = useState(allSensorFilter);

    // Update options if observations data changes (simulation)
    useEffect(() => {
        createSensorOptions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observations])

    // Generare a list of unique sensors
    // Create array of object for options base on unique sensors
    // Could also use new Set()
    function createSensorOptions() {
        const sensorOptions = [];

        observationsData && observationsData.features.forEach(observation => {
            const { sensor } = observation.properties;
            const isAdded = sensorOptions.find(sensorOption => sensorOption.value === sensor);

            if (!isAdded) {
                sensorOptions.push({
                    value: sensor,
                    label: sensor,
                });
            }
        })

        sensorOptions.unshift(allSensorFilter);
        setSensorOptions(sensorOptions);
    }

    // Change sensor select
    function handleSensorOptionChange(selectedOption) {
        const selectedSensorOption = selectedOption;
        setSelectedSensor(selectedSensorOption);
        setSensorFilter(selectedSensorOption.value)
    }

    // Change description input
    function handleDescriptionFilterChanger(value) {
        setDescriptionValue(value);
        setDescriptionFilter(value)
    }

    // Create an array of visible results to get the lenght
    // TODO: Optimize this function
    const visibleResults = []
    observations.forEach(observation => {
        if (observation.visible !== false) {
            visibleResults.push(observation)
        }
    });

    return (
        <div className="filters-section-container">
            <header className="filters-section-header">
                <h1>Methane Observations</h1>
                <p>({visibleResults.length} Result{visibleResults.length !== 1 ? 's' : ''})</p>
            </header>

            <div className="filters">
                <input
                    className="description-filter-input"
                    type="search"
                    onChange={e => debouncedCallback(e.target.value)}
                    defaultValue={useDescriptionValue}
                    placeholder="Filter by Description"
                />
                {useSensorOptions &&
                    <Select
                        className="sensor-select"
                        value={useSelectedSensor}
                        onChange={e => handleSensorOptionChange(e)}
                        options={useSensorOptions}
                        styles={ghgSatDefault}
                    />
                }
            </div>
        </div>
    );
}

export default Filters;
