# janis
Frontend for [joplin](https://github.com/cityofaustin/joplin).

## Run locally

#### As a React App:
```
./scripts/serve-local.sh
```
Your react app should be running at http://localhost:3000/

## Adding dependencies via yarn

This will update your container's yarn.lock and package.json files.
Your local host machine's yarn.lock and package.json files will also be updated via mounted docker volumes. These local files are versioned and should be checked into git.


Add a package via yarn (https://yarnpkg.com/lang/en/docs/cli/add/)
```
docker exec --interactive --tty janis yarn add <package name>
```

Note: if you're running the docker container built by serve-build.sh you'll have to update the container name from `janis` to `janis-build` in the above command.
___

## Updating translation export via yarn

All static translations live in src/js/i18n/locales/ directory.
These files are versioned and built from the auto-generated default.json file (within that directory) via [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl).
To re-generate default.json to update the static content to be translated, the following command can be run:

```
docker exec --interactive --tty janis yarn run build-langs
```

Note: if you're running the docker container built by serve-build.sh you'll have to update the container name from `janis` to `janis-build` in the above command.
___


## Design assets

Current design mockups are stored in Google Drive as Sketch Files:
https://drive.google.com/drive/u/1/folders/1Xg6739ixhIDrb7MdJAnO4_zCRu3kDmZQ

---

## SASS Regime Guidelines (WIP)

We're using a modified form of the 7-1 pattern, and BEM for CSS naming and organization
- our css file structure and js file structure should be congruent.
  EX. You can find css for js modules in the css/modules folder, you can find css for js page_sections in the css/page_sections folder and so on.
- js/modules our are smallest unit and should not have any additional custom react component imports
- our css is namespaced with coa-
- our css classes should stack. EX. a blue button would look like `<button class="coa-button coa-button--blue">Button</button>`.
- class names for js components should correspond with the js component name(capitalized and camelCased).
  EX. LinkList.js markup has styles applied via the class names `coa-LinkList coa-LinkList--boxprimary`.
- class names which are not js components but have multiple words should be separated by a -
  EX. `coa-Footer__body-text`

Resources:
- http://vanseodesign.com/css/sass-directory-structures/
- http://getbem.com/introduction/

---

## Accessibility Guidelines (WIP)

- When we use `target="_blank"` on an anchor tag, we should add `aria-label="Opens in new window"` and `rel="noopener noreferrer"` for [security](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/)

a11y Resources:
- http://wave.webaim.org/
- https://www.w3.org/WAI/WCAG20/quickref/
- [Accessibility section of "Front-End Checklist"](https://github.com/thedaviddias/Front-End-Checklist#accessibility)
- https://cfpb.github.io/design-manual/best-practices/accessibility-best-practices.html
- https://developers.google.com/web/fundamentals/accessibility/how-to-review
- [How we’ve made GOV.UK Elements even more accessible](https://accessibility.blog.gov.uk/2018/02/28/how-weve-made-gov-uk-elements-even-more-accessible/) and https://accessibility.blog.gov.uk/ in general
- https://accessibility.18f.gov/
- https://developer.mozilla.org/en-US/docs/Learn/Accessibility

---

## React-Static

This project uses React-Static to generate static pages from a react app.

TODO: more on this decision + evaluation

---

## Storybook

- Storybook is a development environment for UI components. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.
- To run Storybooks locally:
  - `./scripts/serve-storybook.sh`
  - open http://localhost:6006/
