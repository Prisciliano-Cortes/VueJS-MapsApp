import { defineComponent, ref, watch } from "vue";
import { useMapStore, usePlacesStore } from "@/composables";
import { Feature } from "@/interfaces";

export default defineComponent({
    name: 'SearchResult',
    setup() {

        const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore()

        const { isLoadingPlaces, places, userLocation } = usePlacesStore()

        const activePlace = ref('')

        const onPlaceClick = (place: Feature) => {
            
            activePlace.value = place.id
            
            const [lng, lat] = place.center

            map.value?.flyTo({
                zoom: 14,
                center: [lng, lat]
            })
        }

        const getRouteDirections = ( place: Feature) => {
            if ( !userLocation.value) {
                return
            }

            activePlace.value = place.id
            
            const [lng, lat] = place.center

            const [startLng, startLat] = userLocation.value

            const start: [number, number] = [startLng, startLat]
            const end: [number, number] = [lng, lat]

            getRouteBetweenPoints(start, end)
        }

        watch( places, (newPlaces) => {
            activePlace.value = ''
            setPlaceMarkers( newPlaces )
        })

        return {
            isLoadingPlaces,
            places,
            activePlace,
            onPlaceClick,
            getRouteDirections
        }
    }
})