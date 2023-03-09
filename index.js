const store = require("./app/store");

const { fetchVideos } = require("./features/videos/videosSlice");
const { fetchFilter } = require("./features/videos/videoFilter");

let fil;
const render = () => {
  setTimeout(() => {
    fil = store.getState().video.searchTxt;
  }, 500);
};

render();
store.subscribe(render);
store.dispatch(fetchVideos());

console.log(store.getState().video);

setTimeout(() => {
  store.dispatch(fetchFilter(fil));
}, 700);
