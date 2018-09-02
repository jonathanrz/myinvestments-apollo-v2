/*
 * Using module.exports instead of
 * export default allows us to import
 * the entities as named exports
 *
 * We can't use require.context here
 * because that is a webpack feature
 * and is not supported by jest
 */
module.exports = [require("./currentUser"), require("./investment")].reduce(
  (acc, { default: module }) => ({
    ...acc,
    [module.name]: module
  }),
  {}
)
