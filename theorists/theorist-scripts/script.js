console.log(emojiList)

let allDat;
let thisPage;
showdown.setOption('optionKeyomitExtraWLInCodeBlocks', 'true');
showdown.setOption('prefixHeaderId', 'tester');
showdown.setOption('simplifiedAutoLink', 'true');
showdown.setOption('excludeTrailingPunctuationFromURLs', 'true');
showdown.setOption('strikethrough', 'true');
showdown.setOption('tables', 'true');
showdown.setOption('tasklists', 'true');
showdown.setOption('requireSpaceBeforeHeadingText', 'true');

class Page {
    constructor(data, tags, user, page) {
        this.page = page;
        this.data = data;
        this.tags = tags;
        this.user = user;
    }
}

function loadContent(user, page) {
    Papa.parse(`https://docs.google.com/spreadsheets/d/e/2PACX-1vR4PmOLTAzRY1Vp-hpUXwFY0LVrLze68gNYJZYI27aNLzglQGgReVV76gqmYoFxLnPQX9X3Wxvxu_gU/pub?gid=1436726988&single=true&output=csv`, {
        download: true,
        complete: function(results) {
            thisPage = results.data[0][0];
            displayContent(page);
        }
    });
}

function displayContent(page) {
    let converter = new showdown.Converter({extensions: [kathrynsBS, hpEmotes]});
    let html = converter.makeHtml(thisPage);
    $("#imported-content").append(html);
    console.log("displayed");
}

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
    return[escapeChars, hashStyle, hashspan, hashspanend];
}

let hpEmotes = Object.keys(emojiList).map(key => ({
    type: 'lang',
    regex: new RegExp(`:${key}:`, 'gi'),
    replace: `<i class="emote em${key}"></i>&#x200B;`
}));