# Ultimate Tab - Ads-free Ultimate Guitar tabs

> [!NOTE]
> Update 2024/08/07 : The project is once again accessible via the URL: https://ultimate-tab.com 🎉

**Link** : [https://ultimate-tab.com](https://ultimate-tab.com)

**Browser extension** : Ultimate Tab works with [LibRedirect](https://libredirect.github.io/index.html). Download and configure the extension to automatically redirect all Ultimate Guitar links to Ultimate Tab.

A web application that delivers an enhanced, ads-free and fast responsive interface to browse guitar tabs scraped from Ultimate Guitar.

![Ultimate Tab Screenshot](https://i.ibb.co/RYLXkNc/586shots-so.png)
![Ultimate Tab Screenshot](https://i.ibb.co/THdSmPK/673shots-so.png)

## Features

- Browse responsive guitar tabs scraped in real time from Ultimate Guitar.
- Chords visualizer with official diagrams from Ultimate Guitar.
- Chords transposer.
- Autoscroll tab.
- Font size management
- Backing track player (using YouTube API).
- Add tabs to favorites without the need for an account (stored in local storage).

## Features in Development

- Export tab as PDF.

## Technologies

Ultimate Tab has been built with a modern stack, including:

- [NextJS](https://nextjs.org/) - React Framework
- [Puppeteer](https://pptr.dev/) - Headless browser used for web scraping
- [React Query](https://tanstack.com/query/v3/) - Server state management
- [React Context API](https://react.dev/reference/react#context-hooks) - Client state management
- [ChakraUI](https://chakra-ui.com/) - UI Component Library
- [Vexchords](https://github.com/0xfe/vexchords) - Chords renderer library

## Installation

To run Ultimate Tab locally, you must have Node.js and NPM or Yarn installed on your computer. Follow these steps to get started:

1. Clone this repository using `git clone https://github.com/BenoitBellegarde/UltimateTab.git`
2. Navigate to the project directory using the terminal or command prompt.
3. Run `npm install` or `yarn install` to install the dependencies.
4. Run `npm run dev` or `yarn dev` to start the development server.
5. Create `.env.local` file and add a variable `YOUTUBE_API_KEY` with a YouTube API key as value to get backing tracks
6. Open http://localhost:3000 in your web browser to see Ultimate Tab running.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any features or bug fixes.

## License

Ultimate Tab is licensed under the [MIT License](https://opensource.org/licenses/MIT).
