import React, { useState } from 'react'
import logo from '../logo.svg';
import '../App.css';
import { FiShoppingCart } from "react-icons/fi";
import CartItem from './CartItem';
import AuthWindow from './AuthWindow'
import { FiSlash } from "react-icons/fi";
import InfoWindow from './InfoWindow';

export default function Header(props) {
  var [cartOpenned, setCartOpenned] = useState(false);
  var [authOpenned, setAuthOpenned] = useState(false);
  var [infoOpenned, setInfoOpenned] = useState(false);
  var calcSum = () =>
  {
    let s = 0
    props.items.map(i => s += i.product.price)
    return s
  }

  return (
    <header>
        <div className='App-header'>
          <div className='head' onClick={() => window.location.reload()}>
            <img src={logo} className="App-logo" alt="logo" />
            <div>VaschStore</div>
          </div>
          <ul className='menu'>
            { props.admin != 'true' &&
            <li><FiShoppingCart className={`cartBtn ${cartOpenned && 'openned'}`}
              onClick={() => setCartOpenned(cartOpenned = !cartOpenned)}/></li> }
            <li><img className='logo' src='./img/user.png'
            onClick={() => setAuthOpenned(authOpenned = !authOpenned)}></img></li>
            <li><img className='logo' src='./img/info.png'
            onClick={() => setInfoOpenned(infoOpenned = !infoOpenned)}></img></li>
          </ul>
        </div>
        { cartOpenned && 
          <div className='cart'>
            {props.items.length !== 0 ? 
            props.items.map(i =>(
                <CartItem key={i.product.id} item={i} onDeleteFromCart={props.onDeleteFromCart}/>
            ))
                : <p>Корзина пуста</p>}
            {props.items.length !== 0 ?
            <p><br/>Сумма: <b>{calcSum()} $</b><br/>
            <p className='clear-cart' onClick={props.onClearCart}>Очистить <FiSlash></FiSlash></p></p> 
            : <p></p>}
          </div>
        }
        { authOpenned && 
          <AuthWindow onAuthUser={props.onAuthUser}
          headerText="LOG IN OR REGISTER:"
          setAuthOpenned={setAuthOpenned}
          loggedIn={props.loggedIn}
          user={props.user}
          onLogout={props.onLogout}
          emailExists={props.emailExists}
          wrongEmailOrPassword={props.wrongEmailOrPassword}/>}

        { infoOpenned && <InfoWindow setInfoOpenned={setInfoOpenned}/>}
    </header>
  )
}
