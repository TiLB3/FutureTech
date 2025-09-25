const rootSelectors = '[data-js-expandable-content]';

class ExpandableContent {
    selectors = {
        root: rootSelectors,
        expandableButton: '[data-js-expandable-content-button]',
    }

    stateClasses = {
        isExpanded: 'is-expanded',
    }

    animationParams = {
        duration: 500,
        easing: 'ease',
    }

    constructor(rootELement) {
        this.rootELement = rootELement;
        this.expandableButtonElement = this.rootELement.querySelector(this.selectors.expandableButton);

        this.bindEvents();
    }

    expand() {
        const {
            offsetHeight,
            scrollHeight
        } = this.rootELement;

        this.rootELement.classList.add(this.stateClasses.isExpanded);
        this.rootELement.animate([{
                maxHeight: `${offsetHeight}px`,
            },
            {
                maxHeight: `${scrollHeight}px`,
            },
        ],this.animationParams);
    }

    onButtonClick = () => {
        this.expand();
    }

    bindEvents() {
        this.expandableButtonElement.addEventListener('click', this.onButtonClick);
    }
}

class ExpandableContentColletction {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelectors).forEach((expandEL) => new ExpandableContent(expandEL));
    }
}

export default ExpandableContentColletction