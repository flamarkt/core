export const forum: {
    'components/Breadcrumb': typeof Breadcrumb;
    'components/CartDropdown': typeof CartDropdown;
    'components/CartList': typeof CartList;
    'components/CartPageSection': typeof CartPageSection;
    'components/CartTable': typeof CartTable;
    'components/CartTableRow': typeof CartTableRow;
    'components/InlineSubmitStatus': typeof InlineSubmitStatus;
    'components/OrderFact': typeof OrderFact;
    'components/OrderFactPayment': typeof OrderFactPayment;
    'components/OrderFacts': typeof OrderFacts;
    'components/OrderTable': typeof OrderTable;
    'components/OrderTableGroupFoot': typeof OrderTableGroupFoot;
    'components/OrderTableGroupHead': typeof OrderTableGroupHead;
    'components/OrderTableRow': typeof OrderTableRow;
    'components/ProductListItem': typeof ProductListItem;
    'components/ProductQuantity': typeof ProductQuantity;
    'components/ProductSearchSource': typeof ProductSearchSource;
    'layouts/AbstractAccountLayout': typeof AbstractAccountLayout;
    'layouts/AbstractShopLayout': typeof AbstractShopLayout;
    'layouts/AccountLayout': typeof AccountLayout;
    'layouts/CartLayout': typeof CartLayout;
    'layouts/OrderIndexLayout': typeof OrderIndexLayout;
    'layouts/OrderShowLayout': typeof OrderShowLayout;
    'layouts/ProductIndexLayout': typeof ProductIndexLayout;
    'layouts/ProductShowLayout': typeof ProductShowLayout;
    'pages/AbstractAccountPage': typeof AbstractAccountPage;
    'pages/AbstractShopPage': typeof AbstractShopPage;
    'pages/AccountPage': typeof AccountPage;
    'pages/CartPage': typeof CartPage;
    'pages/OrderIndexPage': typeof OrderIndexPage;
    'pages/OrderShowPage': typeof OrderShowPage;
    'pages/ProductIndexPage': typeof ProductIndexPage;
    'pages/ProductShowPage': typeof ProductShowPage;
    'states/CartState': typeof CartState;
    'states/ProductGridListState': typeof ProductGridListState;
    'utils/AccountControls': {
        controls(user: import("flarum/common/models/User").default): import("flarum/common/utils/ItemList").default<any>;
    };
    'utils/DateFormat': {
        defaultFormat(): string;
        orderDayFormat(): string;
        paymentDayFormat(): string;
    };
};
import Breadcrumb from "./components/Breadcrumb";
import CartDropdown from "./components/CartDropdown";
import CartList from "./components/CartList";
import CartPageSection from "./components/CartPageSection";
import CartTable from "./components/CartTable";
import CartTableRow from "./components/CartTableRow";
import InlineSubmitStatus from "./components/InlineSubmitStatus";
import OrderFact from "./components/OrderFact";
import OrderFactPayment from "./components/OrderFactPayment";
import OrderFacts from "./components/OrderFacts";
import OrderTable from "./components/OrderTable";
import OrderTableGroupFoot from "./components/OrderTableGroupFoot";
import OrderTableGroupHead from "./components/OrderTableGroupHead";
import OrderTableRow from "./components/OrderTableRow";
import ProductListItem from "./components/ProductListItem";
import ProductQuantity from "./components/ProductQuantity";
import ProductSearchSource from "./components/ProductSearchSource";
import AbstractAccountLayout from "./layouts/AbstractAccountLayout";
import AbstractShopLayout from "./layouts/AbstractShopLayout";
import AccountLayout from "./layouts/AccountLayout";
import CartLayout from "./layouts/CartLayout";
import OrderIndexLayout from "./layouts/OrderIndexLayout";
import OrderShowLayout from "./layouts/OrderShowLayout";
import ProductIndexLayout from "./layouts/ProductIndexLayout";
import ProductShowLayout from "./layouts/ProductShowLayout";
import AbstractAccountPage from "./pages/AbstractAccountPage";
import AbstractShopPage from "./pages/AbstractShopPage";
import AccountPage from "./pages/AccountPage";
import CartPage from "./pages/CartPage";
import OrderIndexPage from "./pages/OrderIndexPage";
import OrderShowPage from "./pages/OrderShowPage";
import ProductIndexPage from "./pages/ProductIndexPage";
import ProductShowPage from "./pages/ProductShowPage";
import CartState from "./states/CartState";
import ProductGridListState from "./states/ProductGridListState";
