deno coverage cov_profile --lcov > cov_profile/cov_profile.lcov
genhtml -o cov_profile/html cov_profile/cov_profile.lcov
