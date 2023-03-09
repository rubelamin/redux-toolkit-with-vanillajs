const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
  loading: false,
  error: "",
  videos: [],
  searchTxt: "",
};

let getParamTxt;

const fetchVideos = createAsyncThunk("video/fetchVideos", async () => {
  const response = await fetch("http://localhost:9000/videos");
  const video = await response.json();

  return video;
});

const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.videos = action.payload;

      if (action.payload.tags.length > 0) {
        let params = new URLSearchParams();
        action.payload.tags.map((s) => params.append("tags_like", s));
        getParamTxt = params.toString();
        state.searchTxt = getParamTxt;
      }
    });

    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.videos = [];
    });
  },
});

module.exports = videoSlice.reducer;
module.exports.fetchVideos = fetchVideos;
