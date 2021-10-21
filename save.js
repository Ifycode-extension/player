
/*class Player {
    constructor(divId, width, height) {
        this.divId = divId;
        this.width = width;
        this.height = height;
        //this.load = this.load.bind(this);
    }

    init() {
        return this.load();//this.width + this.height;
    }

    load(url) {
        return url;
    }
}

let player = new Player().init;
let newPlayer = player.bind(new Player('divId', 120, 80));
console.log(newPlayer());

console.log(newPlayer().load('load url'));*/


//let player2 = new Player('divId', 120, 80);
//console.log(player2.load('load url'));



/*
class Player1 {
    constructor(divId, width, height) {
        this.divId = divId;
        this.width = width;
        this.height = height;
        this.init.bind(this);
    }

    init() {
        return this.width + this.height;
    }
}

let player1 = new Player1('divId', 120, 80);
console.log(player1);*/




/*
class Player {
    constructor(divId, width, height) {
        this.divId = divId;
        this.width = width;
        this.height = height;
        /*this.init() {
            return this.width + this.height;
        };*\/
        //this.init = this.init();
        //this.load = this.load.bind(this);
    }

    

    load(url) {
        return url;
    }
}

let player = new Player('divId', 120, 80);

console.log(player);
console.log(player.load('load url'));*/


class Player {
    constructor(divId, width, height) {
        this.divId = divId;
        this.width = width;
        this.height = height;

        //Create video player
        this.init(this.divId, this.width, this.height);
    };

    //init function to create a video player on the page upon instantiation
    init = (divId, width, height) => {
        //create div container for video element
        let elem = document.createElement('div');
        elem.id = divId;
        document.body.appendChild(elem);
        elem = document.querySelector(`#${divId}`);

        //Style div container
        const styles = { width: `${width}px`, height: `${height}px`, margin: '0 auto'};
        Object.assign(elem.style, styles, { border: '2px solid blue' });

        //Create and style video element
        const str = `
        <video controls width="${width}" height="${height}">
            <source src="/media/cc0-videos/flower.webm type="video/webm">
            Sorry, your browser doesn't support embedded videos.
        </video>
        `;

        // Convert the HTML string into a document object
        let parser = new DOMParser();
        let doc = parser.parseFromString(str, 'text/html');
        let video = doc.body.querySelector('video');
        elem.appendChild(video);

        /*
        let videoElem = document.createElement('video');
        elem.appendChild(videoElem);
        Object.assign(videoElem.style, styles);
        */

        return;
    }

    load = (test) => {
        console.log(test);
        return;
    }
}

let player = new Player('divId', 450, 200);
console.log(player)
player.load('load url');



















/*class Player {
    constructor(divId, width, height) {
        this.divId = divId;
        this.width = width;
        this.height = height;
        this.init = function () {
            return this.width + this.height;
        }
    }

    init() {
        return this.width + this.height;
    }

    /*
    load() {

    }

    play() {

    }

    pause() {

    }

    resize() {

    }

    getHeight() {

    }*\/
}

let player = new Player('divId', 120, 80).init;
let run = player.bind(new Player('divId', 120, 80));
console.log(run());*/

