import React from 'react';
import Parser from 'html-react-parser';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import cheerio from 'cheerio';

const HtmlFromAdmin = ({ content }) => {
  // If we have code blocks in there, we've got some markdown to work with
  if (content.includes('<code>')) {
    // #tbt - use cheerio to do some old school dom manip
    const $ = cheerio.load(content);

    const markdown = $('h1, h2, h3, h4, p, ul, ol')
      .map((index, element) => {
        if (
          element.children.length &&
          !element.children.some(child => child.type !== 'text')
        ) {
          return $.html(element);
        }

        return element.children
          .map(child => {
            if (child.type === 'text') {
              return $(child).text();
            }

            if (child.type === 'tag') {
              if (child.name === 'code') {
                $(element)
                  .find('br')
                  .replaceWith('\n');

                return $(child).text();
              }
            }

            return $.html(child);
          })
          .join('');
      })
      .get()
      .join('\n');

    return <ReactMarkdown source={markdown} escapeHtml={false} />;
  }

  // No markdown, just use Parser
  return Parser(content);
};

HtmlFromAdmin.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HtmlFromAdmin;
