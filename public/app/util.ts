interface Array<T> {
    pushUnique(item: any): void;
}

Array.prototype.pushUnique = function (item: any) {
    var isNotIn = true;
    for (var i = 0; i < this.length; i++) {
        if (this[i] === item) {
            isNotIn = false;
        }
    }
    if (isNotIn) { this.push(item); }
}
