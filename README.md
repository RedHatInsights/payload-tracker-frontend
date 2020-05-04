Payload Tracker Frontend
===========================================


Overview
--------------------

The Frontend for the Payload Tracker is aimed to create a easy-to-use interface in which to access the data created and stored by the Payload Tracker Service. The Service exposes a REST API to which we can make calls.

We utilized `create-react-app` to package this React application. The main components are `Payload.js` and `Track.js` corresponding to the pages that are present in the application.


Architecture
--------------------

Payload Tracker Frontend lives in `platform-<env>`. We are using nginx to coordinate connections between the Payload Tracker Service and the frontend component views. These views are stored within the `build` directory of the nginx container.

The frontend itself manages state using a Redux store. We are using react-router to manage our routing using history and the store. Urls are managed using a custom middleware which can be found in the `middlewares` directory.


Routes
--------------------

The Payload Tracker Frontend can be accessed at the following routes.
```
<Route path='/' exact render={() => <Redirect to='/home/payloads'/>}/>
<Route path='/home/payloads' component={Payloads}/>
<Route exact path='/home/track' component={Track}/>
<Route path='/home/track/:payload_id' component={Track}/>

```


Basic Usage
--------------------

The frontend allows for developers to easily view and share payloads as they pass through the platform. The `/home/track:payload_id` allows for developers to understand where errors occur, what the errors are, and how quickly payloads are passing in between services and within individual services.


Docker
--------------------

This repo contains a Dockerfile and Dockerfile-dev. The Dockerfile creates the full nginx production build of the application, while Dockerfile-dev creates an image suitable for a dev environment. It does this by speeding up build time by removing the node_modules installation via yarn.


Prequisites
--------------------
    docker
    docker-compose



Socket Updates
--------------------

We are using the socket.io client to grab data as it changes within the service. This functionality is currently supported within the `/home/track/:payload_id` route, and will refresh as new payloads are picked up with the same payload_id as the one that is currently being viewed.


Dev Setup
--------------------
1. Install dependencies
```
yarn
```

2. Create build
```
yarn run build
```

3. Setup Payload Tracker Service https://github.com/RedHatInsights/payload-tracker#dev-setup
```
API_PORT=8081 pipenv run server
```

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
yarn run build
```

2. Restart Environment
```
docker build . -f Dockerfile-dev -t frontend:latest && docker run -p 8080:8080 frontend:latest
```

To more easily facilitate frontend dev, do the following:
1. Install Dependencies
```
yarn
```

2. Start Frontend
```
yarn start
```

3. Start Payload Tracker Service https://github.com/RedHatInsights/payload-tracker#dev-setup

4. Adjust `querybase` in `Payloads.js` and `Track.js` to point to `http://localhost:8080`

5. Install https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf to remove CORS errors

Changes will be applied as they are made using this strategy.


Contributing
--------------------
All outstanding issues or feature requests should be filed as Issues on this Github
page. PRs should be submitted against the master branch for any new features or changes.


Versioning
--------------------
Anytime an endpoint is modified, the versin should be incremented by `0.1`. New
functionality introduced that may effect the client should increment by `1`. Minor
features and bug fixes can increment by `0.0.1`
