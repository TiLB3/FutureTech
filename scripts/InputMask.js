const rootSelectors = '[data-js-input-mask]';

class InputMask {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.init();
    }

    init() {
        const isLibWork = typeof window.IMask !== undefined;

        if(isLibWork) {
            window.IMask(
                this.rootElement, {
                    mask: this.rootElement.dataset.jsInputMask,
                }
            );
        } else  {
            console.error("Библиотека 'IMask' не подключена!!");
        }
    }
}

class InputMaskCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelectors).forEach((maskEL) => new InputMask(maskEL));
    }
}

export default InputMaskCollection