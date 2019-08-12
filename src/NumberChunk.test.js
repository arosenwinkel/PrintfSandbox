import React from 'react';
import ReactDOM from 'react-dom';
import {NumberChunk, NumberTypes, DefaultSpecifiers, InternalSizes, ReprTypes} from './NumberChunk';

const DefaultNumberChunkProps = {
  number: NumberTypes.Integer,
  type: ReprTypes.CPrintf,
  specifiers: DefaultSpecifiers
};

const DefaultNumberChunk = new NumberChunk (DefaultNumberChunkProps);

it('renders without crashing', () => {
  const div = document.createElement('div');
  const element = React.createElement(NumberChunk, DefaultNumberChunkProps, null);
  ReactDOM.render(element, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('identifies default as valid', () => {
  const chunk = DefaultNumberChunk;
  
  expect(chunk.isValid()).toEqual(true);
});

it ('renders correct value to C printf ', () => {
  const chunk = DefaultNumberChunk;

  expect(chunk.render()).toEqual(<p>%d</p>);
});

it ('renders long long decimal to C printf ', () => {
  let props = JSON.parse(JSON.stringify(DefaultNumberChunkProps));
  props["specifiers"]["size"] = InternalSizes.longlong;

  const chunk = new NumberChunk (props);
  expect(chunk.render()).toEqual(<p>%lld</p>);
})