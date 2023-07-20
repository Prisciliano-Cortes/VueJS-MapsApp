import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mapboxgl from 'mapbox-gl'
 
mapboxgl.accessToken = 'pk.eyJ1IjoicHJpczExIiwiYSI6ImNsY3d1d2M3cTE3cmIzd3BsbXE1cGJmbHUifQ.YF27t-Y51PjgqrwQvbvqQQ';

if ( !navigator.geolocation ) {
    alert('Your browser not support GeoLocation')
    throw new Error('Your browser not support GeoLocation')
}

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
