import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoicHJpczExIiwiYSI6ImNsY3d1d2M3cTE3cmIzd3BsbXE1cGJmbHUifQ.YF27t-Y51PjgqrwQvbvqQQ'
    }
})

export default searchApi