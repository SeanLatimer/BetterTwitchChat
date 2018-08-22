// @flow
import { createReducer } from 'reduxsauce';
import * as constants from './constants';
import type { exampleActionType } from './actions';

type State = {
  text: string,
};

// the initial state of this reducer
export const INITIAL_STATE: State = { text: '234' };

// the eagle has landed
export const example = (
  state: State = INITIAL_STATE,
  action: exampleActionType
) => ({
  ...state,
  text: action.payload,
});

// map our action types to our reducer functions
export const HANDLERS = {
  [constants.EXAMPLE]: example,
};

export default createReducer(INITIAL_STATE, HANDLERS);
