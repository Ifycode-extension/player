//player.js file - video player, APIs (and usage)

class Player {
    constructor(divId, width, height) {
        [this.divId, this.width, this.height] = [divId, width, height];

        //store DOM elements from index.html inside variables for reuse
        this.dataLoadBtn = document.querySelectorAll('.more-content-sections');

        //Store created video player in this
        this.init = this.initPlayer(this.divId, this.width, this.height);
        this.init = this;

        //Store created DOM elements inside variables for reuse
        this.div = document.querySelector('#divId');
        this.video = document.querySelector('#divId > video');
        this.source = document.querySelector('#divId > video > source');
        this.a = document.querySelector('#divId > video > a');

        //Store states inside states variable
        this.states = ['play', 'pause', 'ended'];
    };

    //Create a video player inside #divId container on the page upon instantiation
    initPlayer = (divId, width, height) => {
        //create div container for video element
        let div = document.createElement('div');
        div.id = divId;
        //insert container before
        let parentElem = this.dataLoadBtn[0].parentNode;
        parentElem.insertBefore(div, this.dataLoadBtn[0].nextElementSibling);
        //Style - use width and div container from user's entry
        const styles = { width: `${width}px`, height: `${height}px` };
        Object.assign(div.style, styles);

        let displayState = document.querySelector('#display-state');
        displayState.style.width =`${width}px`;

        //Create video element
        let video = document.createElement('video');
        div.appendChild(video);
        video.width = width;
        video.height = height;
        let source = document.createElement('source');
        video.appendChild(source);
        source.setAttribute('type', 'video/mp4');
        source.setAttribute('src', 'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4');
        video.setAttribute('controls', '');
        video.setAttribute('playsinline', '');

        //Incase browser doesn't support video
        let text = document.createTextNode('Your browser doesn\'t support HTML5 video. '); 
        video.appendChild(text);
        let str = '<a href="">Here is a link to the video instead.</a>';
        let parser = new DOMParser();
        let a = parser.parseFromString(str, 'text/html').body.querySelector('a');
        video.appendChild(a);
        return;
    }

    //Player API methods

    load = (url) => {
        this.video.load();
        this.source.src = url;
        this.a.href = url;
        return url;
    }

    play = () => {
        this.video.play(); //hookup to button as it depends on user interaction to run without errors
        return true; 
    }

    pause = () => {
        this.video.pause(); //hookup to button as it depends on user interaction to run without errors
        return true;
    }

    resize = (width, height) => {
        Object.assign(this.div.style, { width: `${width}px`, height: `${height}px` });
        this.video.width = width;
        this.video.height = height;
        //change #display-state width alongside
        let displayState = document.querySelector('#display-state');
        displayState.style.width =`${width}px`;
        return true;
    }

    getHeight = () => {
        return this.video.height;
    }

    getWidth = () => {
        return this.video.width;
    }

    setAutoplay = (autoplay) => {
        this.video.autoplay = autoplay;
        if (autoplay) {
            this.video.load();
            this.video.muted = true;
        } //also set muted attr to true if autoplay is true, so that autoplay can work properly in browser
        return autoplay;
    }

    setVolume = (volume) => {
        let volumeToDecimal = volume / 100; //convert percentage value to decimal number between 0 and 1
        this.video.volume = volumeToDecimal;
        return volume;
    }

    getVolume = () => {
        let volumeToPercentage = Math.round(this.video.volume * 100); //convert to decimal number to percentage and round up
        return volumeToPercentage;
    }

    setMute = (mute) => {
        this.video.muted = mute;
        return this.video.muted;
    }

    getMute = () => {
        return this.video.muted;
    }

    getDuration = () => {
        return Math.round(this.video.duration);
    }

    setFullscreen = (fullscreen) => {
        if (fullscreen) {
            try {
                return this.video.requestFullscreen();
            } catch (err) {
                if (err) return this.video.webkitEnterFullScreen();
            }
        }
    }

    getPlaybackState = () => {
        let string = '';
        this.states.forEach((state) => {
            this.video.addEventListener(state, (e) => {
                if (e.type === 'play') {string = 'playing';}
                if (e.type === 'pause') {string = 'paused';}
                if (e.type === 'ended') {string = 'ended';}
                //user has to give the element an id of #display-state
                let displayState = document.querySelector('#display-state');
                displayState.innerHTML = string; //How to return this as a string instead of adding directly to HTML???
            });
        });
    }

    getViewability = () => {
        let buildThresholdList = () => {
            let thresholds = [];
            let numberSteps = 10;
    
            for(let i = 0.1; i <= numberSteps; i += 1) {
                let ratio = i/numberSteps;
                thresholds.push(ratio);
            }
            thresholds.push(0);
            thresholds.push(1);
            return thresholds;
        }
    
        let handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                let ratioToOneDecimal = parseFloat((entry.intersectionRatio).toFixed(1));
                let percentageVisible = ratioToOneDecimal * 100;
                //user has to give the element an id of #player-visibilty
                let playerVisibilty = document.querySelector('#player-viewability');
                playerVisibilty.innerHTML = `${percentageVisible}%`;
            });
        }    
    
        let createObserver = () => {
            let observer;
            let options = {
                root: null,
                rootMargin: '0px',
                threshold: buildThresholdList()
            }
            observer = new IntersectionObserver(handleIntersect, options);
            observer.observe(this.div);
        }

        createObserver();
    }
}



let playerApiDemo = (player) => {
    player.load('https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4');

    player.getPlaybackState();

    let inputUrl = document.querySelector('#input-url');
    let loadUrlButton = document.querySelector('#load-url-button');
    loadUrlButton.addEventListener('click', (e) => {
        player.load(inputUrl.value);
    });
    
    let togglePlay = document.querySelector('#toggle-play');
    let displayState = document.querySelector('#display-state');
    togglePlay.addEventListener('click', e => {
        if (displayState.innerHTML !== 'playing') { 
            player.play();
            togglePlay.innerHTML = 'Pause';
        } else {
            player.pause();
            togglePlay.innerHTML = 'Play';
        }
    });

    let toggleMute = document.querySelector('#toggle-mute');
    toggleMute.addEventListener('click', e => {
        if (toggleMute.innerHTML === 'Mute') { 
            player.setMute(true);
            toggleMute.innerHTML = 'Unmute';
        } else {
            player.setMute(false);
            toggleMute.innerHTML = 'Mute';
        }
    });

    let resizePlayer = document.querySelector('#resize-player');
    let inputWidth = document.querySelector('#input-width');
    let inputHeight = document.querySelector('#input-height');
    let errorDiv = document.querySelector('#error');
    resizePlayer.addEventListener('click', (e) => {
        if (inputWidth.value < 320 || inputHeight.value < 240) {
            errorDiv.innerHTML = 'Enter both width and height. Height must not be less than 320, width must not be less than 240.';
        } else {
            player.resize(inputWidth.value, inputHeight.value);
            errorDiv.innerHTML = '';
        }
    });

    let fullScreen = document.querySelector('#full-screen');
    fullScreen.addEventListener('click', (e) => {
        player.setFullscreen(true);
    });

    let autoPlay = document.querySelector('#auto-play');
    autoPlay.addEventListener('click', (e) => {
        player.setAutoplay(true);
    });

    let displayVolume = document.querySelector('#display-volume');
    displayVolume.innerHTML = `Display volume: ${player.getVolume()}%`;

    let getVolume = document.querySelector('#get-volume');
    getVolume.addEventListener('click', (e) => {
        displayVolume.innerHTML = `Display volume: ${player.getVolume()}%`;
    });

    let displayWidth = document.querySelector('#display-width');
    displayWidth.innerHTML = `Display width: ${player.getWidth()}px`;

    let getWidth = document.querySelector('#get-width');
    getWidth.addEventListener('click', (e) => {
        displayWidth.innerHTML = `Display width: ${player.getWidth()}px`;
    });

    let displayHeight = document.querySelector('#display-height');
    displayHeight.innerHTML = `Display height: ${player.getHeight()}px`;

    let getHeight = document.querySelector('#get-height');
    getHeight.addEventListener('click', (e) => {
        displayHeight.innerHTML = `Display height: ${player.getHeight()}px`;
    });

    let displayDuration = document.querySelector('#display-duration');
    player.video.addEventListener('loadedmetadata', (e) => {
        displayDuration.innerHTML = `Display duration: ${player.getDuration()} secs`;
    });

    let getDuration = document.querySelector('#get-duration');
    getDuration.addEventListener('click', (e) => {
        displayDuration.innerHTML = `Display duration: ${player.getDuration()} secs`;
    });

    let displayMute = document.querySelector('#display-mute');
    displayMute.innerHTML = `Muted: ${player.getMute()}`;

    let getMute = document.querySelector('#get-mute');
    getMute.addEventListener('click', (e) => {
        displayMute.innerHTML = `Muted: ${player.getMute()}`;
    });

    let setVolume = document.querySelector('#set-volume');
    let inputVolume = document.querySelector('#input-volume');
    setVolume.addEventListener('click', (e) => {
        player.setVolume(inputVolume.value);
    });

    player.getViewability();
}


window.addEventListener('load', () => {
 
    //Instantiate Player
    let player = new Player('divId', 320, 240);

    //Player API demo
    playerApiDemo(player);

    //Player's API:
    //player.load('https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4');
    //player.play();
    //player.pause();
    //player.setAutoplay(true);
    //player.setFullscreen(true);
    //player.resize(320, 240);
    //player.getVolume();
    //player.setVolume(60);
    //player.getHeight();
    //player.getWidth();
    //player.setMute(true);
    //player.getMute();
    //player.getPlaybackState();
    /*player.video.addEventListener('loadedmetadata', (e) => {
        player.getDuration();
    });*/
    //player.getViewability();
});