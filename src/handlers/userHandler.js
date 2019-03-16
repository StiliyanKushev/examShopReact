import manageDbResponse from "./toastResponseHandler";

//functions for managing the user data
function saveUserSession(resBody) {
    sessionStorage.setItem("username", resBody.user.username);
    sessionStorage.setItem("userToken", resBody.token);
    sessionStorage.setItem("isAdmin", resBody.user.roles.indexOf("Admin") !== -1);
}
function removeUserSession() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("isAdmin");
}
function login(url, data, redirect) {
    fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(rawData => rawData.json())
        .then(resBody => {
            console.log(resBody);
            manageDbResponse(resBody,
                // if the response is succsessful
                () => {
                    saveUserSession(resBody);
                    redirect("/", {
                        username: resBody.user.username,
                        userToken: resBody.token,
                        isAdmin: resBody.user.roles.indexOf("Admin") !== -1
                    });
                });
        });
}
function register(url, data, redirect) {
    fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(rawData => rawData.json())
        .then(resBody => {
            console.log(resBody);
            manageDbResponse(resBody,
                // if the response is succsessful
                () => {
                    redirect("/");
                });
        });
}
function logout(redirect) {
    removeUserSession();
    redirect("/", {
        username: null,
        userToken: null,
        isAdmin: null,
    });
}

export {
    login,
    register,
    logout,
}