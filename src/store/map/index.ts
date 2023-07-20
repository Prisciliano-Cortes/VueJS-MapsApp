import { Module } from 'vuex';
import { StateInterface } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { MapState } from '@/interfaces';


const mapModule: Module<MapState, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}


export default mapModule;