import OrderLineEdit from './components/OrderLineEdit';
import OrderList from './components/OrderList';
import OrderRelationshipSelect from './components/OrderRelationshipSelect';
import ProductList from './components/ProductList';
import ProductRelationshipSelect from './components/ProductRelationshipSelect';
import OrderIndexPage from './pages/OrderIndexPage';
import OrderShowPage from './pages/OrderShowPage';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import OrderLineEditState from './states/OrderLineEditState';

export const backoffice = {
    'components/OrderLineEdit': OrderLineEdit,
    'components/OrderList': OrderList,
    'components/OrderRelationshipSelect': OrderRelationshipSelect,
    'components/ProductList': ProductList,
    'components/ProductRelationshipSelect': ProductRelationshipSelect,
    'pages/OrderIndexPage': OrderIndexPage,
    'pages/OrderShowPage': OrderShowPage,
    'pages/ProductIndexPage': ProductIndexPage,
    'pages/ProductShowPage': ProductShowPage,
    'states/OrderLineEditState': OrderLineEditState,
}
