module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  // daisyui: {
  //   themes: [
  //     {
  //       'mytheme': {
  //         'primary': '#37cdbe',
  //         'primary-focus': '#7483bd',
  //         'primary-content': '#ffffff',
  //         'secondary': '#f000b8',
  //         'secondary-focus': '#bd0091',
  //         'secondary-content': '#ffffff',
  //         'accent': '#37cdbe',
  //         'accent-focus': '#2aa79b',
  //         'accent-content': '#ffffff',
  //         'neutral': '#3d4451',
  //         'neutral-focus': '#2a2e37',
  //         'neutral-content': '#ffffff',
  //         'base-100': '#ffffff',
  //         'base-200': '#f9fafb',
  //         'base-300': '#d1d5db',
  //         'base-content': '#1f2937',
  //         'info': '#2094f3',
  //         'success': '#009485',
  //         'warning': '#ff9900',
  //         'error': '#ff5724',
  //       },
  //     },
  //   ],
  // },
}
