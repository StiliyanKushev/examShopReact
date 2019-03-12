import React, { Component } from "react";
import "../forms.css";

class SellView extends Component {
    constructor(props){
        super(props);

        this.state = {
            title:null,
            description:null,
            imageUrl: null,
            price: null,
        }
    }

    render(){
        return (
            <div className="form sell">
                <form onSubmit={(e) => this.props.handleSell(e,this.state)}>
                    <div className="container">
                        <label htmlFor="title">
                            Title
                        </label>
                        <input onChange={this.props.handleChange.bind(this)} type="text" name="title" placeholder="Enter Product Title"/>
                        <label htmlFor="imageUrl">
                            Image URL
                        </label>
                        <input onChange={this.props.handleChange.bind(this)} type="text" name="imageUrl" placeholder="Enter the url of your product"/>
                        <label htmlFor="description">
                            Description
                        </label>
                        <textarea onChange={this.props.handleChange.bind(this)} rows="3" id="description" name="description"></textarea>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input onChange={this.props.handleChange.bind(this)} type="number" name="price" placeholder="Enter product price"/>
                        <button type="submit" className="SubmitButton">Sell</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SellView;