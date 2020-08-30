# ClayMemory - sculpt your mind

React-based reader and editor for creating notes and flash cards directly from PDF documents.

Try it: [https://luccahellriegel.github.io/ClayMemory](https://luccahellriegel.github.io/ClayMemory)

## Controls

ClayMemory tries to explore a better alternative to using multiple programs and copy-pasting via clipboard, so the controls might take some getting used to. Most of the functionality is hinted at via tooltips and it does not hurt to play around. Be sure to drop any bugs you notice (+ screenshots, video or detailed description) in the issues.

### Mouse controls

- Selecting in the PDF (and letting the left mouse-button go) triggers the Extraction-UI for creating flash cards
- Right-click in a card text-field while having something selected (see Current Selection-Overlay) triggers the Extraction-UI for the river
  - It could not be the same as in the PDF, because in the text you might want to select for other reasons than just extraction

## Overview

Flash cards enable two of the most powerful empirically validated studying techniques: active recall and spaced repetition. Software like [Anki](https://apps.ankiweb.net/) brilliantly allows its users to study their flash cards everywhere and use algorithms to optimize the repetition intervals for maximum retention.

Creating digital flash cards, however, can be hard work, especially if huge amounts of material need to be covered. Hours are spent just copy-pasting or taking screenshots from lecture slides or book PDFs.

One way how this could be simplified dramatically would be if your document-reader included tools to quickly extract information from the documents in a flashcard-ready format, and to allow you to iterate upon your formulations in the context of where you extracted it from in the documents.

ClayMemory is a prototype of this new type of document-reader.
It is open source and primarily build to research the question of how an integration of flash-card tools with a reader can enhance the usability of creating flash cards and therefore enable an intuitive integration of memory enhancement in the studying or reading process. In the long term, ClayMemory will be expanded to a desktop app which features a connection to Anki, so that the flash cards can be comfortably created in ClayMemory and also use the comfort of Anki-based repetition.

Issues, PRs and general suggestions welcome.

## Features

- Multiple views:
  - ActiveRiver: view the document page and all the corresponding flash cards in parallel
  - SummaryRiver: view all your flash cards
- Extraction-context menu for documents and cards for fast and easy flash card creation
- Origin-System: jump to the place in the document where you got the material for your flash card from
  - Origin gets preserved when copying between cards
- Customize the layout to always have access to the correct information
  - Hide/show cards or document
  - Filter your cards by type
  - Search your cards
- Handle multiple documents and their corresponding cards
- Download or upload the document data sets
- Basic PDF navigation
- Undo/redo for all card-related operations
- Local persistence in your browser, no cloud or additional download necessary
  - Known issue: PDFs are not saved

## Tech Stack

- TypeScript
- React
  - Material-UI
  - react-pdf / PDF.js
- Redux
  - redux-persist
  - redux-undo
  - redux-thunk
  - reselect
- [Architecture inspiration](https://jaysoo.ca/2016/02/28/organizing-redux-application/)
  - Boundary enforcement with dependency-cruiser

## TODO Types

- RC: release candidate, need this to be feature complete
- NICE: nice to have
- PERF: performance optimization possible if I notice it during testing

## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
