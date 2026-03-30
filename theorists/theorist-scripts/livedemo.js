$(document).ready(function () {
    
    let inp = $("#inputcont");
    let doc = $("#documentation");
    let oup = $("#outputcont");
    inp.autoResize();

    doc.text(doctext);

    inp.on('input', function () { 
        oup.html(converter.makeHtml(inp.val()));
        
    });
    doc.ready(function () {
        oup.html(converter.makeHtml(doctext));
    })
});

let doctext = `# heading 1
## heading 2
...
###### heading 6
-# tiny heading :baby_boy:

link: www.google.com

[fancy link](www.google.com)

*italics*

**bold**

***bold AND italics***

~~strikethrough~~

#tcenter centered text

habro server emojis: :mayo:, :yuri:, :spades_1:, etc. (you can add them to a heading to make them bigger)

# :mayo:

||spoiler text||

#fancy A very fancy paragraph with #Ihighlight highlighted text/# and some #Igreentext green text/#.
 not enough? fine have some #Igreenglow green glow/# too ig

A statement warrenting a footnote[^14]


> #fancy block quote example
>
> "my stupid chud dog wake me up"
> 
> -sydney collings

\`inline code\`

\`\`\`
fenced code block
(multiline)
\`\`\`

- unordered
- list
- uses
- hyphens

1. ordered
2. lists
3. use
4. numbers

- [ ] checklists?
- [x] why not tbh

images (~~be responsible or so help me god~~): 
![baby sid](https://media.discordapp.net/stickers/1481857391225081896.webp?size=240&quality=lossless "baby syd")

tables exist but y'all can figure them out yourselves lmao

emojis currently available:
:BRICKNEY: :Hyena: :LETSGOOOO: :SantaBRICKNEY: :alice_doubt: :alice_drive: :alice_heart: :alice_loukiw: :alice_love: :aliceevilmonkey: 
:aliceevilmonkeyred: :alicethinkingmonkey: :baby_boy: :cat_distraught: :cat_eager: :cat_laugh_and_point: :chadelia: :chadshire: :clubs_1: 
:cordelia_rage: :cordelia_sip: :cordelia_spray: :crash_out: :cursed: :diamonds_1: :emoji_31: :free_pop_cat: :hatter_wheeze: :hatter_why: 
:hearts_1: :hehe: :joker: :kidney: :kidney_text: :mary_ann_loukiw: :mayo: :queen_sticker: :spades_1: :suffering: :yumcat: :yuri: 

[^14]: yeah that sure is a statement -a foot`

function copytext() {
    navigator.clipboard.writeText($("#inputcont").val());
}