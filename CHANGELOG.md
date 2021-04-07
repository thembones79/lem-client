# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2021-03-07

### 🔥 Added

- refactored all into Typescript

## [1.17.1] - 2021-03-09

### 👾 Fixed

- handling part numbers with dots (now part numbers with dots are allowed - but partnumbers with dots are not)

## [1.17.0] - 2021-03-08

### 🔥 Added

- (WIDS) RedirectionWithProducts component for adding (and deleting) multiple products to one redirection

## [1.16.0] - 2021-03-06

### 🔥 Added

- multi purpose sorting logic

### 💪 Changed

- updated some styling

## [1.15.0] - 2021-03-05

### 🔥 Added

- (WIDS) full Instructions component / page
- (WIDS) ProductChooser component
- (WIDS) InstructionsViewer component
- (WIDS) LineProductChooser component
- (WIDS) PartNumberProductChooser component
- (WIDS) StickerScanProductChooser component
- (WIDS) ZkScanProductChooser component
- (WIDS) LinkBlock component
- Loader component

## [1.14.0] - 2021-03-02

### 🔥 Added

- (WIDS) EditProduct component
- (WIDS) ConnectedLinks component
- (WIDS) ConnectedRedirections component
- (WIDS) LinkAdder component
- (WIDS) RedirectionAdder component
- (WIDS) create, read, update delete (and connect with links and redirections) functionalities for products (integration with backend)

## [1.13.0] - 2021-02-28

### 🔥 Added

- (WIDS) ProductsList component
- (WIDS) implement product filtering logic in ProductList component
- (WIDS) ProductItem component
- (WIDS) ProductRouter component
- (WIDS) NewProduct component

### 💪 Changed

- updated input styling

## [1.12.0] - 2021-02-26

### 🔥 Added

- (WIDS) RedirectionsList component
- (WIDS) NewRedirection component
- (WIDS) EditRedirection component
- (WIDS) RedirectionItem component
- (WIDS) RedirectionRouter component
- (WIDS) create, read, update and delete functionalities for redirections (integration with the backend)

### 💪 Changed

- simplified and refactored the **modal logic** to another files

## [1.11.0] - 2021-02-13

### 🔥 Added

- instruction, products and redirection tabs for **Workplace Instructions Distribution System** (WIDS)

## [1.10.0] - 2020-10-25

### 🔥 Added

- live view prototype (alpha stage)

## [1.9.1] - 2020-10-21

### 👾 Fixed

- CORS with websockets error

## [1.9.0] - 2020-10-21

### 🔥 Added

- websocket client-side handling and securing (for `live view` - not implemeted yet)

## [1.8.0] - 2020-10-16

### 🔥 Added

- occupying lines with picked orders

### 💪 Changed

- scanContentComponent for better handling lower resolution (or +150% scaling)

## [1.7.1] - 2020-10-11

### 👾 Fixed

- sound volume

## [1.7.0] - 2020-10-09

### 🔥 Added

- implemented sidebar

### 👾 Fixed

- sound messages

## [1.6.1] - 2020-10-03

### 👾 Fixed

- scan serial number font size

## [1.6.0] - 2020-10-02

### 🔥 Added

- implemented sound notifications

## [1.5.0] - 2020-10-02

### 🔥 Added

- implemented missed scans alert

## [1.4.1] - 2020-10-01

### 👾 Fixed

- FIXED: scans with diffrent date are appearing in missing scans component (and they shouldn't)

## [1.4.0] - 2020-09-30

### 🔥 Added

- implemented three efficiency ranges with three colors (feature request: rl-100)

## [1.3.0] - 2020-09-27

### 🔥 Added

- scrolling scanList to the top after user action (feature request: rl-098)

## [1.2.1] - 2020-09-27

### 👾 Fixed

- disappearing interface elements

## [1.2.0] - 2020-09-22

### 💪 Changed

- updated README.md
- updated favicon.ico
- updated logo192.png
- updated title and description

### 👾 Fixed

- visible scrolls on lower resolution issue

## [1.1.0] - 2020-09-19

### 🔥 Added

- CHANGELOG.md

### 💪 Changed

- updated README.md
- updated package.json
- updated error message on login screen to more relevant one
- updated welcome screen to show links to frontend's and backend's changelogs

### 👾 Fixed

- header height issue
- interface wrapping issue

### 🧹 Removed

- unused method in ScanList component

## [1.0.0] - 2020-09-04

### 🔥 Added

- initial release
