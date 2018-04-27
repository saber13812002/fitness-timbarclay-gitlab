import Vue from "vue";

import {
  Menu,
  MenuItem,
  Input,
  Button,
  Card,
  Tooltip,
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
  Option,
  Alert
} from "element-ui";

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Card);
Vue.use(Tooltip);
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
Vue.use(Option);
Vue.use(Alert);
Vue.prototype.$notify = Notification;