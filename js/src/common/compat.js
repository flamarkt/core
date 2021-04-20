import Order from './models/Order';
import Product from './models/Product';
import AbstractShowPage from './pages/AbstractShowPage';
import AbstractListState from './states/AbstractListState';
import OrderListState from './states/OrderListState';
import ProductListState from './states/ProductListState';

export const common = {
    'models/Order': Order,
    'models/Product': Product,
    'pages/AbstractShowPage': AbstractShowPage,
    'states/AbstractListState': AbstractListState,
    'states/OrderListState': OrderListState,
    'states/ProductListState': ProductListState,
}
