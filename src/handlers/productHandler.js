import manageDBResponse from "./toastResponseHandler";

//function for handling the products (sell and store)
function sell(url, data, redirect, globalState) {
    fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json", token: globalState.userToken }
    }).then(rawData => rawData.json())
        .then(resBody => {
            manageDBResponse(resBody,
                // if the response is succsessful
                () => {
                    redirect("/");
                });
        });
}

async function shop() {
    let products = [];
    await fetch("http://localhost:9999/feed/products", {
        method: "get",
    }).then(rawData => rawData.json())
        .then(resBody => {
            products = resBody.products;
        });
    console.log(products);
    return products;
}

async function latest() {
    let products = [];
    await fetch("http://localhost:9999/feed/products/latest", {
        method: "get",
    }).then(rawData => rawData.json())
        .then(resBody => {
            products = resBody.products;
        });
    console.log(products);
    return products;
}

async function buy(globalState, id, redirect) {
    if (globalState.username === null) {
        return redirect("/login");
    }
    else {
        await fetch("http://localhost:9999/feed/product/buy/" + id, {
            method: "post",
            body: JSON.stringify({ username: globalState.username }),
            headers: { "Content-Type": "application/json", token: globalState.userToken }
        }).then(rawData => rawData.json())
            .then(resBody => {
                manageDBResponse(resBody,
                    // if the response is succsessful
                    () => {
                        redirect("/shop");
                    });
            });
    }
}

async function remove(globalState, id, redirect) {
    await fetch("http://localhost:9999/feed/product/remove/" + id, {
        method: "post",
        body: JSON.stringify({ username: globalState.username }),
        headers: { "Content-Type": "application/json", token: globalState.userToken }
    }).then(rawData => rawData.json())
        .then(resBody => {
            manageDBResponse(resBody,
                // if the response is succsessful
                () => {
                    redirect("/shop");
                });
        });
}

async function edit(url, data, redirect, globalState) {
    fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json", token: globalState.userToken }
    }).then(rawData => rawData.json())
        .then(resBody => {
            manageDBResponse(resBody,
                // if the response is succsessful
                () => {
                    redirect("/shop");
                });
        });
}

async function selling(globalState) {
    let products = [];
    await fetch("http://localhost:9999/feed/products/selling", {
        method: "get",
        headers: { "Content-Type": "application/json", token: globalState.userToken,username:globalState.username }
    }).then(rawData => rawData.json())
        .then(resBody => {
            products = resBody.products;
        });
    console.log(products);
    return products;
}

async function sold(globalState) {
    let products = [];
    await fetch("http://localhost:9999/feed/products/sold", {
        method: "get",
        headers: { "Content-Type": "application/json", token: globalState.userToken,username:globalState.username }
    }).then(rawData => rawData.json())
        .then(resBody => {
            products = resBody.products;
        });
    console.log(products);
    return products;
}

async function bought(globalState) {
    let products = [];
    await fetch("http://localhost:9999/feed/products/bought", {
        method: "get",
        headers: { "Content-Type": "application/json", token: globalState.userToken,username:globalState.username }
    }).then(rawData => rawData.json())
        .then(resBody => {
            products = resBody.products;
        });
    console.log(products);
    return products;
}

export {
    sell,
    shop,
    latest,
    buy,
    remove,
    edit,
    selling,
    sold,
    bought
}