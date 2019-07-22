import React from 'react';
import Parser from 'html-react-parser';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

const HtmlFromAdmin = ({ content }) => {
  return Parser(content, {
    replace: domNode => {
      // this initial if is needed to prevent undefined error
      // making a sorta safe assumption that buttons in the steps
      // will always be part of a list (to prevent links elsewhere
      // from being overwritten), but perhaps there is a better
      // way to distinguish them
      if (domNode.attribs) {
        // Turn parse markdown from code
        if (domNode.name === 'code') {
          console.dir(domNode);

          const markdown = domNode.children
            .filter(child => child.type === 'text')
            .map(textChild => textChild.data)
            .join('\n');

          return <ReactMarkdown source={markdown} escapeHtml={false} />;
        }

        // Turn links into buttons
        // waiting on
        // if (
        //   domNode.attribs.hasOwnProperty('href') &&
        //   domNode.parent.name !== 'li'
        // ) {
        //   // replace the node with a button
        //   return (
        //     <a class="usa-button-primary" href={domNode.attribs.href}>
        //       {/* this is kinda goofy, but the 'data' is the text of the link
        //                and html-parser reads that as a child of 'a' */}

        //       {domNode.children[0].data}
        //     </a>
        //   );
        // }
      }
    },
  });
};

HtmlFromAdmin.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HtmlFromAdmin;
