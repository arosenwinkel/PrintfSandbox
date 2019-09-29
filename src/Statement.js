import React from 'react';

export class Statement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

    }
}

export class CPrintfStatement extends Statement {
    constructor(props) {
        super(props);
    }

    toArray() {
        let lines = [];

        let line = `sprintf(buff, "`;
        this.props.chunks.map((chunk) => {
            line += chunk.toStr();
        });

        line += '"';

        this.props.chunks.map((chunk) => {
            line += ", " + chunk.props.name;
        });

        line += ");"

        lines.push(line);
        return lines;
    }

    toStr() {
        return this.toArray().join(" ");
    }

    render() {
        let lines = this.toArray();
        lines.unshift("char buff[999];");

        return (
            <ul>
                {lines.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
        );
    }
}

export class CppSStreamStatement extends Statement {
    constructor(props) {
        super(props);
    }

    toArray() {
        let lines = [];
        this.props.chunks.map((chunk) => {
            const line = "stream " + chunk.toStr() + ";";
            lines.push(line);
        });

        return lines;
    }

    toStr() {
        return this.toArray().join(" ");
    }

    render() {
        let lines = this.toArray();
        lines.unshift("std::stringstream stream;");

        return (
            <ul>
                {lines.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
        );
    }
}