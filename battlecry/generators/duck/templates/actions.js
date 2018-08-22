// @flow
import * as constants from './constants';

type Action<T> = {
  type: string,
  payload: T,
};

type exampleActionPayload = string;
export type exampleActionType = Action<exampleActionPayload>;

function exampleAction(text: exampleActionPayload): exampleActionType {
  return {
    type: constants.ExampleAction,
    payload: text,
  };
}

// new creators here

export default {
  exampleAction,
};
