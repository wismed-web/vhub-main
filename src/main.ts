// npm i @fortawesome/vue-fontawesome@latest-3
// npm i @fortawesome/fontawesome-svg-core
// npm i @fortawesome/free-solid-svg-icons

import App from "@/App.vue";
import vue3Spinner from 'vue3-spinner';
import Notifications from '@kyvg/vue3-notification'
import vueCountryRegionSelect from 'vue3-country-region-select'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faPhone,
    faPlus,
    faMinus,
    faCirclePlus,
    faCircleMinus,
    faThumbsUp,
    faCheck,
    faSearch,
    faBookmark,
    faPen,
    faChevronUp,
    faChevronDown,
    faRightFromBracket,
    faRefresh,
    faTable,
    faEye,
    faHeart,
    faUserEdit,
    faDeleteLeft,
    faStar,
    faBackward
} from "@fortawesome/free-solid-svg-icons";

library.add(
    faPhone,
    faPlus,
    faMinus,
    faCirclePlus,
    faCircleMinus,
    faThumbsUp,
    faCheck,
    faSearch,
    faBookmark,
    faPen,
    faChevronUp,
    faChevronDown,
    faRightFromBracket,
    faRefresh,
    faTable,
    faEye,
    faHeart,
    faUserEdit,
    faDeleteLeft,
    faStar,
    faBackward
);

// createApp(App).mount('#app')
createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(vue3Spinner).use(vueCountryRegionSelect).use(Notifications).mount("#app");
