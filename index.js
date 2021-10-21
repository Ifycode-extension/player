
class Player {
    constructor(divId, width, height) {
        this.divId = divId;
        this.width = width;
        this.height = height;

        //Store created video player in this
        this.initPlayer = this.init(this.divId, this.width, this.height);
        this.initPlayer = this;

        //Store created DOM elements inside variables for use later, to avoid repetition
        this.div = document.querySelector('#divId');
        this.video = document.querySelector('#divId > video');
        this.source = document.querySelector('#divId > video > source');
        this.a = document.querySelector('#divId > video > a');
    };

    //init function to create a video player inside div on the page upon instantiation
    init = (divId, width, height) => {
        //create div container for video element
        let str = `<div id="divId"></div>`;
        let parser = new DOMParser();
        let div = parser.parseFromString(str, 'text/html').body.querySelector('div');
        div.id = divId;
        document.body.appendChild(div);
        //Style div container
        const styles = { width: `${width}px`, height: `${height}px`};
        Object.assign(div.style, styles, { margin: '0 auto' });

        //Create video element
        str = `
        <video preload="metadata" controls width="${width}" height="${height}">
            <source src="" type="video/mp4">
            Your browser doesn't support HTML5 video. Here is
     a <a href="">link to the video</a> instead.
        </video>
        `;
        // Convert the HTML string into a document object
        parser = new DOMParser();
        let video = parser.parseFromString(str, 'text/html').body.querySelector('video');
        div.appendChild(video);

        /*let video = document.createElement('video');
        div.appendChild(video);
        video.width = width;
        video.height = height;
        let source = document.createElement('source');
        video.appendChild(source);
        source.setAttribute('type', 'video/mp4');
        source.setAttribute('src', '')
        video.setAttribute('playsinline', '');
        video.setAttribute('playsinline', '')*/

        return;
    }

    //Player's API functions

    load = (url) => {
        this.source.src = url;
        this.a.href = url;
        return url;
    }

    play = () => {
        this.video.muted = true; //use this since there's error on load, and when using setAttribute('mute')
        this.video.play();
        return true; 
    }

    pause = () => {
        this.video.pause();
        return true;
    }

    resize = (width, height) => {
        Object.assign(this.div.style, { width: `${width}px`, height: `${height}px` });
        this.video.width = width;
        this.video.height = height;
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
        if (autoplay) this.video.muted = true; //also set muted attr to true if autoplay is true, so that autoplay can work properly in browser
        return this.video.autoplay;
    }

    setVolume = (volume) => {
        let volumeToDecimal = volume / 100; //convert percentage value to decimal number between 0 and 1
        this.video.volume = volumeToDecimal;
        return volume;
    }

    getVolume = () => {
        let volumeToPercentage = this.video.volume * 100;
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
        document.body.addEventListener('click', (e) => {
            if (fullscreen) return this.video.requestFullscreen();
        });
    }

    getPlaybackState = () => {
        console.log(this.video.paused);
        console.log(this.video.ended);
        console.log(this.video.readyState);
        /*this.video.addEventListener('loadedmetadata', (e) => {
            //console.log(this.video.paused);
            //return this.video.duration;
        });*/
        /*this.video.addEventListener('ended', (e) => {
            return 'ended';
        }, false);*/
    }

}

window.addEventListener('load', () => {
    //Instantiate Player
    let player = new Player('divId', 640, 480);

    //Player's API:
    player.load('https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4');
    //console.log(player.play()); //remove muted and hook it up to a button instead
    //console.log(player.pause()); //fix error here too
    //console.log(player.resize(320, 240));
    //console.log(player.getHeight());
    //console.log(player.getWidth());
    //console.log(player.setAutoplay(true));
    //console.log(player.setVolume(60));
    //console.log(player.getVolume());
    //console.log(player.setMute(true));
    //console.log(player.getMute());
    //console.log(player.getDuration()); //using loadedmetadata
    //console.log(player.setFullscreen(true)); //fix this too
    
    //console.log(player.getPlaybackState());
    //console.log(player.getViewability());

    player.video.addEventListener('loadedmetadata', (e) => {
        console.log(player.getDuration());
    });
});
