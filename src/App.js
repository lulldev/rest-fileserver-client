import React, {Component} from 'react';

var config = require('json!../server.json');

function getRemoteAddr (path = '') {
    return 'http://' + config.serverConfig.server_host + ':' + config.serverConfig.server_port + '/' + path;
}

export default class App extends Component {

    constructor () {
        super();
        this.state = {
            directoryContent: []
        };

    }

    loadRemoteDirectory (event) {
        const request: XMLHttpRequest = new XMLHttpRequest();
        request.onreadystatechange = (): void => {
            if (request.status === 200 && request.responseText.length > 0) {
                try {
                    const response = JSON.parse(request.responseText);
                    this.setState({directoryContent: response.directory_content});
                }
                catch (e) {
                    alert('Invalid accept JSON data from server!');
                }
            }
        };
        request.open('GET', getRemoteAddr());
        request.send();
    }

    render () {
        return (
            <div className='container'>
                <div className='col-lg-6 col-lg-offset-3'>
                    <h1>Simple REST-fileserver client</h1>
                    <button className='btn btn-success' onClick={this.loadRemoteDirectory.bind(this)}>Load remote directory</button><br/><br/>
                    <FileContentList directoryContent={this.state.directoryContent} />
                </div>
            </div>
        )
    }
}

class FileContentList extends Component {

    deleteFile (event) {
        const fileName = event.target.getAttribute('data-file-name');
        if (fileName !== '.' && fileName !== '..') {
            let request: XMLHttpRequest = new XMLHttpRequest();

            request.onreadystatechange = (): void => {
                if (request.status === 200 && request.responseText.length > 0) {
                    try {
                        //const response = JSON.parse(request.responseText);
                        //this.setState({directoryContent: response.directory_content});
                    }
                    catch (e) {
                        alert('Invalid accept JSON data from server!');
                    }
                }
            };
            request.open('DELETE', getRemoteAddr(fileName));
            request.send();
        }
    }

    render () {
        const remoteDirContent = this.props.directoryContent;
        if (!!remoteDirContent && remoteDirContent.length > 0) {
            const fileItems = remoteDirContent.map((fileName) =>
                <li className='list-group-item'>
                    <span className='badge' data-file-name={fileName} onClick={this.deleteFile.bind(this)}>delete</span> {fileName}
                </li>
            );
            return (
                <div class='row'>
                    {fileItems}
                </div>
            );
        }
        return (
            <div className='help-text'>Directory is empty!</div>
        );
    }
}
