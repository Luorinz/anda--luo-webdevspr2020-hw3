const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const toReadList = [
    {
        id: "1234",
        title: 'banana',
        subtitle: 'yellow',
        authors: 'crescent',
        publisher: '',
        publishedDate: '',
        description: 'test'
    }
];

const haveReadList = [
    {
        id: "22222",
        title: 'test',
        subtitle: 'A good book',
        authors: 'John Doe',
        publisher: 'test',
        publishedDate: 'test',
        description: 'A great book'
    }];

// get toReadList and have ReadList
router.get('/toread', (req, res) => res.send(toReadList));
router.get('/haveread', (req, res) => res.send(haveReadList));

// add toread
router.post('/addtoread', (req, res) => {
    const body = req.body;
    const bookId = body.id ? body.id : uuidv4();
    toReadList.push({
        id: bookId,
        title: body.title,
        subtitle: body.subtitle,
        authors: body.authors,
        publisher: body.publisher,
        publishedDate: body.publishedDate,
        description: body.description
    });
    res.status(200).send({message: 'Success!', id: bookId});
});

// add have read
router.post('/addhaveread', (req, res) => {
    const body = req.body;
    const bookId = body.id ? body.id : uuidv4();
    haveReadList.push({
        id: bookId,
        title: body.title,
        subtitle: body.subtitle,
        authors: body.authors,
        publisher: body.publisher,
        publishedDate: body.publishedDate,
        description: body.description
    });
    res.status(200).send({message: 'Success!', id: bookId});
});

// delete toread
router.delete('/deletetoread/:id', function (req, res) {
    const foodId = req.params.id;
    for (var i = toReadList.length - 1; i >= 0; i--) {
        if (toReadList[i].id === foodId) {
            toReadList.splice(i, 1);
        }
    }
    // Note that DELETE requests are ALWAYS successful,
    // even if the resource is already delete
    res.status(200).send('Success!');
});

// delete haveread
router.delete('/deletehaveread/:id', function (req, res) {
    const foodId = req.params.id;
    for (var i = haveReadList.length - 1; i >= 0; i--) {
        if (haveReadList[i].id === foodId) {
            haveReadList.splice(i, 1);
        }
    }
    // Note that DELETE requests are ALWAYS successful,
    // even if the resource is already delete
    res.status(200).send('Success!');
});

// search book by title


module.exports = router;