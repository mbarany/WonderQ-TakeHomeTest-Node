# WonderQ

## Setup
`npm install`

## Running Server (Queue)
`npm start`

## Running Test app
Spin up the Server then run this
`node test-app.js`

## API Documentation
API uses JSON for inputs and outputs

### GET /status
Get the current Queue status. How many items are in the queue and how many are being actively worked on

### POST /add
Add a message to the queue. Whatever JSON in the request payload will become the data in the message

### POST /next
Get the next item from the queue. A consumer would use this to get a message and process it.

### POST /ack/:msgId
Ack the message to let the queue know it is fully processed. If you forget to Ack the message will go back into the queue after the configurable amount of time (currently 15 seconds).

### POST /nack/:msgId
Explicitly Nack the message so that it will be re-queued and re-processed by the consumer.
