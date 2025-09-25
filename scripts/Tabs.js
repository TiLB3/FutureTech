const rootSelectors = '[data-js-tabs]';

class Tabs {
    selectors = {
        rootElements: rootSelectors,
        buttonElements: '[data-js-tabs-button]',
        contentElements: '[data-js-tabs-content]',
    }

    stateClasses = {
        isActive: 'is-active',
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {

        this.rootElement = rootElement;
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.buttonElements);
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.contentElements);
        this.state = {
            activeTabIndex: [...this.buttonElements].findIndex((buttonElement) => {
                buttonElement.classList.contains(this.stateClasses.isActive);
            })
        }

        this.limitTabsIndex = this.buttonElements.length - 1;


        this.bindEvents();
    }

    activateTab(tabIndex) {
        this.state.activeTabIndex = tabIndex;
        this.buttonElements[tabIndex].focus();
    }

    previousTab = () => {
        const newTabIndex = this.state.activeTabIndex === 0 ? this.limitTabsIndex : this.state.activeTabIndex - 1;

        this.activateTab(newTabIndex);
    }
    nextTab = () => {
        const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex ? 0 : this.state.activeTabIndex + 1;

        this.activateTab(newTabIndex);
    }

    firstTab = () => {
        this.activateTab(0);
    }

    lastTab = () => {
        this.activateTab(this.limitTabsIndex);
    }


    onKeyDown = (event) => {
        const {
            code,
            metaKey
        } = event;

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        } [code];

        const isMakHomeKey = metaKey && code === 'ArrowLeft';
        if (isMakHomeKey) {
            this.firstTab();
            this.updateUI();
            return
        }

        const isMakEndKey = metaKey && code === 'ArrowRight';
        if (isMakEndKey) {
            this.lastTab();
            this.updateUI();
            return
        }

        if (action) {
            action();
            this.updateUI();
        }

    }

    updateUI() {
        const {
            activeTabIndex
        } = this.state


        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex;

            buttonElement.classList.toggle(this.stateClasses.isActive, isActive);
            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString());
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1');
        })

        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex;

            contentElement.classList.toggle(this.stateClasses.isActive, isActive);
        })
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex;
        this.updateUI();
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index));
        })

        this.rootElement.addEventListener('keydown', this.onKeyDown);
    }
}

class TabsCollection {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelectors).forEach((tabsEL) => new Tabs(tabsEL));
    }
}

export default TabsCollection