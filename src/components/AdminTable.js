import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import PersonClient from '../http_client/PersonClient'
import ProductClient from "../http_client/ProductClient";
import { IoAdd } from "react-icons/io5";
import AuthWindow from './AuthWindow'
import AddProductWindow from './AddProductWindow';

export class AdminTable extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            products: [],
            users: [],
            authOpenned: false,
            productAddOpenned: false,
        }
        this.setAuthOpenned = this.setAuthOpenned.bind(this)
        this.setProductAddOpenned = this.setProductAddOpenned.bind(this)
        this.addProduct = this.addProduct.bind(this)
    }

    componentDidMount()
    {
      ProductClient.getProducts()
        .then(response =>{
          this.setState({
            products: response.data
          })
      })
      PersonClient.getPersons(this.props.userId)
        .then(response =>{
          this.setState({
            users: response.data
          })
      })
    }

    setAuthOpenned(bool){
        this.setState({
            authOpenned: bool
        })
    }
    setProductAddOpenned(bool){
        this.setState({
            productAddOpenned: bool
        })
    }

    priceFormatter = data =>{
        return <>
            {data} $
        </>
    }
    imageFormatter = data =>{
        return <>
            <img className='table-img' src={data}></img>
        </>
    }
    usersColumns = [
        {
            dataField: "id",
            text: "Id",
            sort: true
        },
        {
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            dataField: "email",
            text: "Email",
            sort: true
        },
        {
            dataField: "role.name",
            text: "Role",
            sort: true
        }
    ]
    productColumns = [
        {
            dataField: "id",
            text: "Id",
            sort: true
        },
        {
            dataField: "image",
            text: "Image",
            sort: true,
            formatter: this.imageFormatter
        },
        {
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            dataField: "price",
            text: "Price",
            sort: true,
            formatter: this.priceFormatter
        },
        {
            dataField: "category.name",
            text: "Category",
            sort: true
        }

    ]

    addProduct(image, name, price, category)
    {
        ProductClient.add({
            image: 'img/' + image,
            name: name,
            price: price,
            category: {id: category.id}
        }).then(response => {
            response.data.category = category
            this.state.products.push(response.data)
            this.setState({
                products: this.state.products
            })
        })
        this.setProductAddOpenned(false)
    }

    render() {
        return (<>
            <div className='table-header'>
                Users: <p><IoAdd onClick={() => this.setAuthOpenned(true)}/></p>
            </div> 
        { this.state.users.length !== 0 &&
        <BootstrapTable keyField={"id"}
            columns={this.usersColumns}
            data={this.state.users} 
            striped hover 
        />}
        <br/>
        <div className='table-header'>Products: 
            <p><IoAdd onClick={() => this.setProductAddOpenned(true)}/></p>
        </div> 
        <br/>
        { this.state.products.length !== 0 &&
        <BootstrapTable keyField={"id"}
            columns={this.productColumns}
            data={this.state.products} 
            striped hover 
        />}
        { this.state.authOpenned && <>
            <AuthWindow onAuthUser={this.props.onAuthUser}
            headerText="ADD USER:"
            setAuthOpenned={this.setAuthOpenned}
            emailExists={false}
            />
        </>}
        { this.state.productAddOpenned && <>
            <AddProductWindow setProductAddOpenned={this.setProductAddOpenned}
                onAddProduct={this.addProduct}
            />
        </>}
        </>
        )
    }
}

export default AdminTable