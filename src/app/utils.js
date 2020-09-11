import L from 'leaflet';

/**
 * @param {number} UNIX_timestamp 
 */
export function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

// Get element position in the page
/**
 * 
 * @param {Element} el 
 */
export function getOffset(el) {
    var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

/**
 * Map Utils
 */

// Leaflet uses lng lat and geoJSON uses lat lng format
// This function reverse the coords to lat lng
// Leaflet provides differents function for single / multi-level arrays
/**
 * 
 * @param {Array} coords
 * @param {number} level 
 */
export function convertToLatLng(coords, level) {
    let revertedCoord = [];

    if (hasMultiLevelArray(coords)) {
        revertedCoord = coordsToLatLngs(coords, level)
    } else {
        revertedCoord = coordsToLatLng(coords);
    }

    return revertedCoord;
}

// convert a single level array to lat/lng
/**
 * 
 * @param {Array} coords
 */
function coordsToLatLng(coords) {
    return L.GeoJSON.coordsToLatLng(coords);
}

// convert a multi-level array of coords to lat/lng
/**
 * 
 * @param {Array} coords 
 * @param {number} level 
 */
function coordsToLatLngs(coords, level) {
    return L.GeoJSON.coordsToLatLngs(coords, level);
}

// Check in the items if there's a least one array
/**
 * 
 * @param {Array} items
 */
function hasMultiLevelArray(items) {
    return items.some(item => item.length !== undefined)
}

// Get the center of an array of points
/**
 * 
 * @param {Array} arr 
 */
export function getCenterOfPolygon(arr) {
    const x = arr.map(xy => xy[0]);
    const y = arr.map(xy => xy[1]);
    const cx = (Math.min(...x) + Math.max(...x)) / 2;
    const cy = (Math.min(...y) + Math.max(...y)) / 2;
    return [cx, cy];
}
