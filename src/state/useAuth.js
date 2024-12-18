// useAuth.js
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from '../store/slices/authSlice';

function useAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (userInfo) => {
    try {
      // 카카오 로그인만 허용
      if (userInfo.kakaoId) {
        const userData = {
          id: userInfo.kakaoId,
          email: userInfo.email,
          nickname: userInfo.nickname,
          type: 'kakao'
        };

        // 닉네임을 로컬스토리지에 저장하여 헤더에서 사용
        localStorage.setItem('savedNickname', userInfo.nickname);

        dispatch(loginUser(userData));
        console.log('카카오 로그인 성공:', userData);
        return true;
      } else {
        throw new Error('카카오 로그인만 가능합니다.');
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    loading,
    error,
    handleLogin,
    handleLogout,
  };
}

export default useAuth;