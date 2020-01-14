console.log('Welcome to JavaScript Promises');

let p = new Promise((resolve, reject) => {
    let a = 1 + 1;
    if (a == 2) {
        resolve('Success');
    } else {
        reject('Failed');
    }
});

p.then(message => {
    console.log('This is in then ' + message);
}).catch(err => {
    console.error('This is in catch ' + err);
});

/////////////////////////////////////////////

const userLeft = false;
const userWatchingCatMeme = false;

function watchTutorialCallback(callback, errorCallback) {
    if (userLeft) {
        errorCallback({
            name: 'User Left',
            message: ':('
        });
    } else if (userWatchingCatMeme) {
        errorCallback({
            name: 'User Watching Cat Meme',
            message: 'Tutorials < Cat'
        });
    } else {
        callback('Thumbs up!');
    }
}

watchTutorialCallback(message => {
    console.log('watchTutorialCallback Success: ' + message)
}, error => {
    console.error(error.name + ' ' + error.message);
});

function watchTutorialPromise() {
    return new Promise((resolve, reject) => {
        if (userLeft) {
            reject({
                name: 'User Left',
                message: ':('
            });
        } else if (userWatchingCatMeme) {
            reject({
                name: 'User Watching Cat Meme',
                message: 'Tutorials < Cat'
            });
        } else {
            resolve('Thumbs up!');
        }
    });
}

watchTutorialPromise().then(message => {
    console.log('watchTutorialPromise Success: ' + message)
}).catch(error => {
    console.error(error.name + ' ' + error.message);
});

const recordVideoOne = new Promise((resolve, reject) => {
    resolve('Video 1 Recorded');
});

const recordVideoTwo = new Promise((resolve, reject) => {
    resolve('Video 2 Recorded');
});

const recordVideoThree = new Promise((resolve, reject) => {
    resolve('Video 3 Recorded');
});

Promise.all([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then(messages => {
    console.log('Promise All: ' + messages);
});

Promise.race([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then(message => {
    console.log('Promise Race: ' + message);
});

////////////////////////////////////////////

let cleanRoom = () => {
    return new Promise((resolve, reject) => {
        resolve('Cleaned the room');
    });
};

let removeGarbage = (message) => {
    new Promise((resolve, reject) => {
        resolve(message + ' remove garbage');
    });
};

let winIcecream = (message) => {
    new Promise((resolve, reject) => {
        resolve(message + ' win Icecream');
    });
};

cleanRoom().then(result => {
    return removeGarbage(result);
}).then(result => {
    return winIcecream(result);
}).then(result => {
    console.log('finished ' + result);
}).catch(err => {
    console.error('Error caught ' + err);
});

///////////////////////////