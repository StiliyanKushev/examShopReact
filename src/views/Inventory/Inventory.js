import React, { Component } from "react";
import ShopView from "../Shop/Shop";
import { toast } from 'react-toastify';
import { withGlobalState } from 'react-globally';
import { selling, sold, bought } from "../../handlers/productHandler";
import "./Inventory.css";

class InventoryView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            selected: false,
            dynamic: null,
        }

        this.handleButton = this.handleButton.bind(this);
    }

    async handleButton(func, dynamic) {
        const products = await func(this.props.globalState);
        if (products.length === 0) {
            toast.error(`There aren't any products in this part of the inventory`, {
                closeButton: false,
                autoClose: true
            });
        }
        else {
            this.setState({
                selected: true,
                dynamic: dynamic ? true : false,
                products: products
            });
        }
    }

    goBack() {
        this.setState({
            selected: false,
            dynamic: null,
            products: []
        });
    }

    render() {
        if (!this.state.selected) {
            return (
                <React.Fragment>
                    <p className="inventoryInfo">Here are all your products you have, sold or selling</p>
                    <p className="moreInfo">Press one of the buttons bellow to browse the inventory and click the "go back" button to go back.</p>

                    <div className="selectableButtons">
                        <button className="selling" onClick={() => this.handleButton(selling, true)}>Selling products</button>
                        <button className="sold" onClick={() => this.handleButton(sold)}>Sold products</button>
                        <button className="bought" onClick={() => this.handleButton(bought)}>Bought products</button>
                    </div>
                </React.Fragment>
            );
        }
        else {
            return (
                <React.Fragment>
                    <button onClick={() => this.goBack()} className="goBackBtn">go back</button>
                    <ShopView redirect={this.props.redirect} dynamic={this.state.dynamic} products={this.state.products} />
                </React.Fragment>
            )
        }
    }
}

export default withGlobalState(InventoryView);