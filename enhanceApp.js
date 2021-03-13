import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fab, fas, far);

import {
  Pagination,
  SimplePagination,
} from "@vuepress/plugin-blog/lib/client/components";

export default ({ Vue }) => {
  Vue.component("Pagination", Pagination);
  Vue.component("SimplePagination", SimplePagination);
  Vue.component("faIcon", FontAwesomeIcon);
};
