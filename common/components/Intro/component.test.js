import test from 'ava';
import React from 'react';
import Intro from './index';
import {mount} from 'enzyme';

test('testing placeholder', t => {
  mount(<Intro/>);
  t.truthy(true, "I will always get passed!");
});
