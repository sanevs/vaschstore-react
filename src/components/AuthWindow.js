import React, { Component } from 'react'

export class AuthWindow extends Component {
    
    
    constructor(props)
    {
        super(props)
        this.state = {
            email: "",
            password: "",
            name: "",
            emptyInput: false,
        }
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
    }

    onChangeName(event)
    {
        this.setState({
            name: event.target.value
        })
    }
    onChangeEmail(event)
    {
        this.setState({
            email: event.target.value
        })
    }
    onChangePassword(event)
    {
        this.setState({
            password: event.target.value
        })
    }
    close()
    {
        this.props.setAuthOpenned(false)
        //window.location.reload()
    }
  
    render() { console.log()
        return (<>
        <div className='back-window-out' onClick={() => this.close()}></div>
            <div className='auth-window'>
                <div className='auth-close'
                    onClick={() => this.close()}>X</div>
                { !this.props.loggedIn && <>
                <div>{this.props.headerText}</div>

                { this.state.emptyInput &&
                    <div className='auth-error'>Заполните все поля!</div>}
                { this.props.wrongEmailOrPassword &&
                    <div className='auth-error'>Неверный логин/пароль!</div>}

                {this.props.emailExists !== null && !this.props.emailExists && <>
                    <input type='text' onChange={this.onChangeName}
                        value={this.state.name} placeholder="Имя пользователя"/><br/>
                    <input type="checkbox"/>
                    <label>Я хочу получать рекламу</label><br/><br/>
                </>}
                <input type='email' onChange={this.onChangeEmail}
                    value={this.state.email} placeholder="Email"/><br/>
                { (this.props.emailExists !== null) && <>
                    <input type='password' onChange={this.onChangePassword}
                        value={this.state.password} placeholder="Пароль"/><br/>
                </>}

                <button className='btn-auth'
                    onClick={() => { 
                        if((this.props.emailExists === null &&
                            this.state.email == "") ||
                            (this.props.emailExists && 
                                (this.state.email == "" || this.state.password == "")) ||
                            (!this.props.emailExists &&
                                this.state.email == "") 
                        )
                        {
                            this.setState({ emptyInput: true });
                            return;
                        }
                        this.props.onAuthUser(
                            this.state.name, this.state.email, this.state.password);
                        this.setState({ 
                            emptyInput: false,
                        });
                    }}>
                        Продолжить
                </button>
                </>}

                { this.props.loggedIn && <>
                <div>Привет, {this.props.user.name}</div>
                <div>Почта: {this.props.user.email}</div>
                <div>Роль: {this.props.user.role.name}</div>
                <button className='btn-logout'
                    onClick={() => this.props.onLogout()}>
                    Выйти из профиля
                </button>
                </>}
            </div>
        </>)
    }
}

export default AuthWindow