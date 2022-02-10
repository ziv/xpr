rm -rf cov_profile
deno test --import-map import_map.json --coverage=cov_profile
deno coverage --exclude="./core/reflection|test\.ts" cov_profile --lcov > cov_profile/cov_profile.lcov
genhtml -o cov_profile/html cov_profile/cov_profile.lcov
