import { createStore } from 'vuex';
import { PlacesState, MapState } from '@/interfaces';
import placesModule from './places'
import MapModule from './map'

export interface StateInterface {
    places: PlacesState,
    map: MapState
}

export default createStore<StateInterface>({
    modules: {
        places: placesModule,
        map: MapModule
    }
})