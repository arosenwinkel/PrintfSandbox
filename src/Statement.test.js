import React from 'react';
import ReactDOM from 'react-dom';
import {CPrintfStatement, CppSStreamStatement} from './Statement';
import {getNumberChunkProps, makeNumberChunk} from './Defaults';
import { ReprTypes } from './NumberChunk';

it('renders CPrintfStatement without crashing', () => {
    const div = document.createElement('div');
    const props = {"chunks": []};
    const element = React.createElement(CPrintfStatement, props, null);
    ReactDOM.render(element, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders CPrintfStatement without crashing', () => {
    const div = document.createElement('div');
    const props = {"chunks": []};
    const element = React.createElement(CPrintfStatement, props, null);
    ReactDOM.render(element, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders multiple CPrintfStatements', () => {
    const chunk1 = makeNumberChunk("arg1", null, null, null);
    const chunk2 = makeNumberChunk("arg2", null, null, null);

    const statement = new CPrintfStatement({"chunks": [chunk1, chunk2]});
    const expected_result = `sprintf(buff, "%d%d", arg1, arg2);`;
    expect(statement.toStr()).toEqual(expected_result);
});

it('renders multiple CppSStreamStatements', () => {
    const chunk1 = makeNumberChunk("arg1", null, ReprTypes.CppSStream, null);
    const chunk2 = makeNumberChunk("arg2", null, ReprTypes.CppSStream, null);

    const statement = new CppSStreamStatement({"chunks": [chunk1, chunk2]});
    const expected_result = `stream << arg1; stream << arg2;`;
    expect(statement.toStr()).toEqual(expected_result);
});

it('simplifies consecutive uses of stream modifiers for CppSStreamStatements', () => {
    const chunks = [
        makeNumberChunk("arg1", null, ReprTypes.CppSStream, null),
        makeNumberChunk("arg2", null, ReprTypes.CppSStream, {width: 10}),
        makeNumberChunk("arg3", null, ReprTypes.CppSStream, {width: 10}),
        makeNumberChunk("arg4", null, ReprTypes.CppSStream, {width: 11}),
        makeNumberChunk("arg5", null, ReprTypes.CppSStream, null)
    ];

    const statement = new CppSStreamStatement({"chunks": chunks});
    const expected_result = `stream << arg1; stream << std::setw(10) << arg2; stream << arg3; stream << std::setw(11) << arg4; stream << std::setw(0) << arg5;`;
    expect(statement.toStr()).toEqual(expected_result);
});