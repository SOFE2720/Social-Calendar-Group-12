
const url = 'http://127.0.0.1:8000';
let token;

/* httpPost & httpGet
url: localhost constant
endpoint: end of url
locked: if the endpoint needs authorization (user has to be logged in, locked endpoints have the padlock on the right in the
    fastapi docs(http://127.0.0.1:8000/docs#/))
callback: function to be executed after the request is performed
 */

function httpGet(url, endpoint, locked, callback) {
    let http = new XMLHttpRequest();
    http.open( "GET", url + endpoint, true );
    if (locked === true) {
        http.setRequestHeader("Authorization", 'Bearer ' + token);
    }
    http.send( null );
    http.onload = function () {
        callback(http);
    };
}

function httpPost(url, endpoint, locked, data, callback) {
    let http = new XMLHttpRequest();
    http.open( "POST", url + endpoint, true );
    if (locked === true) {
        http.setRequestHeader("Authorization", 'Bearer ' + token);
    }
    http.send(data);
    http.onload = function () {
        callback(http);
    };
}

/* stringifyForm
turns form data into api url friendly string
 */

function stringifyForm(form) {
    let formData = new FormData(form);
    return JSON.stringify(Object.fromEntries(formData.entries()));
}

// -------------------- User Functions --------------------

function loginUser(form) {
    let data = new FormData(form);
    httpPost(url, "/token", data, function (result) {
        let response = JSON.parse(result.response);
        if (result.status === 200) {
            token = response["access_token"];
            console.log(result.status);
        }
    });
}

function createUser(form) {
    httpPost(url, "/v1/users/create", false, stringifyForm(form), function (result) {
        let response = JSON.parse(result.response);
        console.log(response);
    });
}

function getCurrentUser() {
    httpGet(url, "/v1/users/me", true,function (result) {
        let response = JSON.parse(result.response);
        console.log(response)
    });
}

// -------------------- Friend Functions --------------------

function getFriends() {
    httpGet(url, "/v1/friends", true,function (result) {
        let response = JSON.parse(result.response);
        console.log(response)
    });
}

function addFriend(form) {
    httpPost(url, "/v1/friends/create", false, stringifyForm(form), function (result) {
        let response = JSON.parse(result.response);
        console.log(response);
    });
}

function updateFriendRelationship(form) { // This "form" should not be visible to the user
    httpPost(url, "/v1/friends/update", false, stringifyForm(form), function (result) {
        let response = JSON.parse(result.response);
        console.log(response);
    });
}

// -------------------- Event Functions --------------------

function getUsersEvents() {
    httpGet(url, "/v1/events", true,function (result) {
        let response = JSON.parse(result.response);
        console.log(response)
    });
}

function getFriendsEvents() {
    httpGet(url, "/v1/events/friends", true,function (result) {
        let response = JSON.parse(result.response);
        console.log(response)
    });
}

function createEvent(form) {
    httpPost(url, "/v1/events/create", true, stringifyForm(form), function (result) {
        let response = JSON.parse(result.response);
        console.log(response);
    });
}

function joinEvent(form) {
    httpPost(url, "/v1/events/join", true, stringifyForm(form), function (result) {
        let response = JSON.parse(result.response);
        console.log(response);
    });
}

function updateEventUsers(form) {
    httpPost(url, "/v1/events/update/users", true, stringifyForm(form), function (result) {
        let response = JSON.parse(result.response);
        console.log(response);
    });
}

function updateEventRelationship(form) {
    httpPost(url, "/v1/events/update/relationship", true, stringifyForm(form), function (result) {
        let response = JSON.parse(result.response);
        console.log(response);
    });
}


