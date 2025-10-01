# Legal Agent

This is a legal literacy platform built using React + TypeScript + Vite.

It provides a minimal setup with Hot Module Replacement (HMR) and ESLint rules for development.

## Features

- React + TypeScript
- Vite for fast builds and dev server
- ESLint setup with optional plugins for type checking and React-specific lint rules

## Developer Notes

You can expand ESLint configuration like this:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
