<script lang="ts" src="./MapView.ts" />

<template>
    <div 
        v-if="!isUserLocationReady" 
        class="loading-map d-flex justify-content-center align-items-center"
    >
        <div class="text-center">
            <h3>Please wait</h3>
            <span> Locating </span>
        </div>
    </div>

    <div 
        v-show="isUserLocationReady"
        class="map-container"
        ref="mapElement"
    />
</template>

<style scoped>

    .loading-map {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        top: 0px;
        left: 0px;
        color: #ffff;
        background-color: rgba(0, 0, 0, 0.8);
    }

    .map-container {
        position: fixed;
        width: 100vw;
        height: 100vh;
    }

</style>