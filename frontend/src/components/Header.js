import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Header extends React.Component {

    constructor(props) {
        super(props)

        this.title = this.title.bind(this)
        this.menu = this.menu.bind(this)
    }

    title() {
        return (
            <div className="container">
                <a className="navbar-brand" href="#/home">ChatU</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon="cog" />
                </button>
            </div>
        )
    }

    menu() {
        return (
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#/home"><b>Home</b></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#/about">About</a>
                    </li>
                </ul>
            </div>
        )
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                {this.title()}
                {this.menu()}
            </nav>
        )
    }

}