import React from 'react';
import ReactDOM from 'react-dom';
import {InternalSizes} from './NumberChunk';
import {makeNumberChunk} from './Defaults';

it ('renders correct value to C printf ', () => {
    const chunk = makeNumberChunk(null, null, null);

    expect(chunk.render()).toEqual(<p>%d</p>);
});

it ('renders long long decimal to C printf ', () => {
    const chunk = makeNumberChunk(null, null, {"size": InternalSizes.longlong});
    expect(chunk.render()).toEqual(<p>%lld</p>);
});