import React from 'react';
import Parser from 'html-react-parser';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import Trashy from 'components/Trashy';
import Recollect from 'components/Recollect';

const HtmlFromRichText = ({ content }) => {

  const parsed = Parser(content, {
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
        // an 'a' tag to make the whole thing a link.
        // We set the placeholder 'rich-text-button-link' class within Joplin's register_rich_text_features hook.
        if (
          domNode.attribs.class &&
          domNode.attribs.class.includes('rich-text-button-link')
        ) {
          const linkChild = domNode.children && domNode.children.find(c => c.name === "a");
          if (linkChild) {
            // make it a link not a div
            domNode.name = 'a';

            // get the href from the wrapped link
            domNode.attribs.href = linkChild.attribs.href;

            // get child text element from the wrapped link
            domNode.children = linkChild.children;
          }
        }

        /*
          We want to add an external link icon to our external links. This will
          check to see if the link includes "http", indicating it is external,
          and then included the external link icon!
        */
        if (domNode.name === "a" && domNode.attribs.href && domNode.attribs.href.includes("http")) {
          domNode.attribs.class += " coa-HtmlFromRichText_exteranlLink"
          const linkTextContent = domNode.children[0].data

          // convert text link to own element for style underline specific.
          domNode.children[0] = {
            type: "tag",
            name: "u",
            children: [{
              type: "text",
              data: linkTextContent
            }],
          }
          domNode.children.push({
            type: "tag",
            name: "i",
            attribs: {
              class: "material-icons coa-HtmlFromRichText_exteranlLinkIcon",
            },
            children: [{
              type: "text",
              data: "open_in_new"
            }],
          })
        }

      }
    },
  });

  return parsed
};

HtmlFromRichText.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HtmlFromRichText;
