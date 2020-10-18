import * as constants from "./constants";
import * as components from "./components";
import slice from "./slice";
import * as selectors from "./selectors";
import * as model from "./model";
import * as services from "./services";

const { actions, reducer, name } = slice;

export default { constants, components, reducer, name, selectors, actions, model, services };
