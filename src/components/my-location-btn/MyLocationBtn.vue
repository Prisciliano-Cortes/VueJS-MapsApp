<template>
    <button 
        v-if="isButtonReady"
        @click="onMyLocationClicked"
        class="btn btn-primary"
    >
        Get my location
    </button>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import { useMapStore, usePlacesStore } from '../../composables';
    
    export default defineComponent ({
        name: 'MyLocationBtn',
        setup() {

            const { userLocation, isUserLocationReady } = usePlacesStore()
            const { map, isMapReady } = useMapStore()

            const isButtonReady = computed<boolean>( () => isUserLocationReady.value && isMapReady.value )

            const onMyLocationClicked = () => {
                map.value?.flyTo({
                    center: userLocation.value,
                    zoom: 14
                })
            }

            return {
                onMyLocationClicked,
                isButtonReady   
            }
        }
    })
</script>

<style scoped>
    button {
        position: fixed;
        top: 30px;
        right: 30px;
    }
</style>