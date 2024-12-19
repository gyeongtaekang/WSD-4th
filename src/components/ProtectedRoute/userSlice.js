// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  nickname: '',
  profileImage: '', // 프로필 이미지 URL 추가
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.profileImage = action.payload.profileImage; // 프로필 이미지 설정
    },
    clearUserData(state) {
      state.id = null;
      state.nickname = '';
      state.profileImage = '';
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;