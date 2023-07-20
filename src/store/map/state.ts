import { MapState } from "@/interfaces";

function state(): MapState {
    return {
        map: undefined,
        markers: [],
        distance: undefined,
        duration: undefined
    }
}

export default state;