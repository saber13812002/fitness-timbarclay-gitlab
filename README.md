A progressive web app that reads Google Fit exercise data and provide analyses, summaries and visualisations.

Live app at https://superset-app.com

This app is an SPA using vue-router for front-end routing but Gitlab doesn't fully support that sort of thing, so we get around that using a little hack by copying index.html to 404.html during the CI build, so even if the route isn't found, it still loads the app. TODO Remove this when Gitlab fix this issue https://gitlab.com/gitlab-org/gitlab-pages/issues/57.