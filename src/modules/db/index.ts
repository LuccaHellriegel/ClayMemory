import * as model from "./model";
import * as selectors from "./selectors";
import slice from "./slice";

const { actions, reducer, name } = slice;

export default { actions, name, reducer, selectors, model };
