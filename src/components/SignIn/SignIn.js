// SignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../state/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';
import TermsModal from './TermsModal.js';

function SignIn() {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // 이용약관 동의 처리
  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowTerms(true);
  };

  const handleTermsAgree = () => {
    setAcceptTerms(true);
    setShowTerms(false);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const kakaoKey = process.env.REACT_APP_KAKAO_KEY;
        if (kakaoKey) {
          window.Kakao.init(kakaoKey); // 환경 변수만 사용
          console.log('Kakao SDK initialized with environment variable.');
        } else {
          console.error('REACT_APP_KAKAO_KEY is not defined in .env file.');
        }
      }
    };
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function(authObj) {
        console.log(authObj);
        // Kakao API를 사용하여 사용자 정보를 가져옵니다.
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: async function(response) {
            console.log('카카오 사용자 정보:', response);
            try {
              const kakaoEmail = response.kakao_account?.email || 'no-email@example.com';
              const kakaoNickname = response.properties?.nickname || '카카오사용자';
              const kakaoId = response.id;

              await handleLogin({
                kakaoId: kakaoId,
                email: kakaoEmail,
                nickname: kakaoNickname
              });
              toast.success('카카오 로그인 성공!');
              console.log('Navigating to home...');
              // navigate 호출 지연
              setTimeout(() => {
                navigate('/');
              }, 100);
            } catch (error) {
              toast.error('카카오 로그인에 실패했습니다.');
            }
          },
          fail: function(error) {
            console.error('Kakao API request failed:', error);
            toast.error('카카오 로그인에 실패했습니다.');
          }
        });
      },
      fail: function(err) {
        console.error('Kakao Auth login failed:', err);
        toast.error('카카오 로그인에 실패했습니다.');
      }
    });
  };

  return (
    <div>
      <div className="bg-image"></div>
      <div className="container">
        <div id="phone" className="login-active">
          <div id="content-wrapper">
            <div className="card" id="login">
              <div className="text-center mb-2"> 
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  카카오 로그인
                </h2>
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-gray-500 text-sm">회원가입 없이 카카오 로그인으로 이용해주세요.</span>
                </div>
              </div>

              <div className="w-full max-w-md mx-auto p-8 space-y-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 
                             focus:ring-indigo-500 transition-colors duration-200"
                  />
                  <label 
                    htmlFor="terms" 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                    onClick={handleTermsClick}
                  >
                    <b className="text-indigo-600">이용 약관</b>에 동의합니다
                  </label>
                </div>

                <button 
                  type="button" 
                  onClick={handleKakaoLogin}
                  className="w-full bg-yellow-400 text-black py-3 rounded-lg font-medium 
                             hover:bg-yellow-500 
                             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
                             transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                             shadow-lg hover:shadow-xl"
                  disabled={loading}
                >
                  카카오 로그인
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TermsModal 
        show={showTerms}
        onHide={() => {
          setShowTerms(false);
          setAcceptTerms(false); 
        }}
        onAgree={() => {
          setShowTerms(false);
          setAcceptTerms(true); 
        }}
      />
      <ToastContainer />
    </div>
  );
}

export default SignIn;
