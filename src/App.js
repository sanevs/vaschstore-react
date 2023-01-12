/*
cd D:\Mystat домашка\Course Web 1708-3108\frontend\vaschstore-react
*/

import React from "react";
import './App.css';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { IoDuplicate } from "react-icons/io5";

import Products from './components/Products';
import Product from './components/Product';
import Header from './components/Header';
import Footer from './components/Footer';
import PersonClient from "./http_client/PersonClient";
import CartItemClient from "./http_client/CartItemClient";
import CartClient from "./http_client/CartClient";
import SizeClient from "./http_client/SizeClient";
import AdminTable from "./components/AdminTable";


class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props){
    super(props);  
    let cookieUser = this.props.cookies.cookies.user;
    //console.dir(this.props.cookies.cookies)
    console.log('user=', this.props.cookies.cookies.user)
    console.log('logged=', this.props.cookies.cookies.logged)
    console.log('admin=', this.props.cookies.cookies.admin)
    this.state = {
      user: null,
      cartId: null,
      cartItems: [],
      loggedIn: !(
        this.props.cookies.cookies.logged === "undefined" || 
        this.props.cookies.cookies.logged === undefined
      ),
      emailExists: null,
      wrongEmailOrPassword: false,
      openProduct: false,
      product: null,
      sizes: [],
      admin: this.props.cookies.cookies.admin
    }
    this.addToCart = this.addToCart.bind(this)
    this.deleteFromCart = this.deleteFromCart.bind(this)
    this.addCartItem = this.addCartItem.bind(this)
    this.authUser = this.authUser.bind(this)
    this.setLoggedIn = this.setLoggedIn.bind(this)
    this.logout = this.logout.bind(this)
    this.clearCart = this.clearCart.bind(this)
    this.onOpenProduct = this.onOpenProduct.bind(this)
    this.adminAddUser = this.adminAddUser.bind(this)
    this.setUserNCartDB = this.setUserNCartDB.bind(this)

    SizeClient.getAll()
    .then(response => {
      this.setState({
        sizes: response.data
      })
    })

    if(cookieUser != "undefined" && cookieUser != undefined)
    {
      CartClient.getByPerson({id: cookieUser})
      .then(response => { 
        CartItemClient.getallByCart(response.data)
          .then(response => {this.setCartItemsDB(response.data)});
        this.setUserNCartDB(response.data);
      })      
    }
  }
  setCartItemsDB(data)
  {
    this.setState({cartItems: data})
  }
  setUserNCartDB(data)
  {
    this.setState({
      user: data.human,
      cartId: data.id
    })
  }
  addCartItem(product, cartId, size)
  {
    console.log(cartId)
    CartItemClient.add({
      product: product,
      cart: {id: cartId},
      size: size
    })
    .finally(() => {
      CartItemClient.getallByCart({id: this.state.cartId})
      .then(response => {
        this.setState({
          cartItems: response.data
        })
      })
    })
  }

  addToCart(product, size){
    if(this.state.cartItems.length === 0)
    {
      if(this.state.user === null)
      {
        //add user as guest
        this.registrate(product, size, `Guest ##${Date.now().toLocaleString()}##`, '', '', '3')
      }
      else{
        //authorized user logic
        this.addCartItem(product, this.state.cartId, size)
      }
    }
    else
    {
      this.addCartItem(product, this.state.cartId, size)
    }
  }
  
  deleteFromCart(id)
  {   
    CartItemClient.deleteById(id)

    this.setState({
      cartItems: this.state.cartItems.filter(i => i.id != id)
    })
  }
  clearCart()
  {
    console.log(this.state.cartId)
    CartItemClient.clearByCartId(this.state.cartId)
    this.setState({
      cartItems: []
    })
  }

  onOpenProduct(product)
  {
    this.setState({
      openProduct: !this.state.openProduct,
      product: product
    })
  }
  
  authUser(name, email, password)
  {
    //initial check email
    if(name == "" && password == "")
    {
      console.log('init')
      PersonClient.getPersonCheck(email)
      .then(response => {
        this.setState({ emailExists: !(response.data === null) })
      })
    }
    //log in
    else if(name == "")
    {
      console.log('login')
      this.setState({ wrongEmailOrPassword: false })
      PersonClient.getPerson(email, password)
      .then(response => 
        {
          console.log('user:')
          console.dir(response.data)
          this.setState({
            user: response.data,
          })    
          this.props.cookies.set("user", response.data.id);
          this.props.cookies.set("logged", true);
          if(response.data.role.id === 1)
            this.props.cookies.set("admin", true);
          this.setLoggedIn(true);
        }).catch(() => {
          this.setState({ wrongEmailOrPassword: true })
      })
    }
    //register
    else
    {
      console.log('user: ', name, email, password)
      this.registrate(null, null, email, password, name, '2')
    }
  }
  registrate(product, size, email, password, name, roleId)
  {
    PersonClient.add({
      email: email,
      password: password,
      name: name,
      role: {id: roleId} 
    }).then(response => {
      this.setState({
        user: response.data
      })
      this.props.cookies.set("user", response.data.id)
      if(roleId === '2')
      {
        console.log('role 2')
        this.props.cookies.set("logged", true);
        this.setLoggedIn(true);
      }

      //add cart
      CartClient.add({
        human: {id: response.data.id}
      }).then(response => {
        this.setState({
          cartId: response.data.id
        })
        if(product !== null)
          this.addCartItem(product, response.data.id, size)
      })
    })
  }
  setLoggedIn(bool)
  {
    this.setState({
      loggedIn: bool
    })
    window.location.reload()
  }
  
  logout()
  {
    this.props.cookies.set("user", "undefined")
    this.props.cookies.set("logged", "undefined")
    this.props.cookies.set("admin", "undefined")
    this.setLoggedIn(false);
  }
  adminAddUser(name, email, password)
  {
    PersonClient.add({
      email: email,
      password: password,
      name: name,
      role: {id: '2'} 
    }).then(response => {
      //add cart
      CartClient.add({
        human: {id: response.data.id}
      })      
      window.location.reload()
    }).catch((error) => {
      console.log('forbidden', error)
      alert("Пользователь с таким Email уже существует")
    })

  }
  render(){
  return (
    <div className="App">
      <Header items={this.state.cartItems} 
        onDeleteFromCart={this.deleteFromCart}
        onClearCart={this.clearCart}
        onAuthUser={this.authUser}
        loggedIn={this.state.loggedIn}
        user={this.state.user}
        onLogout={this.logout}
        emailExists={this.state.emailExists}
        wrongEmailOrPassword={this.state.wrongEmailOrPassword}
        admin={this.state.admin}
      />
      { this.state.admin !== "true" && <>
        <Products className="products"
          onAddToCart={this.addToCart}
          onOpenProduct={this.onOpenProduct}
          sizes={this.state.sizes}
        />
        {this.state.openProduct && <>
          <div className='back-window-out' onClick={() => this.onOpenProduct()}></div>
            <Product className="one-product"
              plus={<IoDuplicate/>}
              product={this.state.product}
              onAddToCart={this.addToCart}
              onOpenProduct={this.onOpenProduct}
              sizes={this.state.sizes}/>
        </>}
      </>}
      { this.state.admin === "true" && <>
        <AdminTable userId={this.props.cookies.cookies.user}
          onAuthUser={this.adminAddUser}
          />
      </>}
      <Footer/>
    </div>
  )}
}

export default withCookies(App);