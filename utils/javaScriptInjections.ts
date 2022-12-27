const javaScriptToSetCookie = `(function(){
    function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }`

export const javaScriptToSetIsOnAppInCookies = `
    ${javaScriptToSetCookie}
  setCookie('isOnApp', 'true', 1);})()`

export const javaScriptToSetAccessTokenInCookies = (access_token: string) => {
    return `${javaScriptToSetCookie}
      setCookie('access_token', '${access_token}', 1);})()`
}