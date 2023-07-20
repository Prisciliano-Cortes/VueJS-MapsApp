import { ActionTree } from 'vuex';
import { Feature, PlacesResponse, PlacesState } from '@/interfaces';
import { StateInterface } from '../index';
import { searchApi } from '@/apis';


const actions: ActionTree<PlacesState, StateInterface> = {
    getInitialLocation( { commit } ) {
        navigator.geolocation.getCurrentPosition(
            ( { coords } ) => commit('setLngLat', {lng: coords.longitude, lat: coords.latitude }),
            ( err ) => {
                console.error(err);
                throw new Error('No geolocation')
            }
        )
    },

    async searchPlacesByTerm({ commit, state}, query: string): Promise<Feature[]> {

        if ( query.length === 0) {
            commit('setPlaces', [])
            return []
        }

        if ( !state.userLocation ) {
            throw new Error('Not exist location')
        }

        commit('setIsLoadingPlaces')

        const res = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
                proximity: state.userLocation?.join(',')
            }
        })   

        commit('setPlaces', res.data.features)

        return res.data.features
        
    }
}



export default actions;