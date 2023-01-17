import EditPaymentModal from './components/EditPaymentModal';
import OrderLineEdit from './components/OrderLineEdit';
import OrderList from './components/OrderList';
import OrderPaymentSection from './components/OrderPaymentSection';
import OrderRelationshipSelect from './components/OrderRelationshipSelect';
import PaymentList from './components/PaymentList';
import ProductList from './components/ProductList';
import ProductRelationshipSelect from './components/ProductRelationshipSelect';
import OrderIndexPage from './pages/OrderIndexPage';
import OrderShowPage from './pages/OrderShowPage';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import OrderLineEditState from './states/OrderLineEditState';
import PaymentListPassthroughState from './states/PaymentListPassthroughState';
import augmentOptionsWithValue from './utils/augmentOptionsWithValue';
import OrderLineOptions from './utils/OrderLineOptions';

export const backoffice = {
    'components/EditPaymentModal': EditPaymentModal,
    'components/OrderLineEdit': OrderLineEdit,
    'components/OrderList': OrderList,
    'components/OrderPaymentSection': OrderPaymentSection,
    'components/OrderRelationshipSelect': OrderRelationshipSelect,
    'components/PaymentList': PaymentList,
    'components/ProductList': ProductList,
    'components/ProductRelationshipSelect': ProductRelationshipSelect,
    'pages/OrderIndexPage': OrderIndexPage,
    'pages/OrderShowPage': OrderShowPage,
    'pages/ProductIndexPage': ProductIndexPage,
    'pages/ProductShowPage': ProductShowPage,
    'states/OrderLineEditState': OrderLineEditState,
    'states/PaymentListPassthroughState': PaymentListPassthroughState,
    'utils/augmentOptionsWithValue': augmentOptionsWithValue,
    'utils/OrderLineOptions': OrderLineOptions,
}
