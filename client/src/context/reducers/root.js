import userReducer from "./userReducer";
import templatesReducer from "./templatesReducer";
import errorsReducer from "./errorReducer";

const combineReducers = reducers => {
  return (state = {}, action) => {
    const keys = Object.keys(reducers);
    const nextReducers = {};
    for (const key of keys) {
      const invoke = reducers[key](state[key], action);
      nextReducers[key] = invoke;
    }
    return nextReducers;
  };
};

const rootReducer = combineReducers({
  account: userReducer,
  templates: templatesReducer,
  errors: errorsReducer
});

export default rootReducer;
