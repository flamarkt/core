import AbstractList from './components/AbstractList';
import AbstractRelationshipSelect from './components/AbstractRelationshipSelect';
import BackofficeNav from './components/BackofficeNav';
import OrderLineEdit from './components/OrderLineEdit';
import OrderList from './components/OrderList';
import OrderRelationshipSelect from './components/OrderRelationshipSelect';
import PermanentDeleteButton from './components/PermanentDeleteButton';
import ProductList from './components/ProductList';
import ProductRelationshipSelect from './components/ProductRelationshipSelect';
import SoftDeleteButton from './components/SoftDeleteButton';
import SubmitButton from './components/SubmitButton';
import UserList from './components/UserList';
import UserRelationshipSelect from './components/UserRelationshipSelect';
import UserSortDropdown from './components/UserSortDropdown';
import DashboardPage from './pages/DashboardPage';
import OrderIndexPage from './pages/OrderIndexPage';
import OrderShowPage from './pages/OrderShowPage';
import ProductIndexPage from './pages/ProductIndexPage';
import ProductShowPage from './pages/ProductShowPage';
import UserIndexPage from './pages/UserIndexPage';
import UserShowPage from './pages/UserShowPage';
import OrderLineEditState from './states/OrderLineEditState';
import UserListState from './states/UserListState';

export const backoffice = {
    'components/AbstractList': AbstractList,
    'components/AbstractRelationshipSelect': AbstractRelationshipSelect,
    'components/BackofficeNav': BackofficeNav,
    'components/OrderLineEdit': OrderLineEdit,
    'components/OrderList': OrderList,
    'components/OrderRelationshipSelect': OrderRelationshipSelect,
    'components/PermanentDeleteButton': PermanentDeleteButton,
    'components/ProductList': ProductList,
    'components/ProductRelationshipSelect': ProductRelationshipSelect,
    'components/SoftDeleteButton': SoftDeleteButton,
    'components/SubmitButton': SubmitButton,
    'components/UserList': UserList,
    'components/UserRelationshipSelect': UserRelationshipSelect,
    'components/UserSortDropdown': UserSortDropdown,
    'pages/DashboardPage': DashboardPage,
    'pages/OrderIndexPage': OrderIndexPage,
    'pages/OrderShowPage': OrderShowPage,
    'pages/ProductIndexPage': ProductIndexPage,
    'pages/ProductShowPage': ProductShowPage,
    'pages/UserIndexPage': UserIndexPage,
    'pages/UserShowPage': UserShowPage,
    'states/OrderLineEditState': OrderLineEditState,
    'states/UserListState': UserListState,
}
