An experiment to create a web app to read Google Fit exercise data and provide some visualisations and analytics.

Deployed to https://timbarclay.gitlab.io/fitness/

This app is an SPA using vue-router for front-end routing but Gitlab doesn't fully support that sort of thing, so we get around that using a little hack by copying index.html to 404.html during the CI build, so even if the route isn't found, it still loads the app. TODO Remove this when Gitlab fix this issue https://gitlab.com/gitlab-org/gitlab-pages/issues/57.