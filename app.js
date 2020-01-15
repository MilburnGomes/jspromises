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
    return new Promise((resolve, reject) => {
        resolve(message + ' remove garbage');
    });
};

let winIcecream = (message) => {
    return new Promise((resolve, reject) => {
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

const posts = [

    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

getPosts();

function createPosts(post) {
    setTimeout(() => {
        posts.push(post);
    }, 2000);
}

createPosts({ title: 'Post Three', body: 'This is post three' })

function createPostsCallback(post, callback) {
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

createPostsCallback({ title: 'Post Four', body: 'This is post four' }, getPosts);


function createPostsPromise(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;

            if (!error) {
                resolve();
            } else {
                reject('Error: Something went wrong');
            }
        }, 2000);
    });
}

createPostsPromise({ title: 'Post Five', body: 'This is post five' })
.then(getPosts)
.catch(err => {
    console.log(err);
});


const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'Goodbye');
});

const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());

Promise.all([promise1, promise2, promise3]).then(values => console.log(values));

// Async / Await
async function init() {
    await createPostsPromise({ title: 'Post Six', bosy: 'This is post six' })
    getPosts();
}

init();

// Async / Await / Fetch
async function fetchUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    console.log(data);
}

fetchUsers();