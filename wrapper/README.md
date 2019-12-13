# Widget wrapper

## Running locally

Refer to widgets' README files for setting up each widget.

To test out the flow:

1. Setup Keycloak by visiting http://localhost:9080/auth/ (administrator login `admin/admin`)
1. Add additional ports `http://localhost:5001/*`, `http://localhost:5002/*`, `http://localhost:5002/*`, `http://localhost:5003/*` to `jhipster-entando-react-client` client.
1. Add new client with

   - name - `jhipster-entando-wrapper-client`
   - client protocol - `openid-connect`
   - root URL - `http://localhost:5000/`
   - valid redirect URIs - `http://localhost:5000/*`

1. Make sure you are in `<REPO_DIR>/wrapper`, run `npm i`
1. In one tab run `npm run serve-widgets`, it will build all the widgets and serve them in ports 5001, 5002, 5003.
1. In second tab run `npm start`, it will run the wrapper app at http://localhost:5000
