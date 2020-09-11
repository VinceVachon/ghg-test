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

    function handleFilterChanger(selectedOption) {
        const selectedSensorOption = selectedOption;
        setSelectedSensor(selectedSensorOption);
        setSensorFilter(selectedSensorOption.value)
    }

    function handleDescriptionFilterChanger(value) {
        setDescriptionValue(value);
        setDescriptionFilter(value)
    }

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
                        onChange={e => handleFilterChanger(e)}
                        options={useSensorOptions}
                        styles={ghgSatDefault}
                    />
                }
            </div>
        </div>
    );
}

export default Filters;
