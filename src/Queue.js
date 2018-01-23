import uuidv4 from 'uuid/v4';

const TIME_TO_NACK_IN_MILLISECONDS = 15 * 1000;

class Queue {
    constructor(storage) {
        this.storage = storage;
    }

    getNext() {
        const item = this.storage.getNextItem();

        if (item) {
            setTimeout(() => {
                const id = item.id;
                if (this.storage.hasActiveItem(id)) {
                    this.nack(id);
                }
            }, TIME_TO_NACK_IN_MILLISECONDS);
        }

        return item;
    }

    getCount() {
        return this.storage.getCount()
    }

    getActiveCount() {
        return this.storage.getActiveCount()
    }

    add(data) {
        const id = uuidv4();
        const item = {id, data};

        this.storage.addItem(item);

        return id;
    }

    ack(id) {
        console.log(`ACK for id: ${id}`);
        this.storage.deleteActiveItem(id);
    }

    nack(id) {
        console.log(`NACK for id: ${id}`);
        this.storage.restoreActiveItem(id);
    }
}

export default Queue;
