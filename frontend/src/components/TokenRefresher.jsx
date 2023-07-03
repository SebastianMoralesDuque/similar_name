import { refreshTokenFunc } from '../api/auth';

const TokenRefresher = async (refreshToken, setAccessToken, handleLogout) => {
  try {
    const response = await refreshTokenFunc(refreshToken);
    const data = response;
    const newAccessToken = data.access;
    setAccessToken(newAccessToken);
    localStorage.setItem('accessTokenExpiration', decodeAccessToken(newAccessToken).exp * 1000);
  } catch (error) {
    console.error('Error al renovar el token de acceso:', error.message);
    handleLogout();
  }
};

const decodeAccessToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

export default TokenRefresher;
