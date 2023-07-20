import { computed, onMounted } from "vue"
import { useStore } from "vuex"
import { StateInterface } from "@/store"

export const usePlacesStore = () => {

    const store = useStore<StateInterface>()

    onMounted( () => {
        if ( !store.getters['places/isUserLocationReady'] ) {
            store.dispatch('places/getInitialLocation')
        }
    })

    const isLoading = computed( () => store.state.places.isLoading )

    const userLocation = computed( () => store.state.places.userLocation  )

    const isUserLocationReady = computed<boolean>( () => store.getters['places/isUserLocationReady'])

    const searchPlacesByTerm = (query: string) => {
        store.dispatch('places/searchPlacesByTerm', query)
    }

    const places = computed( () => store.state.places.places )
    const isLoadingPlaces = computed( () => store.state.places.isLoadingPlaces)

    return {
        //*** State */
        isLoading,
        userLocation,
        places,
        isLoadingPlaces,

        //*** Getters */
        isUserLocationReady,

        //*** Actions */
        searchPlacesByTerm

        //*** Mutations */
    }
}