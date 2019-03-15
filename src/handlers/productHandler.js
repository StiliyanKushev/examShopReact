import manageDBResponse from "./toastResponseHandler";

//function for handling the products (sell and store)
function sell(url, data,redirect) {
    console.log(arguments);
    fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(rawData => rawData.json())
        .then(resBody => {
            manageDBResponse(resBody,
                // if the response is succsessful
                () => {
                    console.log(123123123);
                    redirect("/");
                });
        });
}

export {
    sell,
}