const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

const initialState = {
  loading: false,
  error: "",
  filteredVideos: [],
};

const fetchFilter = createAsyncThunk("video/filterVideos", async (fil) => {
  const response = await fetch(`http://localhost:9000/videos?${fil}`);
  const video = await response.json();

  return video;
});

const filterSlice = createSlice({
  name: "filtervideo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchFilter.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchFilter.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      // console.log(action.payload.sort((a, b) => b.views > a.views));
      state.filteredVideos = action.payload.sort((a, b) => {
        let aV = parseInt(a.views);
        let bV = parseInt(b.views);
        return bV - aV;
      });
    });

    builder.addCase(fetchFilter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.filteredVideos = [];
    });
  },
});

module.exports = filterSlice.reducer;
module.exports.fetchFilter = fetchFilter;
