import React, { useEffect, useState } from 'react';
import Select from 'react-select'

import { ghgSatDefault } from '../../assets/styles/js/Select';
import { ALL } from '../../app/constants';

import './Filters.scss';

const Filters = (props) => {
    const { activeObservable, observations, observationsData, setSensorFilter } = props;
    const allSensorFilter = {
        value: ALL,
        label: 'All Sensors',
    };
    const [useSensorOptions, setSensorOptions] = useState(undefined);
    const [useSelectedSensor, setSelectedSensor] = useState(allSensorFilter);

    useEffect(() => {
        createSensorOptions()
    }, [observations])

    // Generare a list of unique sensors
    // Create array of object for options base on unique sensors
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

    return (
        <div className="filters-section-container">
            <header className="filters-section-header">
                <h1>Methane Observations</h1>
                <p>({observations.length} Result{observations.length !== 1 ? 's' : ''})</p>
            </header>

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
    );
}

export default Filters;
