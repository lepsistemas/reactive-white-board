import React from 'react'

import SockJsClient from 'react-stomp'

export default class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.width = props.width
        this.height = props.height

        this.state = {
            canvas: {},
            isDrawing: false,
            lastX: 0,
            lastY: 0,
            color: "#000000",
            lineWidth: 5,
            drawing: ''
        }
        this.send = this.send.bind(this)
        this.ctx = this.ctx.bind(this)
        this.canvas = this.canvas.bind(this)
        this.clear = this.clear.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleData = this.handleData.bind(this)
        this.drawImage = this.drawImage.bind(this)
    }

    canvas() {
        return this.refs.canvas
    }
    
    ctx() {
        let ctx = this.canvas().getContext('2d')
        ctx.strokeStyle = "#BADA55"
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.lineWidth = Number(this.state.lineWidth)
        return ctx
    }

    clear() {
        this.setState({drawing: ''})
        const ctx = this.ctx()
        ctx.clearRect(0, 0, this.canvas().width, this.canvas().height)
    }

    componentDidMount() {
        const canvas = this.canvas()
        const ctx = this.ctx()
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        ctx.strokeStyle = "#BADA55"
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.lineWidth = Number(this.state.lineWidth)
    }

    drawImage() {
        const canvas = this.canvas()
        const ctx = this.ctx()
        let drawing = this.state.drawing
        let image = new Image()
        image.src = drawing
        image.onload = function () {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            console.log('drawImage')
            console.log(drawing)
        }
    }

    onMouseMove(e) {
        const ctx = this.ctx()

        if(this.state.isDrawing) {
            ctx.strokeStyle = this.state.color
            ctx.beginPath()
            ctx.moveTo(this.state.lastX, this.state.lastY)
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            ctx.stroke()
            this.setState({
                lastX: e.nativeEvent.offsetX,
                lastY: e.nativeEvent.offsetY
            })
        }
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.type === "checkbox" ? target.checked : target.value
        const name = target.name

        this.setState({[name]: value})
        const ctx = this.ctx()
        ctx.lineWidth = this.state.lineWidth
    }

    onMouseDown(e) {
        this.setState({
            isDrawing: true,
            lastX: e.nativeEvent.offsetX,
            lastY: e.nativeEvent.offsetY
        })
    }

    onMouseUp() {
        let drawing = this.canvas().toDataURL()
        this.setState({
            isDrawing: false,
            drawing: drawing
        }, () => {
            this.send()
        })
    }

    onMouseOut() {
        let drawing = this.canvas().toDataURL()
        this.setState({
            isDrawing: false,
            drawing: drawing
        }, () => {
            this.send()
        })
    }

    handleData(result) {
        this.setState({
            drawing: result.data
        }, () => {
            this.drawImage()
        })
    }

    render () {
        return (
            <div>
                <SockJsClient 
                    url='http://localhost:8080/handler' 
                    topics={['/topic/drawings']} 
                    onMessage={this.handleData}
                    ref={ (client) => { this.clientRef = client }} />
                <canvas 
                    ref="canvas" 
                    onMouseMove={this.onMouseMove} 
                    onMouseDown={this.onMouseDown} 
                    onMouseUp={this.onMouseUp} 
                    onMouseOut={this.onMouseOut} />
            </div>
        )
    }

    send() {
        let dto = JSON.stringify({data: this.state.drawing})
        this.clientRef.sendMessage('/app/drawings', dto)
    }
}