module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // element-ui按需引入
  // "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
