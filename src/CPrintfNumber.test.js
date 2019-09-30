import React from 'react';
import ReactDOM from 'react-dom';
import {InternalSizes, NumberTypes} from './NumberModifiers';
import {makeNumberChunk} from './Defaults';

it ('renders correct value to C printf ', () => {
    const chunk = makeNumberChunk(null, null, null, null);

    expect(chunk.toStr()).toEqual("%d");
});

it ('renders double to C printf', () => {
    const chunk = makeNumberChunk(null, NumberTypes.FloatingPoint, null, null);
    expect(chunk.toStr()).toEqual("%f");
});

it ('renders long long int to C printf ', () => {
    const chunk = makeNumberChunk(null, null, null, {"size": InternalSizes.longlong});
    expect(chunk.toStr()).toEqual("%lld");
});

it ('renders a 0 padded int', () => {
    const chunk = makeNumberChunk(null, null, null, {"width": 10, "padChar": "0"});
    expect(chunk.toStr()).toEqual("%010d");
})