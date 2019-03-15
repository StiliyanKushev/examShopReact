//import all React things and styles
import React, { Component } from "react";
import { withGlobalState } from 'react-globally'
import "../forms.css";

//import external handlers
import { submit, change } from "../../../handlers/formHandler";
import { sell } from "../../../handlers/productHandler";

class SellView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            description: null,
            imageUrl: null,
            price: null,
            creator: this.props.globalState.username
        }
    }

    render() {
        return (
            <div className="form sell">
                <form onSubmit={(e) => submit(e, this.state, "/feed/product/create", sell, this.props.redirect)}>
                    <div className="container">
                        <label htmlFor="title">
                            Title
                        </label>
                        <input onChange={change.bind(this)} type="text" name="title" placeholder="Enter Product Title" />
                        <label htmlFor="imageUrl">
                            Image URL
                        </label>
                        <input onChange={change.bind(this)} type="text" name="imageUrl" placeholder="Enter the url of your product" />
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea onChange={change.bind(this)} rows="3" id="description" name="description"></textarea>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input onChange={change.bind(this)} type="number" name="price" placeholder="Enter product price" />
                        <button type="submit" className="SubmitButton">Sell</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withGlobalState(SellView);