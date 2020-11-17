import slice from "./slice";
import * as selectors from "./selectors";
import { Tutorial } from "./StepSnackbar";

const { reducer, name, actions } = slice;

const components = { Tutorial };

export default { actions, name, reducer, selectors, components };
