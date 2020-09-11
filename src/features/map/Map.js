import React, { useEffect, useState } from 'react';
import { Map, Popup, WMSTileLayer, Polygon } from 'react-leaflet';
import { convertToLatLng, getCenterOfPolygon, timeConverter } from '../../app/utils';
import { mapBoxAccessToken } from '../../app/envConstants';

import '../../../node_modules/leaflet/dist/leaflet.css';

import './Map.scss';

const MapSection = (props) => {
    const { activeObservable, observations, setObservable, zoomLevel } = props;
    const [useObservables, setObservables] = useState(undefined)
    const defaultCenter = observations && observations.length > 0 && convertToLatLng(observations[0].geometry.coordinates[0][0]);
    const [useCenterPosition, setCenterPosition] = useState(defaultCenter)

    useEffect(() => {
        // Update the observations list from props
        setObservables(observations);
    }, [observations])

    useEffect(() => {
        // When selecting an observable on the map or the list
        // Center the map based on the selected coords
        // Data sanity check
        if (
            activeObservable &&
            observations &&
            observations &&
            observations[activeObservable] &&
            observations[activeObservable].geometry &&
            observations[activeObservable].geometry.coordinates &&
            observations[activeObservable].geometry.coordinates[0] &&
            observations[activeObservable].geometry.coordinates[0][0]
        ) {
            const selectedObservableCoords = observations[activeObservable].geometry.coordinates[0];
            const selectedObservableCenter = getCenterOfPolygon(selectedObservableCoords);
            const selectedObservableLatLng = convertToLatLng(selectedObservableCenter);
            setCenterPosition(selectedObservableLatLng)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeObservable])

    return (
        <div className="map-section-container">
            {useObservables ?
                <Map center={useCenterPosition} zoom={zoomLevel}>
                    <WMSTileLayer
                        url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapBoxAccessToken}`} // mapbox tyles style
                        id="mapbox/satellite-v9"
                        layers='nexrad-n0r-900913'
                        tileSize={512}
                        zoomOffset={-1}
                    />
                    {observations && observations.map((observation, i) => {
                        if (observation.visible !== false) {
                            const { properties } = observation;
                            const date = timeConverter(properties.observed_on); // TODO: Render nice date formatting
                            const coords = convertToLatLng(observation.geometry.coordinates, 1) // https://macwright.com/lonlat/

                            if (coords) {
                                return (
                                    <Polygon
                                        key={observation.properties.description}
                                        className={observation.properties.sensor}
                                        id={i}
                                        positions={coords}
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
                : <p className="map-loading">Loading...</p>
            }
        </div>
    );
}

export default MapSection;
