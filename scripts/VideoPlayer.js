const rootSelectors = '[data-js-video-player]';

class VideoPlayer {
    selectors = {
        rootElements: rootSelectors,
        video: '[data-js-video-player-video]',
        videoPanel: '[data-js-video-player-panel]',
        videoButton: '[data-js-video-player-play-button]',
    };

    stateClasses = {
        isActive: 'is-active',
    }

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.videoEl = this.rootElement.querySelector(this.selectors.video);
        this.videoPanelEl = this.rootElement.querySelector(this.selectors.videoPanel);
        this.videoButtonEl = this.rootElement.querySelector(this.selectors.videoButton);

        this.bindEvents();
    }

    onButtonClick = () => {
        this.videoEl.play();
        this.videoEl.controls = true;
        this.videoPanelEl.classList.remove(this.stateClasses.isActive);
    }

    onVideoPause = () => {
        console.log("fdf")
        this.videoEl.controls = false;
        this.videoPanelEl.classList.add(this.stateClasses.isActive);
    }

    bindEvents() {
        this.videoButtonEl.addEventListener('click', this.onButtonClick);
        this.videoEl.addEventListener('pause', this.onVideoPause);
    }
}

class VideoPlayerCollections {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll(rootSelectors).forEach((videoEL) => new VideoPlayer(videoEL));
    }
}

export default VideoPlayerCollections