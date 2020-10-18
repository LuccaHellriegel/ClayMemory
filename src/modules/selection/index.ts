import * as actions from "./actions";
import slice from "./slice";
import * as selectors from "./selectors";
import * as components from "./components";
import * as services from "./services";

const { reducer, name } = slice;

export default { actions, name, components, reducer, selectors, services };
