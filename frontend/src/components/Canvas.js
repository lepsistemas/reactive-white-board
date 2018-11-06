import React from 'react'

export default class Canvas extends React.Component {

    constructor(props) {
        super(props)
        this.width = props.width
        this.height = props.height

        this.state = {
            isDrawing: false,
            lastX: 0,
            lastY: 0,
            color: "#000000",
            lineWidth: 5
        }
        this.clear = this.clear.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseOut = this.onMouseOut.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    canvas() {
        return this.refs.canvas
    }
    
    ctx() {
        return this.canvas().getContext('2d')
    }

    clear() {
        this.ctx().clearRect(0, 0, this.canvas().width, this.canvas().height)
    }

    componentDidMount() {
        const canvas = this.canvas()
        const ctx = this.ctx()
        if(this.props.fullscreen === true) {
            canvas.width = window.innerWidth - 8
            canvas.height = window.innerHeight - 32
        }
        ctx.strokeStyle = "#BADA55"
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.lineWidth = Number(this.state.lineWidth)
        this.setState({canvas: this.canvas()})
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
        this.ctx().lineWidth = this.state.lineWidth
    }

    onMouseDown(e) {
        this.setState({
            isDrawing: true,
            lastX: e.nativeEvent.offsetX,
            lastY: e.nativeEvent.offsetY
        })
    }

    onMouseUp() {
        this.setState({isDrawing: false})
        this.send()
    }

    onMouseOut() {
        this.setState({isDrawing: false})
        //this.send()
    }

    render () {
        const canvasStyle = {
            border: '1px solid black'
        }

        return (
            <div>
                <canvas 
                    ref="canvas"
                    width={this.props.width} 
                    height={this.props.height} 
                    onMouseMove={this.onMouseMove}
                    onMouseDown={this.onMouseDown} 
                    onMouseUp={this.onMouseUp} 
                    onMouseOut={this.onMouseOut} 
                    style={canvasStyle}/>
                <button onClick={this.clear}>Clear</button>
            </div>
        )
    }

    send() {
        console.log(this.canvas().toDataURL())
    }
}