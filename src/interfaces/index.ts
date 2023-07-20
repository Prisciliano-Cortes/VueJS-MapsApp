import mapboxgl from "mapbox-gl";

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number]; // lng lat
    places: Feature[];
    isLoadingPlaces: boolean
}

export interface MapState {
    map?: mapboxgl.Map;
    markers: mapboxgl.Marker[];
    distance?: number;
    duration?: number;
}

export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          string;
    place_type:    string[];
    relevance:     number;
    properties:    Properties;
    text_es:       string;
    language_es?:  Language;
    place_name_es: string;
    text:          string;
    language?:     Language;
    place_name:    string;
    bbox?:         number[];
    center:        number[];
    geometry:      Geometry;
    context:       Context[];
}

export interface Context {
    id:           string;
    mapbox_id:    string;
    wikidata?:    string;
    short_code?:  ShortCode;
    text_es:      string;
    language_es?: Language;
    text:         string;
    language?:    Language;
}

export enum Language {
    Es = "es",
}

export enum ShortCode {
    MX = "mx",
    MXOax = "MX-OAX",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    mapbox_id?:  string;
    wikidata?:   string;
    foursquare?: string;
    landmark?:   boolean;
    category?:   string;
    maki?:       string;
    accuracy?:   string;
}

export interface DirectionsResponse {
    routes:    Route[];
    waypoints: Waypoint[];
    code:      string;
    uuid:      string;
}

export interface Route {
    weight_name: string;
    weight:      number;
    duration:    number;
    distance:    number;
    legs:        Leg[];
    geometry:    Geometries;
}

export interface Geometries {
    coordinates: Array<number[]>;
    type:        string;
}

export interface Leg {
    via_waypoints: any[];
    admins:        Admin[];
    weight:        number;
    duration:      number;
    steps:         any[];
    distance:      number;
    summary:       string;
}

export interface Admin {
    iso_3166_1_alpha3: string;
    iso_3166_1:        string;
}

export interface Waypoint {
    distance: number;
    name:     string;
    location: number[];
}