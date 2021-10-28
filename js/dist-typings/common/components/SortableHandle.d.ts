import { ClassComponent, Vnode } from 'mithril';
interface SortableHandleAttrs {
    elementTag?: string;
    className?: string;
    disabled?: boolean;
}
export default class SortableHandle implements ClassComponent<SortableHandleAttrs> {
    view(vnode: Vnode<SortableHandleAttrs>): Vnode<any, any>;
}
export {};
