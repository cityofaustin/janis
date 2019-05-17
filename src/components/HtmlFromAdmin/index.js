import React from 'react';
import Parser from 'html-react-parser';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import cheerio from 'cheerio';

const HtmlFromAdmin = ({ content }) => {
  // if(content.indexOf("<code>")) {
  //   // If we have code blocks in there, we've got some markdown to work with
  //   // to handle this we will parse everything from HTML into markdown and then
  //   //
  // }
  // debugger;

  // Really hacking it together here
  // const domParser = new DOMParser();
  // const doc = domParser.parseFromString(content, 'text/html');
  // var kids = [...doc.body.children];
  var useMarkdown = false;
  // var markdown = '';

  // #tbt
  const $ = cheerio.load(content);
  // const blarg = $('p');
  // debugger;

  const blarg = $('p')[0]; //.find('*');

  $('p')
    .find('br')
    .replaceWith('\n');

  const markdown = $('p')
    .map((index, element) => {
      return element.children
        .map(child => {
          if (child.type === 'text') {
            return $(child).text();
          }

          if (child.type === 'tag') {
            if (child.name === 'code') {
              // debugger;
              return $(child).text();
            }
          }

          return $.html(child);
        })
        .join('');
    })
    .get()
    .join('\n');
  // debugger;

  // debugger;

  // blarg.each((index, element) => {
  //   debugger;
  // });

  // const markdown = $('code')
  // .map((index, element) => {
  //   $(element)
  //     .find('br')
  //     .replaceWith('\n');
  //   debugger;
  //   console.log($(element).text());
  //   return $(element).text();
  // })
  // .get()
  // .join('\n');

  // const markdown = blarg.children
  //   .map(child => {
  //     if (child.type === 'text') {
  //       return $(child).text();
  //     }

  //     if (child.type === 'tag') {
  //       if (child.name === 'code') {
  //         debugger;
  //         return $(child).text();
  //       }
  //     }

  //     return $.html(child);

  //     // debugger;
  //     // $(element)
  //     //   .find('br')
  //     //   .replaceWith('\n');
  //     // // debugger;
  //     // console.log($(element));
  //     // console.log(element.name); //.text());
  //     // return $(child).text();
  //   })
  //   .join('');

  // debugger;

  if (markdown) {
    debugger;
  }
  // debugger;

  // debugger;
  // debugger;

  // for (const kid of kids) {
  //   if (kid.lastChild.localName === 'code') {
  //     useMarkdown = true;
  //     markdown = markdown.concat(kid.innerText, '\n');
  //   } else {
  //     markdown = markdown.concat(kid.outerHTML, '\n\n');
  //   }
  // }

  if (markdown) {
    return <ReactMarkdown source={markdown} escapeHtml={false} />;
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
