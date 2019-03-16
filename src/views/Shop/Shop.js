//import all React things and styles
import React, { Component } from "react";
import { withGlobalState } from 'react-globally'
import "./Shop.css";

//import external handlers
import { shop } from "../../handlers/productHandler";

import LoadingView from "../LoadingView/LoadingView";
import Product from "../../components/Product/Product";

class ShopView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products || [],
            isLoading: this.props.products ? false : true,
            dynamic: this.props.dynamic === true || this.props.dynamic === false ? this.props.dynamic : true
        }
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView />
        }
        return (
            <div className="shopListDiv">
                <ul className="shopList">
                    {
                        this.state.products.map(product =>
                            <li key={product._id}>
                                <Product isMine={product.creator === this.props.globalState.username} source={product} dynamic={this.state.dynamic} redirect={this.props.redirect} />
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }

    async componentDidMount() {
        if (this.state.isLoading == true) {
            let products = await shop();
            this.setState({
                products: products,
                isLoading: false,
            });
        }
    }
}

export default withGlobalState(ShopView);