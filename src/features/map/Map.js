import React, { useEffect, useState } from 'react';
import { Map, Popup, WMSTileLayer, Polygon } from 'react-leaflet';

import { timeConverter } from '../../app/utils';
import { mapBoxAccessToken } from '../../app/envConstants';

import '../../../node_modules/leaflet/dist/leaflet.css';

import './Map.scss';

const MapSection = (props) => {
    const [useObservables, setObservables] = useState(undefined)
    const { activeObservable, observations, setObservable } = props;
    const position = observations.features[0].geometry.coordinates[0][0];

    useEffect(() => {
        setObservables(observations);
    })

    if (useObservables) {
        return (
            <div className="map-section-container">
                <Map center={position} zoom={8}>
                    <WMSTileLayer
                        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxAccessToken}`}
                        id="mapbox/satellite-v9"
                        layers='nexrad-n0r-900913'
                        tileSize={512}
                        zoomOffset={-1}
                    />
                    {useObservables && useObservables.features.map((observation, i) => {
                        if (i <= 100) {
                            const { properties } = observation;
                            const date = timeConverter(properties.observed_on);

                            const reverseLatLng = observation.geometry.coordinates.map(coordinate => {
                                return coordinate.map(coord => coord.reverse());
                            });

                            if (reverseLatLng) {
                                return (
                                    <Polygon
                                        key={observation.properties.description}
                                        color={activeObservable === i ? 'red' : 'blue'}
                                        id={i}
                                        positions={reverseLatLng}
                                        onclick={() => setObservable(i)}
                                    >
                                        <Popup className="map-observation-popup">
                                            <p className="description">{properties.description}</p>
                                            <p className="sensor">Sensor: {properties.sensor}</p>
                                            <p className="observed">Observed on: {date}</p>
                                        </Popup>
                                    </Polygon>
                                )
                            }
                        }
                        return false;
                    })}
                </Map>
            </div>
        );
    }
    return <p>Loading...</p>
}

export default MapSection;
