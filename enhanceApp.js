import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fab, fas, far);

import TitleModifier from "./mixins/TitleModifier";

import {
  Pagination,
  SimplePagination,
} from "@vuepress/plugin-blog/lib/client/components";

import DefaultAfterFooter from "./components/extensions/AfterFooter";
import DefaultAfterHeader from "./components/extensions/AfterHeader";
import DefaultAfterPage from "./components/extensions/AfterPage";
import DefaultAfterPageList from "./components/extensions/AfterPageList";
import DefaultAfterSidebar from "./components/extensions/AfterSidebar";
import DefaultBeforePage from "./components/extensions/BeforePage";
import DefaultBeforePageList from "./components/extensions/BeforePageList";
import DefaultBeforePagination from "./components/extensions/BeforePagination";
import DefaultBeforeSidebar from "./components/extensions/BeforeSidebar";

export default ({ Vue }) => {
  Vue.mixin(TitleModifier);

  Vue.component("Pagination", Pagination);
  Vue.component("SimplePagination", SimplePagination);
  Vue.component("faIcon", FontAwesomeIcon);

  Vue.component("DefaultAfterFooter", DefaultAfterFooter);
  Vue.component("DefaultAfterHeader", DefaultAfterHeader);
  Vue.component("DefaultAfterPage", DefaultAfterPage);
  Vue.component("DefaultAfterPageList", DefaultAfterPageList);
  Vue.component("DefaultAfterSidebar", DefaultAfterSidebar);
  Vue.component("DefaultBeforePage", DefaultBeforePage);
  Vue.component("DefaultBeforePageList", DefaultBeforePageList);
  Vue.component("DefaultBeforePagination", DefaultBeforePagination);
  Vue.component("DefaultBeforeSidebar", DefaultBeforeSidebar);
};
