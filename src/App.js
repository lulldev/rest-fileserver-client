import React, {Component} from 'react';
import Fetch from 'react-fetch';

var config = require('json!../server.json');

function getRemoteAddr(path = "") {
    return "http://" + config.serverConfig.server_host + ":" + config.serverConfig.server_port + "/" + path;
}

export default class App extends Component {

    constructor () {
        super();
        this.state = {
            remoteAddr: getRemoteAddr("") // root dir
        }
    }

    render() {
        return (
            <div className="container">
                <div className="col-lg-6 col-lg-offset-3">
                    <Fetch url={this.state.remoteAddr}>
                        <h1>Simple REST-fileserver client</h1>
                        <FileContentList/>
                    </Fetch>
                </div>
            </div>
        )
    }
}

class FileContentList extends Component {

    deleteFile(event) {
        const fileName = event.target.getAttribute('data-file-name');
        if (fileName !== "." && fileName !== "..") {
            const remoteAddr = getRemoteAddr();
            fetch(remoteAddr + fileName, {
                'method': 'DELETE',
                'body': '',
                'headers': {
                    'Access-Control-Allow-Origin': 'delete'
                },
                'mode': 'cors'
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log(response);
            });
        }
    }

    render() {
        let remoteDirContent = this.props.directory_content;
        if (!!remoteDirContent && remoteDirContent.length > 0) {
            const fileItems = remoteDirContent.map((fileName) =>
                <li className="list-group-item">
                    <span className="badge" data-file-name={fileName} onClick={this.deleteFile.bind(this)}>delete</span>
                    {fileName}
                </li>
            );
            return (
                <div>{fileItems}</div>
            );
        }
        return (
            <div className="help-text">Directory is empty!</div>
        );
    }
}
