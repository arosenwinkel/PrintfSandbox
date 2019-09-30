import React from 'react';
import ReactDOM from 'react-dom';
import {InternalSizes, ReprTypes, NumberTypes} from './NumberModifiers';
import {makeNumberChunk} from './Defaults';

it ('renders correct value to C printf ', () => {
    const chunk = makeNumberChunk("blah", null, ReprTypes.CppSStream, null);
    const expected = "<< blah";

    expect(chunk.toStr()).toEqual(expected);
});

it ('renders double', () => {
    const chunk = makeNumberChunk("blah", NumberTypes.FloatingPoint, ReprTypes.CppSStream, null);
    expect(chunk.toStr()).toEqual("<< blah");
});

it ('renders long long decimal', () => {
    const chunk = makeNumberChunk("blah", null, ReprTypes.CppSStream, {"size": InternalSizes.longlong});
    const expected = "<< blah";

    expect(chunk.toStr()).toEqual(expected);
});

it ('renders a 0 padded int', () => {
    const chunk = makeNumberChunk("blah", null, ReprTypes.CppSStream, {"width": 10, "padChar": "0"});
    const expected = "<< std::setw(10) << std::setfill('0') << blah";
    expect(chunk.toStr()).toEqual(expected);
});