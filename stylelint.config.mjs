import standardConfig from 'stylelint-config-standard';

/** @type {import('stylelint').Config} */
export default {
  extends: [standardConfig],
  rules: {
    'block-no-empty': true,
  },
};