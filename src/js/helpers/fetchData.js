import axios from 'axios';
import { get } from 'lodash';
import request from 'graphql-request';


// queries
import allServicePagesQuery from 'js/queries/allServicePagesQuery';

// clean data helpers
import { cleanServiceLinks } from 'js/helpers/cleanData';

export const fetchServices = (lang) => {
  request(
    `${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`,
    allServicePagesQuery
  )

  // console.log(`${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`)
  // axios
  //   .create({
  //     headers: { 'Accept-Language': lang }
  //   })
  //   .get(`${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`, {
  //     query: allServicePagesQuery,
  //   })
  //   .then(res => {
  //     let data = get(res.data, 'data.allServicePages', {});
  //     data = cleanServiceLinks(data);
  //     console.log(data)
  //     return data;
  //
  //     // const data = this.cleanData(res);
  //     // return data;
  //     // this.setState({ data: data });
  //   })
  //   .catch(err => console.log(err))
}

export const fetchData = (slug, lang = this.props.lang) => {
  console.log('fetching data', ` for ${slug}`, ` in ${lang}`)

  if (process.env.NODE_ENV !== 'production') {
    // Allow querystrings to set data, which is used in joplin for livepreview
    const query = parse(this.props.location.search);
    if (query.preview) {
      const data = JSON.parse(query.d);
      // this.setState({ data: data });
      return data;
    }
  }

  axios
    .create({
      headers: { 'Accept-Language': lang }
    })
    .post(`${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`, {
      query: servicePageQuery,
      variables: {
        slug: slug,
      }
    })
    .then(res => {
      const data = this.cleanData(res);
      return data;
      // this.setState({ data: data });
    })
    .catch(err => console.log(err))
}
