import { PlacesState } from "@/interfaces";

function state(): PlacesState {
    return {
        isLoading: true,
        userLocation: undefined,
        places: [],
        isLoadingPlaces: false
    }
}

export default state;