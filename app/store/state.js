// @flow
import type { Reducers } from './reducers';

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
export type ApplicationState = $ObjMap<Reducers, $ExtractFunctionReturn>;
