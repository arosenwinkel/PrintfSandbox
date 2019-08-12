import React from 'react';

class Chunk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    renderCPrintf() {
        return <p>Rendered C-style Printf</p>
    }

    renderCppStream() {
        return <p>Rendered CPP-style Stream</p>
    }

    render() {
        return <p>"Hello, world!</p>
    }
}

export default Chunk;
