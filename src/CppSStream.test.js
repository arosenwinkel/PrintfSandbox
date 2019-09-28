import React from 'react';
import ReactDOM from 'react-dom';
import {InternalSizes, ReprTypes} from './NumberChunk';
import {makeNumberChunk} from './Defaults';

it ('renders correct value to C printf ', () => {
    const chunk = makeNumberChunk(null, ReprTypes.CppSStream, null);

    expect(chunk.render()).toEqual(<p>blah</p>);
});

it ('renders long long decimal to C printf ', () => {
    const chunk = makeNumberChunk(null, ReprTypes.CppSStream, {"size": InternalSizes.longlong});

    expect(chunk.render()).toEqual(<p>blah</p>);
})