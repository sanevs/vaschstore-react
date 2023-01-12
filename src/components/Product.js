import React, { Component } from 'react'

export class Product extends Component {
    constructor(props)
    {
        super(props)
        this.size = this.props.sizes[0]
    }

    onSelectedSize(event)
    {
        this.size = this.props.sizes.filter(s => s.name === event.target.value)[0]
    }

    render() {
    return (
        <div className={this.props.className}  key={this.props.product.id} >
            <img src={this.props.product.image}
                onClick={() => this.props.onOpenProduct(this.props.product)}></img>
            <h3>{this.props.product.name}</h3>
            <b>{this.props.product.price} $  </b>
            <select onChange={(event) => this.onSelectedSize(event)}>
                <option disabled >Size:</option>
                {this.props.sizes != undefined && this.props.sizes.map(s => 
                    <option key={s.id} >{s.name}</option>
                )}
            </select>
            <div id="add" onClick={() => this.props.onAddToCart(this.props.product, this.size)}>
                {this.props.plus}
            </div>
        </div>
    )
    }
}

export default Product