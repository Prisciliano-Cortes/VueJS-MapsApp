import { computed } from "vue"
import { useStore } from "vuex"
import { StateInterface } from '../store/';
import mapboxgl from "mapbox-gl";
import { Feature } from "@/interfaces";
import { LngLat } from "@/store/map/actions";

export const useMapStore = () => {

    const  store = useStore<StateInterface>()

    const map = computed( () => store.state.map.map)

    const distance = computed( () => store.state.map.distance )

    const duration = computed( () => store.state.map.duration )

    //*** Getters */
    const isMapReady = computed<boolean>( () => store.getters['map/isMapReady'])


    //*** Mutations */
    const setPlaceMarkers = ( places: Feature[] ) => {
        store.commit('map/setPlaceMarkers', places)
    }

    const setMap = ( map: mapboxgl.Map) => {
        store.commit('map/setMap', map)
    }

    //*** Actions */
    const getRouteBetweenPoints = ( start: LngLat, end: LngLat) => {
        store.dispatch('map/getRouteBetweenPoints', { start, end })
    }

    return {
        map,
        isMapReady,
        setMap,
        distance,
        duration,
        setPlaceMarkers,
        getRouteBetweenPoints
    }
}