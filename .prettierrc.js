/** @type {import("prettier").Config} */
const config = {
  "trailingComma": "es5",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "arrowParens": 'always',
  "printWidth": 100,
  "plugins": [
    import("prettier-plugin-tailwindcss")
  ]
}

module.exports = config