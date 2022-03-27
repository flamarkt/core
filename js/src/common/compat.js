import AbstractSortDropdown from './components/AbstractSortDropdown';
import ActiveLinkButton from './components/ActiveLinkButton';
import DecimalInput from './components/DecimalInput';
import DecimalLabel from './components/DecimalLabel';
import OrderSortDropdown from './components/OrderSortDropdown';
import PriceInput from './components/PriceInput';
import PriceLabel from './components/PriceLabel';
import ProductSortDropdown from './components/ProductSortDropdown';
import QuantityInput from './components/QuantityInput';
import QuantityLabel from './components/QuantityLabel';
import Sortable from './components/Sortable';
import SortableHandle from './components/SortableHandle';
import formatPrice from './helpers/formatPrice';
import Cart from './models/Cart';
import Order from './models/Order';
import OrderLine from './models/OrderLine';
import Payment from './models/Payment';
import Product from './models/Product';
import AbstractShowPage from './pages/AbstractShowPage';
import AbstractListState from './states/AbstractListState';
import OrderListState from './states/OrderListState';
import ProductListState from './states/ProductListState';
import KeyboardNavigatable from './utils/KeyboardNavigatable';

export const common = {
    'components/AbstractSortDropdown': AbstractSortDropdown,
    'components/ActiveLinkButton': ActiveLinkButton,
    'components/DecimalInput': DecimalInput,
    'components/DecimalLabel': DecimalLabel,
    'components/OrderSortDropdown': OrderSortDropdown,
    'components/PriceInput': PriceInput,
    'components/PriceLabel': PriceLabel,
    'components/ProductSortDropdown': ProductSortDropdown,
    'components/QuantityInput': QuantityInput,
    'components/QuantityLabel': QuantityLabel,
    'components/Sortable': Sortable,
    'components/SortableHandle': SortableHandle,
    'helpers/formatPrice': formatPrice,
    'models/Cart': Cart,
    'models/Order': Order,
    'models/OrderLine': OrderLine,
    'models/Payment': Payment,
    'models/Product': Product,
    'pages/AbstractShowPage': AbstractShowPage,
    'states/AbstractListState': AbstractListState,
    'states/OrderListState': OrderListState,
    'states/ProductListState': ProductListState,
    'utils/KeyboardNavigatable': KeyboardNavigatable,
}
