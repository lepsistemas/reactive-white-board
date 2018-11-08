import React from 'react'

import Header from './Header'
import Canvas from './Canvas'

export default class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <Canvas fullscreen={true} />
            </div>
        )
    }

}