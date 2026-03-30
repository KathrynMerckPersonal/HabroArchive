showdown.setOption('optionKeyomitExtraWLInCodeBlocks', 'true');
showdown.setOption('prefixHeaderId', 'tester');
showdown.setOption('simplifiedAutoLink', 'true');
showdown.setOption('excludeTrailingPunctuationFromURLs', 'true');
showdown.setOption('strikethrough', 'true');
showdown.setOption('tables', 'true');
showdown.setOption('tasklists', 'true');
showdown.setOption('requireSpaceBeforeHeadingText', 'true');


function kathrynsBS() {
    let escapeChars = {
        type: 'lang',
        regex: /</g,
        replace: '&lt;'
    };
    let hashStyle = {
        type: 'output',
        regex: /<(.*)>#([^I]\w*)/g,
        replace: `<$1 class="hp$2">`
    };
    let hashspan = {
        type: 'output',
        regex: /#I(\w*)/g,
        replace: `<span class="hp$1">`
    }
    let hashspanend = {
        type: 'output',
        regex: /\/#/g,
        replace: `</span>`
    }
    let teenytext = {
        type: 'output',
        regex: />-#\s/g,
        replace: ` class="subheading"> `
    }
    let footnotelinks = {
        type : 'lang',
        regex: /\[\^(\d+)\][^:]/g,
        replace: `<sup>[<a class="fnl" href="#fn$1">$1</a>]</sup>`
    }
    let footnotes = {
        type: 'lang',
        regex: /\[\^(\d+)\]:(.*)/g,
        replace: `<span id="fn$1"> $1. $2 </span>`
    }
    let spoilers = {
        type: 'output',
        regex: /\|\|(.*)\|\|/g,
        replace: `<span class="hpspoiler">$1</span>`
    }
    return[escapeChars, hashStyle, hashspan, hashspanend, teenytext, footnotelinks, footnotes, spoilers];
}

let hpEmotes = Object.keys(emojiList).map(key => ({
    type: 'lang',
    regex: new RegExp(`:${key}:`, 'gi'),
    replace: `<i class="emote em${key}"></i>&#x200B;`
}));

let converter = new showdown.Converter({extensions: [kathrynsBS, hpEmotes]});
