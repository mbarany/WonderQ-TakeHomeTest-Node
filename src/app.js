import express from 'express';
import bodyParser from 'body-parser';
import InMemoryStorage from './Storage/InMemoryStorage';
import Queue from './Queue';

module.exports = function () {
    const storage = new InMemoryStorage();
    const queue = new Queue(storage);

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(bodyParser.json());

    app.get('/status', (req, res) => {
        const count = queue.getCount();
        res.send({
            total: queue.getCount(),
            totalActive: queue.getActiveCount()
        });
    });

    app.post('/add', (req, res) => {
        const body = req.body;
        const id = queue.add(body);
        res.status(201).send({id});
    });

    app.post('/next', (req, res) => {
        const item = queue.getNext();
        res.send(item);
    });

    app.post('/ack/:id', (req, res) => {
        const id = req.params.id;
        queue.ack(id);
        res.status(204).send();
    });

    app.post('/nack/:id', (req, res) => {
        const id = req.params.id;
        queue.nack(id);
        res.status(204).send();
    });

    const server = app.listen(port, function() {
        console.log('Express server listening on port ' + port);
    });
};
