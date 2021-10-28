import { ClassComponent, Vnode, VnodeDOM } from 'mithril';
interface SortableAttrs {
    className?: string;
    handleClassName?: string | null;
    containerTag?: string;
    placeholderTag?: string;
    disabled?: boolean;
    direction?: 'vertical' | 'horizontal';
    onsort: (origin: number, destination: number) => void;
}
/**
 * A sortable implementation inspired by html5sortable, but designed to work with Mithril
 * The sortable children must be a flat array of vnodes and be keyed
 */
export default class Sortable implements ClassComponent<SortableAttrs> {
    sortingIndex: number | null;
    showPlaceholderForIndex: number;
    dragoverenterhandler: (event: DragEvent) => void;
    drophandler: (event: DragEvent) => void;
    oncreate(vnode: VnodeDOM<SortableAttrs>): void;
    onremove(): void;
    view(vnode: Vnode<SortableAttrs>): Vnode<any, any>;
    placeholder(vnode: Vnode<SortableAttrs>): Vnode;
}
export {};
