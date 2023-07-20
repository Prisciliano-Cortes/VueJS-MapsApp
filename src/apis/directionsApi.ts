import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoicHJpczExIiwiYSI6ImNsY3d1d2M3cTE3cmIzd3BsbXE1cGJmbHUifQ.YF27t-Y51PjgqrwQvbvqQQ'
    }
})

export default directionsApi