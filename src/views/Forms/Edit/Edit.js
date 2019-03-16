//import all React things and styles
import React, { Component } from "react";
import queryString from 'query-string';
import { withGlobalState } from 'react-globally'
import "../forms.css";

//import external handlers
import { submit, change } from "../../../handlers/formHandler";
import { edit } from "../../../handlers/productHandler";

class EditView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            imageUrl: "",
            price: "",
            creator: this.props.globalState.username
        }
    }

    render() {
        return (
            <div className="form sell">
                <form onSubmit={(e) => submit(e, this.state, "/feed/product/edit/" + this.props.computedMatch.params.id, edit, this.props.redirect, this.props.globalState)}>
                    <div className="container">
                        <label htmlFor="title">
                            Title
                        </label>
                        <input onChange={change.bind(this)} type="text" name="title" value={this.state.title} placeholder="Enter new product Title" />
                        <label htmlFor="imageUrl">
                            Image URL
                        </label>
                        <input onChange={change.bind(this)} type="text" name="imageUrl" value={this.state.imageUrl}  placeholder="Enter the new url of your product" />
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea onChange={change.bind(this)} rows="3" id="description"  value={this.state.description}  name="description"></textarea>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input onChange={change.bind(this)} type="number" name="price"  value={this.state.price} placeholder="Enter new product price" />
                        <button type="submit" className="SubmitButton">Edit & Save</button>
                    </div>
                </form>
            </div>
        );
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        this.setState({
            title: values.title,
            description: values.description,
            imageUrl: values.imageUrl,
            price: values.price,
        });
    }
}

export default withGlobalState(EditView);