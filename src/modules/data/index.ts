import * as selectors from "./selectors";
import slice from "./slice";
import * as components from "./components";

const { reducer, name } = slice;

export default { name, reducer, selectors, components };
