import React from 'react';
import Parser from 'html-react-parser';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Trashy from 'components/Trashy';
import Recollect from 'components/Recollect';

const HtmlFromRichText = ({ content }) => {
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
          const content = domNode.children
            .filter(child => child.type === 'text')
            .map(textChild => textChild.data)
            .join('\n');

          // Check if we have an app block
          if (content.indexOf('APPBLOCK') === 0) {
            const blockName = content.slice(10);
            if (blockName === 'Collection Schedule') {
              return <Trashy />;
            }

            if (blockName === 'What do I do with') {
              return <Recollect options={{ name: 'wizard' }} />;
            }
          }

          return <ReactMarkdown source={content} escapeHtml={false} />;
        }

        // This makes wagtail's default video embeds work on small screens
        if (domNode.name === 'iframe') {
          domNode.attribs.width = '100%';
          domNode.attribs.title = 'Embedded video';
        }

        if (domNode.attribs.class === 'responsive-object') {
          // For some reason wagtail chucks a giant margin on the bottom here,
          // let's clear that out and handle any additional styling using classes
          domNode.attribs.style = '';
        }

        // If we're getting the button div from drafttail, we need to turn it into
        // an 'a' tag to make the whole thing a link
        if (
          domNode.attribs.class &&
          domNode.attribs.class.includes('rich-text-button-link')
        ) {
          const child = domNode.children && domNode.children[0];
          if (child && child.name === 'a') {
            // make it a link not a div
            domNode.name = 'a';

            // get the href from the wrapped link
            domNode.attribs.href = child.attribs.href;

            // get child text element from the wrapped link
            domNode.children = child.children;
          }
        }
      }
    },
  });
};

HtmlFromRichText.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HtmlFromRichText;
