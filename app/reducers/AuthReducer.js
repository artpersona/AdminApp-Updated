export default (prevState, action) => {
    switch (action.type) {
      case 'AUTHENTICATE':
        return {
          ...prevState,
          isAuthenticated: true,
          token: action.token,
        };
      case 'UNAUTHENTICATE':
        return {
          ...prevState,
          isAuthenticated: false,
          token: null,
        };
    }
  }