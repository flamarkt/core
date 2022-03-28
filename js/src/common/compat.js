import DecimalInput from './components/DecimalInput';
import DecimalLabel from './components/DecimalLabel';
import OrderSortDropdown from './components/OrderSortDropdown';
import PriceInput from './components/PriceInput';
import PriceLabel from './components/PriceLabel';
import ProductSortDropdown from './components/ProductSortDropdown';
import QuantityInput from './components/QuantityInput';
import QuantityLabel from './components/QuantityLabel';
import formatPrice from './helpers/formatPrice';
import Cart from './models/Cart';
import Order from './models/Order';
import OrderLine from './models/OrderLine';
import Payment from './models/Payment';
import Product from './models/Product';
import OrderListState from './states/OrderListState';
import ProductListState from './states/ProductListState';

export const common = {
    'components/DecimalInput': DecimalInput,
    'components/DecimalLabel': DecimalLabel,
    'components/OrderSortDropdown': OrderSortDropdown,
    'components/PriceInput': PriceInput,
    'components/PriceLabel': PriceLabel,
    'components/ProductSortDropdown': ProductSortDropdown,
    'components/QuantityInput': QuantityInput,
    'components/QuantityLabel': QuantityLabel,
    'helpers/formatPrice': formatPrice,
    'models/Cart': Cart,
    'models/Order': Order,
    'models/OrderLine': OrderLine,
    'models/Payment': Payment,
    'models/Product': Product,
    'states/OrderListState': OrderListState,
    'states/ProductListState': ProductListState,
}
