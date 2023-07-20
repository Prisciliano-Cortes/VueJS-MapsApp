import { Module } from 'vuex';
import { StateInterface } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { PlacesState } from '@/interfaces';


const placesModule: Module<PlacesState, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}


export default placesModule;