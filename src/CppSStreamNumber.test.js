import React from 'react';
import ReactDOM from 'react-dom';
import {InternalSizes, ReprTypes} from './NumberChunk';
import {makeNumberChunk} from './Defaults';

it ('renders correct value to C printf ', () => {
    const chunk = makeNumberChunk(null, ReprTypes.CppSStream, null);
    const expected = "<< blah;";

    expect(chunk.render()).toEqual(<p>{expected}</p>);
});

it ('renders long long decimal to C printf ', () => {
    const chunk = makeNumberChunk(null, ReprTypes.CppSStream, {"size": InternalSizes.longlong});
    const expected = "<< blah;";

    expect(chunk.render()).toEqual(<p>{expected}</p>);
})

it ('renders a 0 padded int', () => {
    const chunk = makeNumberChunk(null, ReprTypes.CppSStream, {"width": 10, "padChar": "0"});
    const expected = "<< std::setw(10) << std::setfill('0') << blah;";
    expect(chunk.render()).toEqual(<p>{expected}</p>);
})