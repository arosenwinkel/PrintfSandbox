import React from 'react';
import ReactDOM from 'react-dom';
import {NumberChunk} from './NumberChunk';
import {getNumberChunkProps, makeNumberChunk} from './Defaults';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = getNumberChunkProps(null, null, null, null);
  const element = React.createElement(NumberChunk, props, null);
  ReactDOM.render(element, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('identifies default as valid', () => {
  const chunk = makeNumberChunk(null, null, null, null);
  
  expect(chunk.isValid()).toEqual(true);
});