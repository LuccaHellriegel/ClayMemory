import { downloadDBData, refreshDB } from "./actions";
import * as selectors from "./selectors";
import slice from "./slice";
import * as components from "./components";

const { reducer, actions, name } = slice;

export default { actions: { ...actions, downloadDBData, refreshDB }, name, reducer, selectors, components };
