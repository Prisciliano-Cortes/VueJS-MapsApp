import { defineComponent, onMounted, ref, watch } from "vue"
import mapboxgl from "mapbox-gl"
import { useMapStore, usePlacesStore } from "@/composables"

export default defineComponent({
    name: 'MapView',
    setup() {

        const { userLocation, isUserLocationReady } = usePlacesStore()
        const mapElement = ref<HTMLDivElement>()
        const { setMap } = useMapStore()

        const initMap = async() => {
            if (!mapElement.value) {
                throw new Error('Div Element not exist')
            }

            if ( !userLocation.value ) {
                throw new Error('userLocation not exist')
            }

            await Promise.resolve()

            const map = new mapboxgl.Map({
                container: mapElement.value, // container ID
                style: 'mapbox://styles/mapbox/streets-v12', // style URL
                center: userLocation.value, // starting position [lng, lat]
                zoom: 15, // starting zoom
            });

            const myLocationPopup = new mapboxgl.Popup({ offset: [0,-35] })
            .setLngLat( userLocation.value )
            .setHTML(`
                <h4>My location</h4>
                <p>Coordinates</p>
                <p> ${userLocation.value} </p>
            `)

            const myLocationMarker = new mapboxgl.Marker()
            .setLngLat( userLocation.value )
            .addTo(map)
            .setPopup( myLocationPopup )

            setMap( map )
        }

        onMounted( () => {
            if ( isUserLocationReady.value ) {
                return initMap()
            }
        })

        watch( isUserLocationReady, (newVal) => {
            if ( isUserLocationReady.value ) {
                return initMap()
            }
        })

        return {
            userLocation,
            isUserLocationReady,
            mapElement
        }
    }
})