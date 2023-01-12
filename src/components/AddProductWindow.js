import React, { Component } from 'react'
import CategoryClient from '../http_client/CategoryClient'

export class AddProductWindow extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            name: "",
            price: "",
            categories: [],
            emptyInput: false,
            selectedFile: null
        }

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)

        CategoryClient.getAll()
            .then(response => {
                this.setState({
                    categories: response.data
                })
                this.category = response.data[0]
            })
    }

    onChangeName(event)
    {
        this.setState({
            name: event.target.value
        })
    }
    onChangePrice(event)
    {
        this.setState({
            price: event.target.value
        })
    }

    close()
    {
        this.props.setProductAddOpenned(false)
    }

    onSelectedCategory(event)
    {
        this.category = this.state.categories.filter(c => c.name === event.target.value)[0]
    }

    onFileChange = event => { 
        console.dir(event.target.files)
        this.setState({ 
            selectedFile: event.target.files[0] 
        })
      }

    render() {
    return (<>
        <div className='back-window-out' onClick={() => this.close()}></div>
        <div className='auth-window'>
            <div className='auth-close'
                onClick={() => this.close()}>X</div>
            <div>ADD PRODUCT:</div>

            { this.state.emptyInput &&
                    <div className='auth-error'>Заполните все поля!</div>}
            
            <input type='text' onChange={this.onChangeName}
                        value={this.state.name} placeholder="Название"/><br/>
            <input type='number' onChange={this.onChangePrice}
                        value={this.state.price} placeholder="Цена, $"/><br/>
            <select onChange={(event) => this.onSelectedCategory(event)}>
                <option disabled >Category:</option>
                {this.state.categories != undefined && this.state.categories.map(c => 
                    <option key={c.id} >{c.name}</option>
                )}
            </select>

            <input type="file" onChange={this.onFileChange} /> 

            <button className='btn-auth'
                    onClick={() => { 
                        if(this.state.name == "" || this.state.price == "")
                        {
                            this.setState({ emptyInput: true });
                            return;
                        }
                        this.props.onAddProduct(
                            this.state.selectedFile.name, this.state.name, this.state.price, this.category);
                        this.setState({ 
                            emptyInput: false,
                        }); 
                    }}>
                        Добавить
                </button>

        </div>
    </>
    )
    }
}

export default AddProductWindow