const path = require('path')

module.exports = function (wallaby) {

  process.env.NODE_PATH += path.delimiter + path.join(wallaby.projectCacheDir, 'apps');

  return {
    files: [
      {
        pattern: "apps/**",
      },
      {
        pattern: "**/node_modules/**",
        ignore: true
      },
      {
        pattern: "apps/**/*.spec.ts",
        ignore: true
      }
    ],

    tests: [
      {
        pattern: "apps/**/*.spec.ts",
      },
      {
        pattern: "**/node_modules/**",
        ignore: true
      }
    ],

    env: {
      type: "node",
    },

    loose: true,

    delay: {
      run: 1000
    },

    filesWithNoCoverageCalculated: [
      "**/node_modules/**"
    ],

    debug: true,

    reportConsoleErrorAsError: true,
  };
};
