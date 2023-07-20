import { ActionTree } from 'vuex';
import { DirectionsResponse, MapState } from '@/interfaces';
import { StateInterface } from '../index';
import { directionsApi } from '@/apis';

export type LngLat = [ number, number ]

const actions: ActionTree<MapState, StateInterface> = {
    async getRouteBetweenPoints( { commit }, { start, end }: { start: LngLat, end: LngLat }) {
        const res = await directionsApi.get<DirectionsResponse>(`${ start.join(',')};${ end.join(',')}`)

        const polyline = res.data.routes[0].geometry.coordinates
        commit('setRoutePolyline', polyline)
        commit('setDistanceDuration', {
            distance: res.data.routes[0].distance,
            duration: res.data.routes[0].duration
        })
    }
}



export default actions;