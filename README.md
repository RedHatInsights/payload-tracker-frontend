- [Payload Tracker Frontend](#payload-tracker-frontend)
  - [Overview](#overview)
  - [Architecture](#architecture)
  - [Routes](#routes)
  - [Basic Usage](#basic-usage)
  - [Docker](#docker)
  - [Prequisites](#prequisites)
  - [Dev Setup](#dev-setup)
  - [Dev Setup using Docker](#dev-setup-using-docker)
  - [Dev Testing](#dev-testing)
  - [Contributing](#contributing)
  - [Versioning](#versioning)

Payload Tracker Frontend
===========================================


Overview
--------------------

The Frontend for the Payload Tracker is aimed to create a easy-to-use interface in which to access the data created and stored by the Payload Tracker Service. The Service exposes a REST API to which we can make calls.

This application uses webpack for distribution, and is based on the `patternfly-react-seed` repository. The main components are found in the `track`, `payloads`, and `statuses` directories. These components return full page views which are navigable via `react-router`.


Architecture
--------------------

Payload Tracker Frontend lives in `platform-<env>`. We are using nginx to coordinate connections between the Payload Tracker Service and the frontend component views. These views are stored within the `build` directory of the nginx container.

The frontend itself manages state using a Redux store. We are using react-router to manage our routing using history and the store. Urls are managed using a custom middleware which can be found in the `middlewares` directory.


Routes
--------------------

The Payload Tracker Frontend can be accessed at the following routes.
```
<Route path='/' exact render={() => <Redirect to='/payloads'/>}/>
<Route path='/payloads' component={Payloads}/>
<Route exact path='/track' component={Track}/>
<Route path='/track/:request_id' component={Track}/>

```


Basic Usage
--------------------

The frontend allows for developers to easily view and share payloads as they pass through the platform. The `/track:request_id` allows for developers to understand where errors occur, what the errors are, and how quickly payloads are passing in between services and within individual services.


Docker
--------------------

This repo contains a Dockerfile and Dockerfile-dev. The Dockerfile creates the full nginx production build of the application, while Dockerfile-dev creates an image suitable for a dev environment. It does this by speeding up build time by using the locally built version of the `dist` directory.


Prequisites
--------------------
    docker
    docker-compose


Dev Setup
--------------------
1. Install dependencies
```
npm i
```

2. Setup Payload Tracker Service <https://github.com/RedHatInsights/payload-tracker-go#development>

3. Start Frontend
```
npm run start
```

Your frontend is running on [http://localhost:3000/app/payload-tracker/](http://localhost:3000/app/payload-tracker/).

**Note:** This will yield CORS errors. Consider installing <https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf> to remove these errors.

Dev Setup using Docker
--------------------
1. Install dependencies
```
npm i
```

2. Create build
```
npm run build
```

3. Setup Payload Tracker Service <https://github.com/RedHatInsights/payload-tracker-go#development>

4. Build Frontend
```
docker build . -f Dockerfile-dev -t frontend:latest
```

**Note:** If you are using Docker for Mac pass the argument `--build-arg SERVICE_HOST=docker.for.mac.localhost` to `docker build`. `SERVICE_HOST` can be set to any value as to match the correct location of the Payload Tracker Service.

5. Stand up Frontend
```
docker run -p 8080:8080 frontend:latest
```

**Note:** There is a draw back to using this method to do frontend development, which is inherent in the use of nginx to provide files from the `build` directory. In order to apply changes occuring in the frontend, we need to do the following:

1. Rebuild frontend
```
npm run build
```

2. Restart Environment
```
docker build . -f Dockerfile-dev -t frontend:latest && docker run -p 8080:8080 frontend:latest
```

Dev Testing
--------------------
With the Payload Tracker Service and frontend running locally, most of the frontend's features are available. Populate the DB using the Payload Tracker Service make commands <http://github.com/RedHatInsights/payload-tracker-go#development>.

### Archive Download

Using Ingress, you can download a payload archive from this app. To test functionality locally:

1. Make a Jenkins build of the Payload Tracker Service, or use one created with a recent PR Build.

2. Login to ephemeral with the OpenShift Client. Login token can be found on the ephemeral OpenShift website.

3. Deploy an ephemeral environment with [Bonfire](https://github.com/RedHatInsights/bonfire).
```#!/bin/bash
# Fill in the desired commit and PR references.
bonfire deploy payload-tracker --source=appsre --ref-env insights-stage --set-template-ref payload-tracker-go={commit-ref} --set-image-tag quay.io/cloudservices/payload-tracker-go={pr-ref} --timeout 900 --optional-deps-method hybrid --single-replicas -d 2h
```

4. Switch to your ephemeral environment.
```#!/bin/bash
oc project {namespace}
```

5. Port forward the minio, ingress, and payload-tracker-api pods.
```#!/bin/bash
oc port-forward {minio-pod} 9000:9000 # ephemeral to local 9000
oc port-forward {ingress-pod} 8000:8000 # ephemeral to local 8000
oc port-forward {payload-tracker-api-pod} 8080:8000 # ephemeral 8000 to local 8080
```

6. Start Payload Tracker frontend locally as in [Dev Setup](#dev-setup).

7. Download this [sample archive](https://github.com/RedHatInsights/insights-puptoo/tree/master/dev/test-archives) into your working directory.

8. Curl the sample archive to the ingress pod. The ```x-rh-identity``` header requires access to archive downloads with the associate role ```platform-archive-download```. The header provided below has this role.
```#!/bin/bash
curl -F "file=@core-base.tar.gz;type=application/vnd.redhat.advisor.somefile+tgz" -H "x-rh-identity: eyJpZGVudGl0eSI6eyJhc3NvY2lhdGUiOnsiUm9sZSI6WyJwbGF0Zm9ybS1hcmNoaXZlLWRvd25sb2FkIl19LCJhdXRoX3R5cGUiOiJzYW1sLWF1dGgiLCJ0eXBlIjoiQXNzb2NpYXRlIn19" -H "x-rh-insights-request-id: 25a5f716d2f211ec9d640242ac120002" http://localhost:8000/api/ingress/v1/upload
```

9. Next, add an extension to your browser to modify the request header. The [ModHeader extension](https://modheader.com/) is easy-to-use. Then, use that extension to append the ```x-rh-identity```.

10. Navigate to the ```Payloads``` page on <http://localhost:3000/app/payload-tracker/payloads>, and click the request_id. Finally, download the uploaded archive!


Contributing
--------------------
All outstanding issues or feature requests should be filed as Issues on this Github
page. PRs should be submitted against the master branch for any new features or changes.


Versioning
--------------------
Anytime an endpoint is modified, the version should be incremented by `0.1`. New
functionality introduced that may effect the client should increment by `1`. Minor
features and bug fixes can increment by `0.0.1`
