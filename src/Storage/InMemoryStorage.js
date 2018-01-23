class InMemoryStorage {
    constructor() {
        this.dataStore = [];
        this.activeItems = {};
    }

    addItem(item) {
        this.dataStore.push(item);
    }

    hasItems() {
        return !!this.dataStore.length;
    }

    getNextItem() {
        const item = this.dataStore.pop();
        if (!item) {
            return null;
        }
        this.activeItems[item.id] = item;
        return item;
    }

    hasActiveItem(id) {
        return !!this.activeItems[id];
    }

    getActiveCount() {
        return Object.keys(this.activeItems).length;
    }

    deleteActiveItem(id) {
        delete this.activeItems[id];
    }

    restoreActiveItem(id) {
        this.addItem(this.activeItems[id]);
        delete this.activeItems[id];
    }

    getCount() {
        return this.dataStore.length;
    }
}

export default InMemoryStorage;
