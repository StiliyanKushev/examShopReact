# The app

ExamShop is a simple shopping app that has all of the functionality that a shopping site needs.

## Idea
At the start, the user is provided only with a home view,that shows the last 2 products that are added to the shop. The shop view that has the option to buy a product, but redirects to the login page. And the login page itself, as well as a register page.

A logged-in user can sell or buy products. He can also edit and delete his own products. If the user goes into his inventory, he can see all products that he is selling, sold or bought.

Admins can do all thing as normal logged-in users, however they can edit and delete everyone's products if they feel like it.

## Basic file structure (only the important parts)
```
├── public
|   └── index.html
├── server					// this is all of the backend logic
|   ├── models				// User model, and Product model
|   ├── routes				// Basic auth and feed routes
|   └── index.js
├── src					    // this is most of the frontend logic
|   ├── components			// main components ex: Header,Content,Footer + Product, CustomRoute
|   ├── handlers			// files that hold function that handle a certain operation 
|   ├── views				// all components that will be part of a route inside the Content component
|   ├── App.js
|   ├── index.js
|   └── initialState.js		// holds all properties that the "global state" will have
├── .gitignore
└── package.json
```

#### Every component has a folder with a JS and CSS file so it can be easier to debug or change on the fly.  It looks like the following.

~~~
├── Content	
|   ├── Content.js
|   └── Content.css
~~~
## Global State
The global state holds the user data, so it can be accessed anywhere

Using a public npm [library](https://www.npmjs.com/package/react-globally), i manage to control the global state from anywhere,
by wrapping the component that needs to use globalState properties, in a function that is built-in to the library. 

The global state can then be parsed as an argument to a handler function and that way i can keep my code more organized without using Redux at all!

## Security and Validation
The app validates everything that the user is doing, and the backend logic will **NOT** let anyone who is not friendly to do harmful things. 

In case of an error, or if someone purposely tries to "cheat" or "break" the app, the backend will respond with a meaningful error message that the client/react will receive and display with the help of [react-toastify](https://www.npmjs.com/package/react-toastify/v/1.4.3) library.

## Routes

The app split in 3 parts
1. **Public** - *Anyone can access it*.
2. **Private** - *Only users can access it.*
3. **Administrative** - *Admins have full control over the things in it.*

#### * To help myself, i made a customRoute component that can control this part of the app.

``` javascript
<Switch>
	<Route  path="/"  render={() =>  <HomeView  />}  exact  />
	<CustomRoute
		path="/login"
		redirectPath="/"
		redirect={props.redirect}
		verification={!props.globalState.userToken}
		component={LoginView}
	exact  />
	<CustomRoute
		path="/register"
		redirectPath="/"
		redirect={props.redirect}
		verification={!props.globalState.userToken}
		component={RegisterView}
	exact  />
	<CustomRoute
		path="/sell"
		redirectPath="/login"
		redirect={props.redirect}
		verification={props.globalState.userToken}
		component={SellView}
	exact  />
	<CustomRoute
		path="/inventory"
		redirectPath="/login"
		redirect={props.redirect}
		verification={props.globalState.userToken}
		component={InventoryView}
	exact  />
	<CustomRoute
		path="/edit/:id"
		redirectPath="/login"
		redirect={props.redirect}
		verification={props.globalState.userToken}
		component={EditView}
	exact  />
	<Route
		path="/shop"
		render={() =>  <ShopView  redirect={props.redirect}  />}
	exact  />
</Switch>
```

#### * The customRoute has a prop *verification* that is true or false and a *redirectPath* if the verification is false.

## Handlers
1. ### Form Handler - handles the input tags on change, and on submit of a form
2. ### Product Handler - has functions for making a fetch to the server and doing CRUD operations. 
3. ### Toast Response Handler - handles the response body after a fetch and "toasts" the app with the provided by the backend message. It also calls a callback function if the fetch was successful.
4. ### User Handler - Handles the main authentication functions like (login,register,logout)
