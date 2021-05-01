class BarsList {
    constructor() {
        this._bars = [];
    }

    getBars() {
        return this._bars;
    }

    emptyBarsList() {
        this._bars = [];
    }

    swap(_prev, _curr) {
        let tmp = this._bars[_prev];
        this.Bars[_prev] = this._bars[_curr];
        this._bars[_curr] = tmp;
    }
}