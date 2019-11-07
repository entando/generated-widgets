# Table Widget

## API

### Attributes

- **locale** (default: `en`)

### Environment variables

There are several environment variables used in the widget that provide initial configuration of the widget. To set that up, create `.env` file in the root folder following constants:

- REACT_APP_DOMAIN - API endpoint for data (e.g., http://localhost:8081/services/jhipster/api)
- REACT_APP_JWT_TOKEN - JWT secret token, mainly used for local development

### Custom Events

- **_[entityName]_.table.error** (fired when an error occurs)
- **_[entityName]_.table.select** (fired when a table row is selected)

## i18n

To add a new locale:

- add _[newLocaleName]_ under `options.lng` in `i18next-scanner-config.js` script
- run `npm run i18n` from the terminal to add a new empty language file under `src/i18n/locales/[newLocaleName].json`
- edit `src/i18n/locales.js`
  - import the newly generated JSON file (use the en language import as a reference)
  - export it alongside the other languages

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint`

Runs Eslint to the root folder and fix all the issues that can be handled automatically.

### `npm run i18n`

Maintain language files: if there's a new locale, a new language files will be added (see **i18n** section above); if there are new untraslated strings, they will be added to language files.

## Linter

This project is extending the [Airbnb Style Guide](https://github.com/airbnb/javascript) eslint rules, and applying custom rules (see package.json) to improve code quality.

## Folder structure

- ./src
  - ./assets `--> place to store assets like images, fonts, custom icons, etc.`
  - ./api `--> api calls, grouped by feature: the structure should mimic the api call itself`
  - ./components
    - ./\_\_tests\_\_ `sample test folder`
      - App.test.js `--> this way test files are closer to other ones, but in a separate folder in order to keep the folder structure cleaner`
    - ./common `--> folder containing common components`
      - CommonComponent.js
    - ./App `--> example of component that could have container`
      - App.css
      - App.js `--> keep the same name as component folder so we can find it easily when doing a file search`
      - AppContainer.js `--> container for the App component, adds state`
- ./custom-elements `--> custom element wrapper of the whole application`
  - ./state `--> application state (e.g. redux), if any`
    - ./sample-feature `--> grouping by feature`
      - sample-feature.actions.js
      - sample-feature.reducer.js
      - sample-feature.selectors.js
      - sample-feature.types.js
    - store.js `--> configure redux store`
  - index.js `--> entry point`

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
