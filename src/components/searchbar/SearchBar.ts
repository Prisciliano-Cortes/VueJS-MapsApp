import { computed, defineComponent, ref } from 'vue'
import { usePlacesStore } from '@/composables'
import SearchResults from '@/components/search-results/SearchResults.vue'

export default defineComponent ({
    name: 'SearchBar',
    components: {
        SearchResults
    },
    
    setup() {
        const debounceTimed = ref()
        const debounceValue = ref('')
        const { searchPlacesByTerm } = usePlacesStore()

        const searchTerm = computed({
            get(){
                return debounceValue.value
            },
            set( val: string ) {
                if ( debounceTimed.value ) {
                    clearTimeout( debounceTimed.value )
                }
                debounceTimed.value = setTimeout(() => {
                    debounceValue.value = val
                    searchPlacesByTerm( val )
                }, 500);
            }
        })

        return {
            debounceValue,
            searchTerm,
            
        }
    }
})