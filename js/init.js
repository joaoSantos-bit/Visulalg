const init = (controlBtns, methodBtns) => {
    let numbers = [];
    let container = document.getElementById('container');

    let algorithm = undefined;
    let speed = undefined;
    let sort = new SortingMethods();
    let animating = false;
    let run = true;

    const QUANT_BARS = 150;
    const RANGE = 300;

    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    // generate an random integer between a given interval
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // create the array of numbers with random numbers
    const createArrayNumbers = () => {
        for (let i = 0; i < QUANT_BARS; i++) {
            numbers.push({
                value: getRandomInt(1, RANGE),
                height: undefined,
            });
        }
    }
    createArrayNumbers();

    // calculate the height of each bar based on the "canvas" size and the max value
    let heightUnit = container.offsetHeight / numbers.reduce((prev, curr) => (prev.value > curr.value) ? prev : curr).value;


    // create the bars on the DOM
    const createBars = list => {
        list.forEach((item, index) => {
            let element = document.createElement('div');
            item.height = heightUnit * item.value;
            element.style.height = `${heightUnit * item.value}px`;
            element.style.order = index;
            element.classList.add('backgroundColor');
            container.appendChild(element);
        });
    }
    createBars(numbers);

    // DOM elements (bars)
    let elements = [...container.children];

    // remove all the bars from the DOM
    const removeElements = () => {
        elements.forEach(element => element.remove());
        elements = [];
    }

    // reset the numbers and redraw the bars
    const resetArrayNumbers = () => {
        run = true; // unlock the run btn
        numbers = [];
        removeElements();
        createArrayNumbers();
        createBars(numbers);
        elements = [...container.children];
    }

    // execute the events queue
    const executeQueue = (events, speed) => {
        animating = true;
        run = false;
        let len = events.length;
        for (let i = 0; i < len; i++) {
            if (events[i].name == 'swap') {
                setTimeout(() => {
                    elements[events[i].prev.index].style.height = `${events[i].prev.height}px`;
                    elements[events[i].curr.index].style.height = `${events[i].curr.height}px`;
                }, (i + 1) * speed);
            }
        }
        // tells when the animations are done
        setTimeout(() => {
            animating = false;
        }, speed * len);
    }

    const onClick = (algorithm = 'bubblesort', speed = 30) => {
        // check the chosen sorting method
        if (algorithm == 'bubblesort') {
            sort.bubbleSort(numbers);
        } else if (algorithm == 'quicksort') {
            sort.quickSort(numbers, 0, numbers.length - 1);
        } else if (algorithm == 'heapsort') {
            sort.heapSort(numbers);
        }
        // execute the events queue
        executeQueue(sort.getEvents(), speed);
        sort.clearEvents();
    }

    methodBtns.forEach((btn, index) => {
        btn.element.addEventListener('click', () => {
            if (!animating) {
                algorithm = btn.name;
                speed = btn.speed;
                methodBtns.forEach((item, subIndex) => index != subIndex ? item.element.classList.remove('activeMethod') : item.element.classList.add('activeMethod'));
                resetArrayNumbers();    
            }
        }, false);
    });

    controlBtns.reset.addEventListener('click', () => {
        if (!animating) {
            resetArrayNumbers();
        }
    }, false);
    controlBtns.run.addEventListener('click', () => {
        if (!animating && run) {
            onClick(algorithm, speed);
        }
    }, false);
}









