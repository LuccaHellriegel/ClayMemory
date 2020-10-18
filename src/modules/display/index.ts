import * as components from "./components";
import slice from "./slice";
import * as selectors from "./selectors";

const { reducer, actions, name } = slice;

export default { actions, components, name, reducer, selectors };
