import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { BUILDINGS_ON_SALE_GEOJSON_SOURCE } from '../data'
import { connect } from 'react-redux';
import {setFeature} from '../actions/features';
import {showPanel} from '../actions/showPanel';
import {showBidder} from '../actions/showBidder'

const mapContainerStyle = {
	position: 'absolute',
	top: 0,
	bottom: 0,
	height: '100%',
	width: '100%'
};

mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9tZXRyaWNzIiwiYSI6ImNqOGJ2ZXIzazAxd3kyd3AyMDVrOGpzNWkifQ.KwvwFfoDOeLnjR1gEHO8tg';

function Map(props) {
	const map = useRef(null);
	const mapContainer = useRef(null);
	let selected = ""

	/* UseEffect: Loads the map when the Map component is mounted */
	useEffect(() => {
		/* Create a map instance in a specific HTML element container (referenced by
		the mapContainer useRef), using a specific style (the basemap), and with other
		configuration parameters like the initial center coordinates and zoom level */
		map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center:[
	      -3.695,
	      40.4496
	    ],
	    zoom: 15,
    });

		// Add map navigation controls (zoom and rotation)
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');

    /* When the map style (basemap) loads, then we can load our sources (geospatial data),
    layers (visual representations of that geospatial data over the map)
    and layers' event handlers */
    map.current.on('style.load', () => {
    	// Add source
			map.current.addSource('parcels-for-sale-source', {
				type: 'geojson',
				data: BUILDINGS_ON_SALE_GEOJSON_SOURCE
			});
			 
			// Add layer
			map.current.addLayer({
				'id': 'parcels-for-sale-layer',
				'type': 'fill',
				'source': 'parcels-for-sale-source',
				'paint': {
					'fill-color': 'rgb(255, 185, 0)',
					'fill-opacity': 0.9,
					'fill-outline-color': 'rgb(38, 247, 202)'
				}
			});

			// Add layer mousemove event handler to change cursor to pointer when hovering
			// over a parcel on sale
			map.current.on('mousemove', 'parcels-for-sale-layer', () => {
				map.current.getCanvas().style.cursor = 'pointer';
			});

			// Add layer mouseleave event handler to change cursor back to normal
			map.current.on('mouseleave', 'parcels-for-sale-layer', () => {
				map.current.getCanvas().style.cursor = '';
			});

			// Add layer click event handler
			map.current.on('click', 'parcels-for-sale-layer', e => {
				const clickedFeature = e.features[0];
				setData(clickedFeature.properties)
				// console.log('Clicked feature: ', clickedFeature);
				// console.log('Clicked feature properties: ', clickedFeature.properties);			
				// console.log('state properties: ', props.featuresState);		
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setData = (data)=>{
		if(selected===data.refcat){
			props.showBidder(false)
			props.showPanel(false)
			selected=""
		}else{
			selected=data.refcat
			props.setFeature(data)
			props.showBidder(false)
			props.showPanel(true)

		}
	}

	return (
    <div ref={mapContainer} style={mapContainerStyle}></div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
        setFeature: (properties)=>dispatch(setFeature(properties)),
		showPanel:(bool)=>dispatch(showPanel(bool)),
		showBidder:(bool)=>dispatch(showBidder(bool))

      }
}

export default connect(null, mapDispatchToProps)(Map);