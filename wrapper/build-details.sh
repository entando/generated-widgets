pushd ../react/details

INLINE_RUNTIME_CHUNK=false npm run build

pushd build/static/js

mv -f 2*.js vendor.conference-details.js
mv -f main*.js main.conference-details.js
mv -f runtime~main*.js runtime.conference-details.js

popd

serve -l 5003 build

popd
