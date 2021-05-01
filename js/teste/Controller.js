class Controller {
    constructor() {
        this._quantity = 250;
        this._range = 300;
        this._container = document.getElementById('container');
        this._heightUnit;
        this._numbers = new BarsList();
        this._elements;
        // events queue
        this._eventsQueue = [];
    }
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    // generate an random integer between a given interval
    _getRandomInt() {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // create the array of numbers with random numbers
    _createArrayNumbers() {
        for (let i = 0; i < this._quantity; i++) {
            this._numbers.setBar({
                value: getRandomInt(1, this._range),
                height : undefined,
            });
        }
    }

    _defineHeight() {
        this._heightUnit = container.offsetHeight / 
        this._numbers.getBars().reduce((prev, curr) => (prev.value > curr.value) ? prev : curr).value;
    }
    // create the bars on the DOM
    _createBars(list) {
        list.forEach((item, index) => {
            let element = document.createElement('div');
            item.height = heightUnit * item.value;
            element.style.height = `${heightUnit * item.value}px`;
            element.style.order = index;
            element.classList.add('backgroundColor');
            container.appendChild(element);
        });
    }
    // execute the events queue
    _executeQueue() {
        this._eventsQueue.forEach((e, index) => {
            setTimeout(() => {
                elements[e.prev.index].style.height = `${e.prev.height}px`;
                elements[e.curr.index].style.height = `${e.curr.height}px`;
            }, (index + 1) * 1);
        });
        this._eventsQueue = [];
    }

    sort(algorithm) {
        if (algorithm == 'bubble') {
            
        }
    }
}