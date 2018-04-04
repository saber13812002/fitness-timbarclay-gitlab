import config from "../../config";

const initParams = {
  client_id: config.google.CLIENT_ID,
  scope: "profile email https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.activity.write https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.blood_glucose.write https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.blood_pressure.write https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.body_temperature.write https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.location.write https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.nutrition.write https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.oxygen_saturation.write https://www.googleapis.com/auth/fitness.reproductive_health.read https://www.googleapis.com/auth/fitness.reproductive_health.write"
};

const signInOptions = {
  fetch_basic_profile: true,
  redirect_uri: "postmessage"
};

export default class GoogleApi {
  static initialiseGoogleApi() {
    return new Promise(resolve =>
      this._doScriptGubbins(() => {
        window.gapi.load("auth2", () => {
          window.gapi.auth2.init(initParams)
            .then(() => resolve())
        })
    }));
  }

  getGoogleToken() {
    return this._getAuthInstance()
      .then(auth => {
        if(!auth.isSignedIn.get()){
          throw "Not signed in";
        }

        const user = auth.currentUser.get();
        const tokenObj = user.getAuthResponse();

        if(new Date().getTime() > tokenObj.expires_at){
          return user.reloadAuthResponse(response =>  response.access_token);
        }
        
        return tokenObj.access_token;
      });
  }

  getUser() {
    return this._getAuthInstance()
      .then(auth => {
        if(!auth.isSignedIn.get()){
          throw "Not signed in";
        }

        const user = auth.currentUser.get();
        const tokenObj = user.getAuthResponse();

        if(new Date().getTime() > tokenObj.expires_at){
          return user.reloadAuthResponse(response =>  response.access_token);
        }
        
        return {
          user: user.profileObj,
          auth: tokenObj
        };
      });
  }

  signIn(offline, onRequest, onSuccess, onFailure) {
    onRequest();
    const auth = window.gapi.auth2.getAuthInstance();
    if(!offline) {
      this._onlineSignIn(auth, onSuccess, onFailure);
    } else {
      this._grantOfflineAccess(auth, onSuccess, onFailure);
    }
  }

  _getAuthInstance() {
    return new Promise(resolve => {
      const auth2 = window.gapi.auth2;
      const instance = auth2.getAuthInstance();
      if(instance){
        resolve(instance);
      } else {
        auth2.init(initParams)
          .then(() => resolve(auth2.getAuthInstance()));
      }
    });
  }

  _onlineSignIn(authInstance, onSuccess, onFailure) {
    authInstance.signIn(signInOptions)
      .then(res => {
        const basicProfile = res.getBasicProfile();
        const authResponse = res.getAuthResponse();
        res.googleId = basicProfile.getId();
        res.tokenObj = authResponse;
        res.tokenId = authResponse.id_token;
        res.accessToken = authResponse.access_token;
        res.profileObj = {
          googleId: basicProfile.getId(),
          imageUrl: basicProfile.getImageUrl(),
          email: basicProfile.getEmail(),
          name: basicProfile.getName(),
          givenName: basicProfile.getGivenName(),
          familyName: basicProfile.getFamilyName(),
        };
        onSuccess();
      }, err => {
        onFailure(err)
      });
  }

  _grantOfflineAccess(authInstance, onSuccess, onFailure) {
    authInstance.grantOfflineAccess(signInOptions)
      .then(
        res => onSuccess(),
        err => onFailure(err));
  }

  static _doScriptGubbins(callback) {
    const scriptTag = "script";
    const id = "google-login";
    const element = document.getElementsByTagName(scriptTag)[0];
    const fjs = element;
    let js = element;
    js = document.createElement(scriptTag);
    js.id = id;
    js.src = '//apis.google.com/js/client:platform.js';
    fjs.parentNode.insertBefore(js, fjs);
    js.onload = callback;
  }
}