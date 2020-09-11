import React, { useEffect, useState } from 'react';
import { ALL } from '../../app/constants';

import './Filters.scss';

const Filters = (props) => {
    const { activeObservable, observations, observationsData, setSensorFilter } = props;
    const [useSensorOptions, setSensorOptions] = useState(undefined);
    const [useSelectedSensor, setSelectedSensor] = useState(ALL);

    useEffect(() => {
        createSensorOptions()
    }, [observations])

    // Generare a list of unique sensors
    // Create html option element base on unique sensors
    function createSensorOptions() {
        const sensorList = [];

        observationsData && observationsData.features.forEach(observation => {
            const { sensor } = observation.properties;
            if (!sensorList.includes(sensor)) {
                sensorList.push(sensor);
            }
        })

        const sensorOptions = sensorList.map(sensor => <option key={sensor} value={sensor}>{sensor}</option>)
        sensorOptions.unshift(<option key={ALL} value={ALL}>All Sensors</option>);


        setSensorOptions(sensorOptions);
    }

    function handleFilterChanger(e) {
        const selectedSensorOption = e.target.value;
        setSelectedSensor(selectedSensorOption);
        setSensorFilter(selectedSensorOption)
    }

    return (
        <div className="filters-section-container">
            {useSensorOptions &&
                <select value={useSelectedSensor} onChange={e => handleFilterChanger(e)}>
                    {useSensorOptions.map(sensor => sensor)}
                </select>
            }
        </div>
    );
}

export default Filters;
