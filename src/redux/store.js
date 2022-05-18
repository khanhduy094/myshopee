const { configureStore, getDefaultMiddleware } = require('@reduxjs/toolkit');

const { rootReducer } = require('./rootReducer');

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware:  [...getDefaultMiddleware({serializableCheck: false})]
});


export default store;