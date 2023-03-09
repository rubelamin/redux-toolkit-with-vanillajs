const configureStore = require("@reduxjs/toolkit").configureStore;
const videoReducer = require("../features/videos/videosSlice");
const filterSlice = require("../features/videos/videoFilter");
const { createLogger } = require("redux-logger");

const logger = createLogger();

const store = configureStore({
  reducer: {
    video: videoReducer,
    filtervideo: filterSlice,
  },
  middleware: (getDefaultMiddleWares) => {
    return getDefaultMiddleWares().concat(logger);
  },
});

module.exports = store;
