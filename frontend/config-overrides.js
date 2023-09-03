const {aliasDangerous} = require("react-app-rewire-alias/src/aliasDangerous");
const {configPaths} = require("react-app-rewire-alias");
const {override} = require("customize-cra");


module.exports = {
    webpack: override(
        aliasDangerous(configPaths('.tsconfig.paths.json'))
    ),
};
