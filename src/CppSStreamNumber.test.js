import React from 'react';
import ReactDOM from 'react-dom';
import {InternalSizes, ReprTypes} from './NumberChunk';
import {makeNumberChunk} from './Defaults';

it ('renders correct value to C printf ', () => {
    const chunk = makeNumberChunk("blah", null, ReprTypes.CppSStream, null);
    const expected = "<< blah";

    expect(chunk.renderCppSStream()).toEqual(expected);
});

it ('renders long long decimal to C printf ', () => {
    const chunk = makeNumberChunk("blah", null, ReprTypes.CppSStream, {"size": InternalSizes.longlong});
    const expected = "<< blah";

    expect(chunk.renderCppSStream()).toEqual(expected);
});

it ('renders a 0 padded int', () => {
    const chunk = makeNumberChunk("blah", null, ReprTypes.CppSStream, {"width": 10, "padChar": "0"});
    const expected = "<< std::setw(10) << std::setfill('0') << blah";
    expect(chunk.renderCppSStream()).toEqual(expected);
});