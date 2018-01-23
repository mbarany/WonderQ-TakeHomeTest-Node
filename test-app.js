const fetch = require('node-fetch');

const baseUrl = 'http://0.0.0.0:3000';

async function logStatus() {
    const status = await fetch(baseUrl + '/status').then((res) => {
        return res.json();
    });
    console.log(status);
}

async function addItem(data) {
    const res = await fetch(baseUrl + '/add', {
        method: 'POST',
        body: data
    });
    const json = await res.json();

    return json.id;
}

async function getNextItem() {
    const res = await fetch(baseUrl + '/next', {
        method: 'POST'
    });
    const json = await res.json();

    return json;
}

async function ack(id) {
    await fetch(baseUrl + '/ack/' + id, {
        method: 'POST'
    });
}

async function nack(id) {
    await fetch(baseUrl + '/nack/' + id, {
        method: 'POST'
    });
}

(async function () {
    await logStatus();

    console.log('Add some items');
    await addItem({
        foo: "bar1"
    });
    await addItem({
        foo: "bar2"
    });

    await logStatus();

    const item1 = await getNextItem();
    console.log('do some work...then ack');
    await ack(item1.id);

    await logStatus();

    const item2 = await getNextItem();
    await logStatus();
    console.log('do some work...then nack and put back in queue');
    await nack(item2.id);

    await logStatus();

    await getNextItem();
    await logStatus();
    console.log('Sleeping...then item will go back to the queue automatically');

    setTimeout(async () => {
        console.log('See the item back in the queue');
        await logStatus();
        console.log('Done!');
    }, 16000);

})();
