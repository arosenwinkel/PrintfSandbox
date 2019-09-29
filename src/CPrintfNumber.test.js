import React from 'react';
import ReactDOM from 'react-dom';
import {InternalSizes} from './NumberChunk';
import {makeNumberChunk} from './Defaults';

it ('renders correct value to C printf ', () => {
    const chunk = makeNumberChunk(null, null, null, null);

    expect(chunk.renderCPrintf()).toEqual("%d");
});

it ('renders long long decimal to C printf ', () => {
    const chunk = makeNumberChunk(null, null, null, {"size": InternalSizes.longlong});
    expect(chunk.renderCPrintf()).toEqual("%lld");
});

it ('renders a 0 padded int', () => {
    const chunk = makeNumberChunk(null, null, null, {"width": 10, "padChar": "0"});
    expect(chunk.renderCPrintf()).toEqual("%010d");
})