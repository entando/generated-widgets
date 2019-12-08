pushd ../react/details

if [ ! -e ".env" ]; then
  echo "Adding .env file"
  echo "REACT_APP_DOMAIN=http://localhost:8081/services/jhipster/api" >> ".env"
fi

npm install

INLINE_RUNTIME_CHUNK=false npm run build

pushd build/static/js

cp -f 2*.js vendor.conference-details.js
cp -f main*.js main.conference-details.js
cp -f runtime~main*.js runtime.conference-details.js

popd

serve -l 5003 build

popd
