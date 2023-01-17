export const backoffice: {
    'components/EditPaymentModal': typeof EditPaymentModal;
    'components/OrderLineEdit': typeof OrderLineEdit;
    'components/OrderList': typeof OrderList;
    'components/OrderPaymentSection': typeof OrderPaymentSection;
    'components/OrderRelationshipSelect': typeof OrderRelationshipSelect;
    'components/PaymentList': typeof PaymentList;
    'components/ProductList': typeof ProductList;
    'components/ProductRelationshipSelect': typeof ProductRelationshipSelect;
    'pages/OrderIndexPage': typeof OrderIndexPage;
    'pages/OrderShowPage': typeof OrderShowPage;
    'pages/ProductIndexPage': typeof ProductIndexPage;
    'pages/ProductShowPage': typeof ProductShowPage;
    'states/OrderLineEditState': typeof OrderLineEditState;
    'states/PaymentListPassthroughState': typeof PaymentListPassthroughState;
    'utils/augmentOptionsWithValue': typeof augmentOptionsWithValue;
    'utils/OrderLineOptions': {
        orderLineGroupOptions(): {
            [key: string]: string;
        };
        orderLineTypeOptions(): {
            [key: string]: string;
        };
    };
};
import EditPaymentModal from "./components/EditPaymentModal";
import OrderLineEdit from "./components/OrderLineEdit";
import OrderList from "./components/OrderList";
import OrderPaymentSection from "./components/OrderPaymentSection";
import OrderRelationshipSelect from "./components/OrderRelationshipSelect";
import PaymentList from "./components/PaymentList";
import ProductList from "./components/ProductList";
import ProductRelationshipSelect from "./components/ProductRelationshipSelect";
import OrderIndexPage from "./pages/OrderIndexPage";
import OrderShowPage from "./pages/OrderShowPage";
import ProductIndexPage from "./pages/ProductIndexPage";
import ProductShowPage from "./pages/ProductShowPage";
import OrderLineEditState from "./states/OrderLineEditState";
import PaymentListPassthroughState from "./states/PaymentListPassthroughState";
import augmentOptionsWithValue from "./utils/augmentOptionsWithValue";
