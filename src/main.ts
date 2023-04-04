// npm i @fortawesome/vue-fontawesome@latest-3
// npm i @fortawesome/fontawesome-svg-core
// npm i @fortawesome/free-solid-svg-icons

import App from "@/App.vue";
import vue3Spinner from 'vue3-spinner';
import vueCountryRegionSelect from 'vue3-country-region-select'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faPhone,
    faPlus,
    faThumbsUp,
    faCheck,
    faSearch,
    faBookmark,
    faPen,
    faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPhone, faPlus, faThumbsUp, faCheck, faSearch, faBookmark, faPen, faRefresh);

// createApp(App).mount('#app')
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(vue3Spinner).use(vueCountryRegionSelect).mount("#app");
