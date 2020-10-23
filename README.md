# 🌻 Janis ☮️

Janis is the codename for the software that renders [alpha.austin.gov](https://alpha.austin.gov) for web browsers. It is a working prototype of static site generation front-end and decoupled CMS architecture.

Janis uses data provided by the CMS API service, [Joplin](https://github.com/cityofaustin/joplin), along with the React components to generate a static-progressive website.

## Table of Contents

* [Getting Started](#getting-started)
* [Project Info](#project-info)
* [Design](#design)
* [Frameworks and Libraries Used](#frameworks-and-libraries-used)
  * [React-Static](#react-static)
  * [Storybook](#storybook)
* [Browser Compatibility](#browser-compatibility)
* [Other Documentation for Developers](#other-documentation-for-developers)
  * [Adding dependencies via yarn](#adding-dependencies-via-yarn)
  * [Updating translation export via yarn](#updating-translation-export-via-yarn)
  * [Static build script](#static-build-script)
  * [Sass Code Style Guidelines](#sass-code-style-guidelines)
  * [Accessibility Guidelines](#accessibility-guidelines)

## 😃 Getting Started

In order to run Janis locally you need to [install Docker](https://docs.docker.com/install/#supported-platforms). Our team uses Docker for Mac.

Once Docker is installed and you've cloned the code from this repository, you can run the "serve-local" Shell script below to spin up a Docker container and install dependencies within a virtualized environment that replicates the production environment in our Heroku deployment.

#### As a React App (Developer Mode):

In order to develop locally, you will need to have installed these development tools.
- *HomeBrew*
  - $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
- *yarn*
  - Note: Homebrew must be install first.
  - $`brew install yarn`
- *npm*
  - Download and install at here: https://www.npmjs.com/get-npm

Clone the repository and navigate into the newly downloaded directory.
- $`git clone git@github.com:cityofaustin/janis.git`
- $`cd janis`

Install Janis dependencies.
- $`yarn install`
- $`npm install`

To run with Joplin Data
- Create a .env file $`cp template.env .env`
- Plug in the API_PASSWORD values that you'll need to build from each Joplin environment
- For example, to build from a locally running Joplin instance, add the correct API_PASSWORD_LOCAL to your .env and run `yarn start-local`
- To pull Joplin data from staging, add API_PASSWORD_STAGING to your .env and run `yarn start-staging`
- To pull Joplin data from production, add the correct API_PASSWORD_PROD to your .env and run `yarn start-prod`
- For Review (PR) apps, you'll need to add both an API_PASSWORD_PR and the JOPLIN_APPNAME_PR to your .env and run `yarn start-pr`


**As a static build**
To run the site locally as a static build, the way it works in production, see the [Static build script](#static-build-script) section below.

## Project Info

This work began under the Austin Digital Services Discovery Project. Design, Technology, and Innovation Fellows worked in partnership between two City departments, Communications Public Information and Communications and Technology Management.

We set out to learn what’s working for other government service providers, then embark on an iterative research, prototyping, and testing process to identify new designs, methods, and technologies.

More high level information about the project from content strategy, user research and design, and development teams is continually updated on [our project page](http://projects.austintexas.io/projects/austin-digital-services-discovery/about/what-we-are-doing/).

## Project Management

Janis is one piece of a bigger project around content management and technology platforms for the City of Austin.

To manage our roadmap and upcoming issues, we're using a dedicated Github repo, called [TechStack](https://github.com/cityofaustin/techstack), for project management along with Zenhub project boards.

* To see a list of all open issues related to the TechStack project, visit our [TechStack Github Issues page](https://github.com/cityofaustin/techstack/issues).
* To see a Kanban (Trello-style) task list, visit our [TechStack Zenhub board](https://app.zenhub.com/workspace/o/cityofaustin/techstack/boards).

## 🎨 Design

The design team uses sketch to mock up wireframe and high fidelity comps. The most up to date files can be linked here from Google drive. The parent file for current public interface/janis design files is https://drive.google.com/drive/folders/1J1AXm9bDgT0kO_2lugg4mnV4koZHpDO-?usp=sharing.

- [Alpha.austin.gov comprehensive user flow including home, theme, topic, service, process, and department templates](https://drive.google.com/file/d/1wtiU9LqpvU2KTu362bCPMfS7tfYgjyuf/view?usp=sharing)
- [Alpha.austin.gov design library documenting all current components](https://drive.google.com/file/d/1hGAZZ6ZPkDCZobEiC_7egCBrACUzKxWt/view?usp=sharing)
- [You can use one sketch library as a single source of truth across multiple designer's and developer's files. Never used sketch librairies before? Check out this introduction and detailed how-to's](https://www.sketchapp.com/docs/libraries/)
- [Alpha.austin.gov EMS process page](https://drive.google.com/file/d/1rqELW2K4ZI-BjV9Tecj-49UUzujVvLYr/view?usp=sharing)
- [Alpha.austin.gov Animal Center foster process page and form](https://drive.google.com/file/d/1nJePAA3EI1APmdFK8zcBjh4OuajyjElG/view?usp=sharing)
- [Alpha.austin.gov Search flow](https://drive.google.com/file/d/1V4VN1Q-_C2A87LRHRf4bgEv5iVFGBEnb/view?usp=sharing)
- [Alpha.austin.gov Permittingatx transition process page](https://drive.google.com/file/d/1EZ1_hdj30ebmWZuve-tpvw3Rl8ioN9kX/view?usp=sharing)

## Frameworks and Libraries Used

Here are some high-level notes about the open source technologies we are using for this project.

For more information about the concepts and architectural decisions guiding this work, take a break from this README and check out some of what we have written on Medium and our project page:

* https://medium.com/civiqueso/open-source-city-cms-part-1-607a58b32356
* http://projects.austintexas.io/projects/austin-digital-services-discovery/about/Dev/
* http://projects.austintexas.io/projects/austin-digital-services-discovery/our-technical-approach/open-by-default/

### ⚛️ React-Static

This project uses [React-Static](https://github.com/nozzle/react-static) as a base framework for building static-progressive React applications and websites. It's designed with considerations for SEO, site performance, and user/developer experience.

### 🌍 React-Intl

This project uses [React-Intl](https://github.com/formatjs/react-intl/) to format dates and numbers and handle translations of static content. Some details of our current implementation to be aware of follow:

* the formatMessage() react-intl API method will return unescaped HTML. We can utilize this method, alongside the dangerouslySetInnerHTML property available to React elements, to render translations of **trusted content** which include HTML. Note translated content cannot include React Components (see note below for rendering React Components with translations). Also note that the corresponding FormattedMessage Component will NOT return unescaped HTML.
```
import { defineMessages } from 'react-intl';
const messages = defineMessages({
  some_message_key: 'some message with html content and a <h1>{variable}</h1>'
})
...
<div dangerouslySetInnerHTML={{ __html: intl.formatMessage(messages.some_message_key,  {variable: 'variable definition'}) }}/>
```

* the FormattedMessage react-intl component will parse React components from the values property. We can utilize this method to render translations which have React components as parameters.
```
<FormattedMessage
  id="misc.workInProgressClipped"
  values={{
    citySiteLink: (
      <ExternalLink to="http://austintexas.gov">
        austintexas.gov
     </ExternalLink>
    ),
  }}
  defaultMessage="Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit {citySiteLink}."
/>
```

#### babel-plugin-react-intl-auto

* To simplify management of our static translation ids, we use [babel-plugin-react-intl-auto](https://github.com/akameco/babel-plugin-react-intl-auto). This plugin allows simpler translation definitions and automatically generates translated content ids namespaced to module export names, file paths, or a combination based on our babel react-intl-auto settings.

* Translation definitions live in src/js/i18n/definitions.js. Note translations are broken down into separate named exports which can later be moved into their own respective files as static translated content increases. When this is done, be sure to maintain the export name to not have to update imports. Translations are also defined inline when requiring more complex mark-up or JSX (see WorkInProgress component).

#### extract-react-intl-messages

* We use [extract-react-intl-messages](https://github.com/akameco/extract-react-intl-messages) to automatically extract our static translation definitions and build json files for each supported locale. Translations for each locale (accept the default en.json) needs to be manually entered once received from translators. Translations for each locale live in src/js/i18n/locales/. To extract new definitions run

```
docker exec --interactive --tty <janis or janis-build> yarn run build-translations
```

This plugin will *NOT* remove previously defined translations which are no longer present in the current app definitions. This clean up needs to be done manually at the moment.

### 📚 Storybook

* Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.
* To run Storybooks locally (on host):
  * `yarn storybook`
  * open http://localhost:5000/
* To build a deployable storybook static site:
  * `yarn build-storybook`
  * Copy ./storybook-static/ directory into netlify to deploy.
* To run Storybooks locally (via Docker):
  * `./scripts/serve-storybook.sh`
  * open http://localhost:6006/

### 💅🏼 Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter that integrates with most editors. You press save and code is formatted.

To set up Prettier check out their [editor integrations](https://prettier.io/docs/en/editors.html).

## Browser Compatibility

Following the lead of other government digital services groups ([USWDS](https://github.com/uswds/uswds/issues/2071), [UK GDS](https://gds.blog.gov.uk/2012/01/25/support-for-browsers/)), we're committing to support browsers that represent > 2% of all site traffic recorded in Google Analytics for visitors to austintexas.gov.

Based on data from 1/1/2018 to 4/16/2018 these are the browsers with > 2% of all site traffic that we commit to support. This list will be reevaluated again when we drop the `alpha.` subdomain.

* Safari 10 and above
* Chrome 63 and above
* Internet Explorer 11 and above
* Edge 16 and above
* Firefox 58 and above

Here are Google Analytics screenshots from data range 1/1/2018 to 4/16/2018.

#### Top Browsers as of 2018-04-16

![Top Browsers as of 2018-04-16](./docs/images/2018-04-16-top-browsers.png)

#### Top Browsers by version number as of 2018-04-16

![Top Browsers by version number as of 2018-04-16](./docs/images/2018-04-16-top-browsers-by-version.png)

As this project moves forward, we hope to implement even more comprehensive Browser Support guidelines following the examples of other government agencies like the [cfpb](https://github.com/cfpb/development/blob/master/guides/browser-support.md).

### Manual Testing with BrowserStack

Our team uses BrowserStack to manually check for device and browser compatibility. Our checklist of devices includes (subject to update):

**Mobile**

* iPhone 6S Safari & Chrome
* Galaxy S7 Chrome & Samsung Internet
* Galaxy Note8 Chrome
* Google Pixel Chrome

**Tablet**

* iPad 4 Safari
* Windows Tablet IE 11
* Kindle Fire HDX 7

**Desktop**

* Windows 7
  * IE 11
  * Firefox 57
  * Chrome 63
* Windows 10
  * Edge 16
  * IE 11
  * Chrome 63
  * Firefox 57
* MacOS
  * Safari 11
  * Chrome 63
  * Firefox 57

---

## Other Documentation for Developers

### Adding dependencies via yarn

This will update your container's yarn.lock and package.json files.
Your local host machine's yarn.lock and package.json files will also be updated via mounted docker volumes. These local files are versioned and should be checked into git.

Add a package via yarn (https://yarnpkg.com/lang/en/docs/cli/add/)

```
docker exec --interactive --tty <janis or janis-build> yarn add <package name>
```

### Static build script

Since we use React-Static as our framework to render our React components as a static progressive website, it's important for us to be able to test the final static build locally. In order to do this, we have a script.

**To build and serve**

```
./scripts/serve-build.sh
```

Your site will be running on http://localhost:8080/

### Testing with Jest

[Jest](https://https://jestjs.io/) is set up for [snapshot testing](https://jestjs.io/docs/en/snapshot-testing) as well us used for testing our queries. `yarn test` will run the tests in `src/components`.
If you need to update the snapshots, `jest --updateSnapshot`.


### Testing with Cypress

We have [Cypress](https://cypress.io) set up to run integration tests. Tests are located in janis/cypress/integration. To launch the Test Runner use `yarn open-cypress` or `npx cypress open`. You must be running janis locally in order to run tests. [Here](https://github.com/cypress-io/cypress-example-kitchensink/tree/master/cypress/integration/examples) are some example integration tests.

If you would like to update/change the base url used for testing, edit `cypress.json`.

## SASS Guidelines

We're using BEM for CSS naming and organization

* our css is namespaced with coa-
* our css classes should stack. EX. a blue button would look like `<button class="coa-button coa-button--blue">Button</button>`.
* class names for js components should correspond with the js component name(capitalized and camelCased).
  * EX. LinkList.js markup has styles applied via the class names `coa-LinkList coa-LinkList--boxprimary`.
* class names which are not js components but have multiple words should be separated by a -
  EX. `coa-Footer__work-in-progress`

Resources:

* http://getbem.com/introduction/

## Accessibility Guidelines

One advantage for using React components is that we can write reusable HTML-rendering modules that never forget about proper attribute tagging and ARIA labels.

For example, we learned that when we use `target="_blank"` on an anchor tag, we should add `aria-label="Opens in new window"` and `rel="noopener noreferrer"` for [security](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/). Now we have a reusable `<ExternalLink>` component.

more a11y Resources:

* http://wave.webaim.org/
* https://www.w3.org/WAI/WCAG20/quickref/
* [Accessibility section of "Front-End Checklist"](https://github.com/thedaviddias/Front-End-Checklist#accessibility)
* https://cfpb.github.io/design-manual/best-practices/accessibility-best-practices.html
* https://github.com/cfpb/development/blob/master/guides/accessibility.md
* https://developers.google.com/web/fundamentals/accessibility/how-to-review
* [How we’ve made GOV.UK Elements even more accessible](https://accessibility.blog.gov.uk/2018/02/28/how-weve-made-gov-uk-elements-even-more-accessible/) and https://accessibility.blog.gov.uk/ in general
* https://accessibility.18f.gov/
* https://developer.mozilla.org/en-US/docs/Learn/Accessibility
* tel aria guidance from: http://thatdevgirl.com/blog/accessibility-phone-number-formatting
