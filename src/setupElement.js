import Vue from "vue";

import {
  Menu,
  MenuItem,
  Input,
  Button,
  Card,
  Tooltip,
  Popover,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Container,
  Header,
  Main,
  Footer,
  Notification,
  Select,
  Autocomplete,
  Slider,
  Option,
  Alert
} from "element-ui";

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';

locale.use(lang);

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Card);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Select);
Vue.use(Autocomplete);
Vue.use(Slider);
Vue.use(Option);
Vue.use(Alert);
Vue.prototype.$notify = Notification;