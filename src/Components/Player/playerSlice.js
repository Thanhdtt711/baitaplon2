import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const init = {
  // isPlay: false,
  isOpenPlayer: false,
  playInfo: {
    isPlay: false, //Trạng thái phát nhạc
    info: {}, //Thông tin bài hát: tên bài, ca sĩ, file mp3
  },
  local: [],
};
const idlocal = localStorage.getItem("information");
const playerSlice = createSlice({
  name: "player",
  initialState: init,
  reducers: {
    doPlay: (state, action) => {
      //state.isPlay = action.payload;
      state.playInfo = action.payload;
    },

    doOpenPlayer: (state, action) => {
      state.isOpenPlayer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.local = action.payload;
    });
  },
});

export const playerlocal = (state) => state.player.local;
export const playerSelector = (state) => state.player.playInfo;

export const openPlayerSelector = (state) => state.player.isOpenPlayer;

export const { doPlay, doOpenPlayer } = playerSlice.actions;

export const fetchTodos = createAsyncThunk("player/fetchTodos", async () => {
  const response = await fetch("http://localhost:3004/songs/" + idlocal);
  const data = await response.json();
  return data;
});

export default playerSlice.reducer;
