import React, {Component} from 'react';

export default class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            directory_content: []
        };

        this.getDirectoryContent = this.getDirectoryContent.bind(this);
        this.getDirectoryContent();
    }

    getDirectoryContent () {
        fetch('http://localhost:4445', {
            method: 'get'
        }).then(function(response) {
            return response.json();
        }).then(function(response) {
            console.log(response);
            this.setState({ directory_content: response });
        });
    }

    render () {
        return (
            <div>test</div>
        );
    }
}

