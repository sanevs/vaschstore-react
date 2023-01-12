import React, { Component } from 'react'

export class InfoWindow extends Component {

    close()
    {
        this.props.setInfoOpenned(false)
    }

    render() {
    return (<>
        <div className='back-window-out' onClick={() => this.close()}></div>
        <div className='auth-window info-window'>
            <div className='auth-close auth-close2'
                onClick={() => this.close()}>X</div>
            <h5 className='info-header'>Курсовой проект по Web</h5>
            <div className='info-text-name'>Ващенков Владислав</div>
            <div className='info-text-name'>Группа: ПВ 021</div><br/>
            <div className='info-tech'>Технологии:</div>
            <div className='info-text'>Frontend:</div>
            <div className='info-text2'>
                React ( axios, bootstrap, react-cookie, react-bootstrap-table-next ),
                JavaScript, HTML, CSS
            </div>
            <div className='info-text'>Backend:</div>
            <div className='info-text2'>
                Spring Boot v2.7.3, PostgreSQL, Spring Data JPA repository, 
                Java v18, Apache Tomcat/9, Hibernate ORM v5
            </div>
        </div>
    </>)
    }
}

export default InfoWindow