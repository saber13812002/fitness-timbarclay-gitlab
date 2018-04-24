import {millisToNanos} from "../application/timeHelpers";
import {Set} from "../application/models/Set";
import {DataSource} from "../application/models/DataSource";
import {Session} from "../application/models/Session";

const initParams = {
  client_id: CLIENT_ID,
  scope: "profile email https://www.googleapis.com/auth/fitness.activity.read"
};

const signInOptions = {
  fetch_basic_profile: true,
  redirect_uri: "postmessage"
};

const exerciseSource = "com.google.activity.exercise";
const dataSourceId = "derived:com.google.activity.exercise:com.google.android.gms:merged";
const exerciseType = 80;

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

  signIn(onRequest, onSuccess, onFailure) {
    onRequest();
    const auth = window.gapi.auth2.getAuthInstance();
      this._onlineSignIn(auth, onSuccess, onFailure);
    }

  getDataSources() {
    return this._ensureFitness()
      .then(() => gapi.client.fitness.users.dataSources.list({
        userId: "me",
        dataTypeName: exerciseSource
      }))
      .then(res => res.result.dataSource)
      .then(sources => sources.map(s => new DataSource(s)));
  }

  getSessions(start, end) {
    return this._ensureFitness()
      .then(() => gapi.client.fitness.users.sessions.list({
          userId: "me",
          endTime: end.toISOString(),
          startTime: start.toISOString(),
          key: API_KEY,
          fields: "hasMoreData,nextPageToken,session",
          includeDeleted: false
        }))
      .then(res => res.result.session)
      .then(sessions => sessions.filter(s => s.activityType === exerciseType))
      .then(sessions => sessions.map(s => new Session(s)));
  }

  getDataSets(start, end) {
    const datasetId = `${millisToNanos(start.getTime())}-${millisToNanos(end.getTime())}`;

    return this._ensureFitness()
      .then(() => gapi.client.fitness.users.dataSources.datasets.get({
        userId: "me",
        dataSourceId: dataSourceId,
        fields: "dataSourceId,maxEndTimeNs,minStartTimeNs,nextPageToken,point",
        key: API_KEY,
        datasetId: datasetId
      }))
      .then(res => res.result.point)
      .then(sets => sets.map(p => new Set(p)));
  }

  _ensureFitness() {
    if(gapi.client.fitness) {
      return Promise.resolve();
    } else {
      return gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest"]
      });
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