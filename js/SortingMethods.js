class SortingMethods {
    constructor() {
        this._events = [];
    }

    getEvents() {
        return this._events;
    }

    clearEvents() {
        this._events = [];
    }

    _swap(_list, _leftIndex, _rightIndex) {
        let tmp = _list[_leftIndex];
        _list[_leftIndex] = _list[_rightIndex];
        _list[_rightIndex] = tmp;
    }

    bubbleSort(_list) {
        let swap;
        let len = _list.length - 1;
        do {
            swap = false;
            for (let i = 0; i < len; i++) {
                if (_list[i].value > _list[i + 1].value) {
                    swap = true;
                    // swap the two values
                    this._swap(_list, i, i + 1);
                    // push an swap object into a events queue
                    this._events.push({ prev: { height: _list[i].height, index: i }, curr: { height: _list[i + 1].height, index: i + 1 } });
                }
            }
            len--;
        } while (swap);
    }

    _partition(_list, _left, _right) {
        let pivot = _list[Math.floor((_right + _left) / 2)], //middle element
            i = _left, //left pointer
            j = _right; //right pointer
        while (i <= j) {
            while (_list[i].value < pivot.value) {
                i++;
            }
            while (_list[j].value > pivot.value) {
                j--;
            }
            if (i <= j) {
                this._swap(_list, i, j); //swap two elements
                this._events.push({ prev: { height: _list[i].height, index: i }, curr: { height: _list[j].height, index: j } });
                i++;
                j--;
            }
        }
        return i;
    }

    quickSort(_list, _left, _right) {
        let index;
        if (_list.length > 1) {
            index = this._partition(_list, _left, _right);
            if (_left < index - 1) {
                this.quickSort(_list, _left, index - 1);
            }
            if (index < _right) {
                this.quickSort(_list, index, _right);
            }
        }
    }

    _buildHeap(_list, _len, _i) {
        let left = 2 * _i + 1;
        let right = 2 * _i + 2;
        let max = _i;

        if (left < _len && _list[left].value > _list[max].value) {
            max = left;
        }

        if (right < _len && _list[right].value > _list[max].value) {
            max = right;
        }

        if (max != _i) {
            this._swap(_list, _i, max);
            this._events.push({ prev: { height: _list[_i].height, index: _i }, curr: { height: _list[max].height, index: max } });
            this._buildHeap(_list, _len, max);
        }
    }

    heapSort(_list) {
        let len = _list.length;
        let i = Math.floor(len / 2 - 1);
        let k = len - 1;

        while (i >= 0) {
            this._buildHeap(_list, len, i);
            i--;
        }

        while (k > 0) {
            this._swap(_list, k, 0);
            this._events.push({ prev: { height: _list[0].height, index: 0 }, curr: { height: _list[k].height, index: k } });
            this._buildHeap(_list, k, 0);
            k--;
        }
    }
}

