import React from "react";
import { withGlobalState } from 'react-globally'
import "./Product.css";

import {buy,remove,edit} from "../../handlers/productHandler";

const Product = (props) => {
    return (
        <div className="productContainer">
            <div className="title"><p>{props.source.title}</p><p className="creator">{props.source.creator}</p><p className="price">{props.source.price}$</p></div>
            <div className="image" style={{ background: `url(${props.source.imageUrl})` }}></div>
            <div className="description"><p>{props.source.description}</p></div>
            <div className="buttons">
                {
                    props.dynamic ? (
                        <React.Fragment>
                            {
                                props.isMine ? (
                                    null
                                ) : (<button onClick={() => buy(props.globalState,props.source._id,props.redirect)} id="buy">BUY</button>)
                            }
                            {
                                props.isMine ? (
                                    <button onClick={() => edit(props.globalState,props.source._id,props.redirect)} id="edit">EDIT</button>
                                ) : (null)
                            }
                            {
                                props.isMine ? (
                                    <button onClick={() => remove(props.globalState,props.source._id,props.redirect)} id="delete">DELETE</button>
                                ) : (null)
                            }
                        </React.Fragment>
                    ) : (null)
                }
            </div>
        </div>
    );
}

export default withGlobalState(Product);