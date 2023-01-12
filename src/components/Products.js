import React from "react";
import Product from './Product';
import ProductClient from "../http_client/ProductClient";

export default class Products extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            products: []
        }
    }

    componentDidMount()
    {
      ProductClient.getProducts()
        .then(response =>{
          this.setState({
            products: response.data
          })
      })
    }
  
    render(){
        return(
            <div className={this.props.className}>
                { this.state.products.map(
                    p => <Product className="product" product={p} key={p.id}
                        plus={"+"}
                        onAddToCart={this.props.onAddToCart}
                        onOpenProduct={this.props.onOpenProduct}
                        sizes={this.props.sizes}/>
                )}
            </div>
        )
    }
}