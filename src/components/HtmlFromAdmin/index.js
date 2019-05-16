import React from 'react';
import Parser from 'html-react-parser';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const HtmlFromAdmin = ({ content }) => {
  // Really hacking it together here
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(content, 'text/html');
  var kids = [...doc.body.children];
  var useMarkdown = false;
  var markdown = '';

  for(const kid of kids) {
    if(kid.lastChild.localName === 'code') {
      useMarkdown = true;
      markdown = markdown.concat(kid.innerText, '\n');

    } else {
      markdown = markdown.concat(kid.outerHTML, '\n\n');
    }
  }

  if(useMarkdown) {
    return <ReactMarkdown source={markdown} escapeHtml={false}/>;
  } else {
    return Parser(content);
  }

  return null;

  // for (var index = 0; index < kids.length; index++) {
  //   if (kids[index].lastChild.localName === 'code') {
  //     indexesToReplace.push(index);
  //     tableMarkdown = tableMarkdown.concat(kids[index].innerText, '\n');
  //   }
  // }

  // console.log(indexesToReplace);
  // console.log(tableMarkdown);

  // const stringy = kids.map(k => k.outerHTML).join('');

  // return Parser(stringy);
};

HtmlFromAdmin.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HtmlFromAdmin;
