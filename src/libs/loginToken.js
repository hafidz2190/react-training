const getLoginToken = () => window.localStorage.getItem('_rt_tkn_');

export const saveLoginToken = (username) => {
  window.localStorage.setItem('_rt_tkn_', username);
};

export const removeLoginToken = () => {
  window.localStorage.removeItem('_rt_tkn_');
};

export const isLoginTokenValid = () => {
  const loginToken = getLoginToken();

  if (!loginToken) {
    return null;
  }

  return loginToken;
};
