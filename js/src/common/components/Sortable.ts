import {ClassComponent, Vnode, VnodeDOM} from 'mithril';

interface SortableAttrs {
    containerTag?: string
    placeholderTag?: string
    disabled?: boolean
    direction?: 'vertical' | 'horizontal'
    onsort: (origin: number, destination: number) => void,
}

/**
 * A sortable implementation inspired by html5sortable, but designed to work with Mithril
 * The sortable children must be a flat array of vnodes and be keyed
 */
export default class Sortable implements ClassComponent<SortableAttrs> {
    sortingIndex: number | null = null;
    showPlaceholderForIndex: number = 0;

    dragoverenterhandler!: (event: DragEvent) => void;
    drophandler!: (event: DragEvent) => void;

    oncreate(vnode: VnodeDOM<SortableAttrs>) {
        // We need to handle both dragover and dragenter to prevent inputs from showing a cursor when hovered
        // We also need this event to handle mouse movement because stopping propagation seems to stop mousemove event
        this.dragoverenterhandler = event => {
            if (this.sortingIndex !== null) {
                event.preventDefault();
                event.stopPropagation();
                // @ts-ignore dataTransfer could be null... but not sure when that could happen
                event.dataTransfer.dropEffect = 'move';

                let targetIndex = 0;

                // We will show the placeholder above or below the hovered item using the middle height as criteria
                (vnode.dom.childNodes as any as HTMLElement[]).forEach(element => {
                    const index = parseInt(element.dataset.index || '');

                    // Ignore elements without an index (those will be the placeholders)
                    if (isNaN(index)) {
                        return;
                    }

                    const position = element.getBoundingClientRect();

                    if (vnode.attrs.direction === 'horizontal') {
                        // Ignore invisible elements
                        if (!position.width) {
                            return;
                        }

                        const middleX = position.left + (position.width / 2);

                        if (event.pageX > middleX + window.scrollX) {
                            targetIndex = index + 1;
                        }
                    } else {
                        // Ignore invisible elements
                        if (!position.height) {
                            return;
                        }

                        const middleY = position.top + (position.height / 2);

                        if (event.pageY > middleY + window.scrollY) {
                            targetIndex = index + 1;
                        }
                    }
                });

                if (targetIndex !== this.showPlaceholderForIndex) {
                    this.showPlaceholderForIndex = targetIndex;
                    m.redraw();
                }
            }
        };

        document.addEventListener('dragover', this.dragoverenterhandler);
        document.addEventListener('dragenter', this.dragoverenterhandler);

        // Prevent dropping our sortable item into anything else
        // Without this it's possible to drop the value into inputs or worse, cause the browser to navigate to 0.0.0.0
        this.drophandler = event => {
            if (this.sortingIndex !== null) {
                event.preventDefault();
                event.stopPropagation();

                const origin = this.sortingIndex;
                // This component works in reference to the original index, so there are always two possible placeholders
                // in between the moved component. However we want to send the new index without that space
                const destination = this.showPlaceholderForIndex - (this.showPlaceholderForIndex > this.sortingIndex ? 1 : 0);

                this.sortingIndex = null;
                m.redraw();

                if (destination !== origin) {
                    vnode.attrs.onsort(origin, destination);
                }
            }
        };

        document.addEventListener('drop', this.drophandler);
    }

    onremove() {
        document.removeEventListener('dragover', this.dragoverenterhandler);
        document.removeEventListener('dragenter', this.dragoverenterhandler);
        document.removeEventListener('drop', this.drophandler);
    }

    view(vnode: Vnode<SortableAttrs>) {
        const children: Vnode[] = [];

        (vnode.children as Vnode<any>[]).forEach((content, index) => {
            if (this.sortingIndex !== null && this.showPlaceholderForIndex === index) {
                children.push(this.placeholder(vnode));
            }

            if (index === this.sortingIndex) {
                if (!content.attrs.style) {
                    content.attrs.style = {};
                }

                content.attrs.style.display = 'none';
            }

            content.attrs['data-index'] = index;
            content.attrs.ondragstart = event => {
                if (event.target.classList.contains('js-handle') && !vnode.attrs.disabled) {
                    const element = Array.from((vnode as any as VnodeDOM).dom.childNodes as any as HTMLElement[]).find(elem => elem.dataset.index === index + '');

                    // This should usually not happen since all referenced indexes should exist
                    // But this pleases typescript
                    if (!element) {
                        return;
                    }

                    const position = element.getBoundingClientRect();

                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text/plain', index + ''); // Cast to string
                    event.dataTransfer.setDragImage(element, event.pageX - position.left - window.scrollX, event.pageY - position.top - window.scrollY);

                    this.sortingIndex = index;
                    this.showPlaceholderForIndex = index;
                } else {
                    event.redraw = false;
                }
            };

            children.push(content);
        });

        if (this.sortingIndex !== null && this.showPlaceholderForIndex === (vnode.children as Vnode[]).length) {
            children.push(this.placeholder(vnode));
        }

        return m(vnode.attrs.containerTag || 'div', children);
    }

    placeholder(vnode: Vnode<SortableAttrs>): Vnode {
        return m(vnode.attrs.placeholderTag || 'div', {
            className: 'SortablePlaceholder',
            key: 'placeholder',
        }, vnode.attrs.placeholderTag === 'tr' ? m('td', {
            colspan: 100,
        }) : null);
    }
}
