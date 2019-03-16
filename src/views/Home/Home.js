import React, { Component } from "react";
import ShopView from "../Shop/Shop";
import { latest } from "../../handlers/productHandler";
import "./Home.css";
import LoadingView from "../LoadingView/LoadingView";

class HomeView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latestPrdoucts: [],
            isLoading: true
        }
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView />
        }
        return (
            <React.Fragment>
                <p className="latestProducts">Welcome! See our latest products</p>
                <ShopView dynamic={false} products={this.state.latestPrdoucts} />
            </React.Fragment>
        )
    }

    async componentDidMount() {
        const products = await latest();
        this.setState({
            latestPrdoucts: products,
            isLoading: false,
        });
    }
}

export default HomeView;