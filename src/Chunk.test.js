import React from 'react';
import ReactDOM from 'react-dom';
import Chunk from './Chunk';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chunk />, div);
  ReactDOM.unmountComponentAtNode(div);
});
