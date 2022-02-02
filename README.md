## Features
---

- Based on Create React App [react-scripts v5](https://www.npmjs.com/package/react-scripts)
- [React v17](https://reactjs.org/)
- State management:
  - [react-redux](https://react-redux.js.org/)
  - redux
  - redux-logger
  - redux-thunk
- Linting: [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
- Webpack Hot Module Replacement (HMR) enabled
- Other important packages:
  - [@microsoft/signalr](https://www.npmjs.com/package/@microsoft/signalr): javascript client for .NET Core SignalR (WebSocket protocol)
  - [axios](https://www.npmjs.com/package/axios): HTTP client
  - [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware): configure proxy middleware for outgoing HTTP request and WebSocket communication
  - [sass](https://www.npmjs.com/package/sass): css pre processor
  - [react-app-rewired](https://www.npmjs.com/package/react-app-rewired): tweak the create-react-app webpack config(s) without using 'eject' and without creating a fork of the react-scripts.
  - [customize-cra](https://www.npmjs.com/package/customize-cra): react-app-rewired helper.
  - [react-dnd](https://www.npmjs.com/package/react-dnd): enable to build complex drag and drop interfaces
  - [react-intl](https://www.npmjs.com/package/react-intl): internationalization

## Quick Start
---

1. Make sure that you have Node.js v14 and npm v6 or above installed.
2. Navigate to project root directory.
3. Configure REST and WebSocket API ports in /src/setupProxy.js file.
4. Configure additional webpack config in /config-overrides.js file.
5. Execute `npm install` to install package dependencies.
6. Execute `npm start` to run the app in development mode.
7. Now you are ready to rumble!


## Available Scripts
---

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

**Use react-app-rewired instead**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run lint`

Execute linting for .jsx and .js files in src directory


## Learn More
---

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
