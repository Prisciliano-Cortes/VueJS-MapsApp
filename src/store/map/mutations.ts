import { MutationTree } from 'vuex';
import mapboxgl from 'mapbox-gl';
import { Feature, MapState } from '@/interfaces';


const mutation: MutationTree<MapState> = {
    setMap( state, map: mapboxgl.Map ) {
        state.map = map
    },

    setDistanceDuration(state, { distance, duration }: { distance: number, duration: number }) {
        let kms = distance / 1000
        kms = Math.round(kms * 100)
        kms /= 100

        state.distance = kms
        state.duration = Math.floor( duration / 60 )
    },

    setPlaceMarkers( state, places: Feature[]) {
        //*** Delete marker */
        state.markers.forEach( marker => marker.remove() )
        state.markers = []

        if ( !state.map ) {
            return
        }

        //*** Create new markers */
        for (const place of places) {
            const [lng, lat] = place.center
            
            const popup = new mapboxgl.Popup({ offset: [0,-35] })
            .setLngLat([lng, lat])
            .setHTML(`
                <h4>${ place.text }</h4>
                <p>Coordinates</p>
                <p> ${place.place_name} </p>
            `)

            const marker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo( state.map )
            .setPopup( popup )

            state.markers.push( marker )
        }

        //*** ClearPolyline */
        if ( state.map.getLayer('RouteString')) {
            state.map.removeLayer('RouteString')
            state.map.removeSource('RouteString')
            state.distance = undefined
            state.duration = undefined
        }
    },

    setRoutePolyline( state, coords: number[][]) {
        const start = coords[0]
        const end = coords[ coords.length - 1]

        //*** Define bounds */
        const bounds = new mapboxgl.LngLatBounds(
            [ start[0], start[1] ],
            [ start[0], start[1] ]  
        )

        //*** Add points of bounds */
        for (const coord of coords) {
            const newCoord: [number, number] = [ coord[0], coord[1] ];
            bounds.extend( newCoord )
        }

        state.map?.fitBounds( bounds, {
            padding: 200
        })

        //*** Polyline */
        const sourceDate: mapboxgl.AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if ( state.map?.getLayer('RouteString') ) {
            state.map.removeLayer('RouteString')
            state.map.removeSource('RouteString')
        }
        
        state.map?.addSource('RouteString', sourceDate)

        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round',
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        })
    }
}


export default mutation;