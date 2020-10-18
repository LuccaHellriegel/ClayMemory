import * as components from "./components";
import slice from "./slice";
import * as selectors from "./selectors";
import * as constants from "./constants";

const { reducer, actions, name } = slice;

export default { actions, components, name, reducer, selectors, constants };
