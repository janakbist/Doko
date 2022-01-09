import React, { Component } from 'react'
import * as io from 'socket.io-client';
import './message.component.css';
const SocketURL = process.env.REACT_APP_SOCKET_URL;

export class MessageComponent extends Component {
    constructor() {
        super()

        this.state = {
            messageBody: {
                senderName: '',
                senderId: '',
                receiverId: '',
                receiverName: '',
                time: '',
                message: ''
            },
            messages: []
        }
    }

    componentDidMount() {
        this.socket = io(SocketURL);
        this.runSocket();
    }

    runSocket() {
        this.socket.on('hi', (data) => {
            console.log('message from server >', data)
            this.socket.emit('hello', 'from client')
        })
        this.socket.on('reply-msg', (data) => {
            const { messages } = this.state;
            messages.push(data);
            this.setState({
                messages
            })
        })
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState(pre => ({
            messageBody: {
                ...pre.messageBody,
                [name]: value
            }
        }))
    }

    send = e => {
        e.preventDefault();
        const { messageBody } = this.state;
        // append data in message body
        this.socket.emit('new-message', messageBody);
    }

    render() {
        return (
            <>
                <h2>Let's Chat</h2>
                <div className="row">
                    <div className="col-md-6">
                        <ins>Messages</ins>
                        <div className="message_box">
                            {this.state.messages.map((item, index) => (
                                <div key={index}>
                                    <p>{item.message}</p>
                                    <p>{item.senderName}</p>
                                    <small>{item.time}</small>
                                </div>
                            ))}
                        </div>
                        <form className="form-group" onSubmit={this.send}>
                            <input type="text" className="form-control" onChange={this.handleChange} placeholder="Your Message here..." name="message"></input>
                            <button className="btn btn-success" type="submit">send</button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <ins>Users</ins>
                        <div className="message_box">

                        </div>

                    </div>
                </div>
            </>
        )
    }
}
