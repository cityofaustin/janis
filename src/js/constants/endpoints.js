const NAVMENU_ENDPOINT = [
  `${process.env.REACT_APP_CMS_ENDPOINT}/pages/`,
  `?format=json&type=base.ServicePage&fields=topic(text)`,
].join('')

export default NAVMENU_ENDPOINT
