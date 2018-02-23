# janis
Frontend for [joplin](https://github.com/cityofaustin/joplin).

## Run locally

#### As a React App:
```
./scripts/serve-local.sh
```
Your react app should be running at http://localhost:3000/

#### As a React-Static Site:
```
./scripts/serve-build.sh
```
Your react app should be running at http://localhost:8080/


---

# React-Static

This project uses React-Static to generate static pages from a react app.

TODO: more on this decision + evaluation

---

## Adding dependencies via yarn

This will update your container's yarn.lock and package.json files.
Your local host machine's yarn.lock and package.json files will also be updated via mounted docker volumes. These local files are versioned and should be checked into git.


Add a package via yarn (https://yarnpkg.com/lang/en/docs/cli/add/)
```
docker exec --interactive --tty janis yarn add <package name>
```

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
- https://accessibility.18f.gov/
- https://cfpb.github.io/design-manual/best-practices/accessibility-best-practices.html

---
