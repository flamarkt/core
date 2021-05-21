import ActiveLinkButton from './components/ActiveLinkButton';
import Sortable from './components/Sortable';
import SortableHandle from './components/SortableHandle';
import formatPrice from './helpers/formatPrice';
import Cart from './models/Cart';
import Order from './models/Order';
import OrderLine from './models/OrderLine';
import Product from './models/Product';
import AbstractShowPage from './pages/AbstractShowPage';
import AbstractListState from './states/AbstractListState';
import OrderListState from './states/OrderListState';
import ProductListState from './states/ProductListState';

export const common = {
    'components/ActiveLinkButton': ActiveLinkButton,
    'components/Sortable': Sortable,
    'components/SortableHandle': SortableHandle,
    'helpers/formatPrice': formatPrice,
    'models/Cart': Cart,
    'models/Order': Order,
    'models/OrderLine': OrderLine,
    'models/Product': Product,
    'pages/AbstractShowPage': AbstractShowPage,
    'states/AbstractListState': AbstractListState,
    'states/OrderListState': OrderListState,
    'states/ProductListState': ProductListState,
}
