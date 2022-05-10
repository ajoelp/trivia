export class LoginRedirect {
  static LOGIN_KEY = "@trivia/login-redirect";

  static set(pathname: string) {
    window.localStorage.setItem(LoginRedirect.LOGIN_KEY, pathname);
  }

  static get() {
    return window.localStorage.getItem(LoginRedirect.LOGIN_KEY);
  }

  static clear() {
    return window.localStorage.removeItem(LoginRedirect.LOGIN_KEY);
  }
}
