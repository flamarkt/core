import Application from 'flarum/common/Application';
import ExtensionData from 'flarum/admin/utils/ExtensionData';
export default class BackofficeApplication extends Application {
    extensionData: ExtensionData;
    history: {
        canGoBack: () => boolean;
        getPrevious: () => void;
        backUrl: () => any;
        back: () => void;
    };
    constructor();
    mount(): void;
    getRequiredPermissions(permission: any): string[];
}
