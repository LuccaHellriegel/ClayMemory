import * as constants from "./constants";
import * as selectors from "./selectors";
import * as components from "./components";
import * as model from "./model";
import slice from "./slice";

const { reducer, actions, name } = slice;

export default { constants, actions, reducer, name, selectors, components, model };
