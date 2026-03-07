$(document).ready(function () {
    

let PostData;
let Pindata;
let HData;
$.getJSON("scripts/insta.json",
    function (data) {
        PostData = data;
    }
);

$.getJSON("scripts/stories.json",
    function (data) {
        HData = data;
    }
);

$.getJSON("scripts/pins.json",
    function (data) {
        PinData = data;
    }
);

function bufferCards (place) {
    let cola = $("<div></div>").addClass("col h-col h-col-3 h-col-2 h-col-1");
    let colb = $("<div></div>").addClass("col h-col h-col-2 h-col-1");
    let colc = $("<div></div>").addClass("col h-col h-col-1");
    place.prepend(cola, colb, colc);
}

class iPost {
    constructor(i, folder, desc, accessed, posted, link) {
        this.index = i;
        this.folder = folder;
        this.desc = desc;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
        this.link = link;
    }

    createCard(){
        const pattern = /mp4$/;
        const CId = "carousel" + this.folder;
        let cardDiv = $(`<div></div>`).addClass("card insta-card card-hidden");
        
        let quant = PostData[this.index].Count;
        let urls = PostData[this.index].value; 
        if(quant == 1 ) {
            cardDiv.append($("<img>").attr("src", ".." + urls[0]).addClass("card-img-top"));
        } else {
            let cSlide = $(`<div></div>`).addClass("carousel slide card-img-top").attr("id", CId);
            cardDiv.append(cSlide);
            let carouselI = $(`<div></div>`).addClass("carousel-indicators");
            let carouselInner = $(`<div></div>`).addClass("carousel-inner");
            cSlide.append(carouselI, carouselInner);
            for(let i = 0; i < quant; i++) {
                carouselI.append($(`<button></button>`).attr({
                    "type": "button",
                    "data-bs-target": "#" + CId,
                    "data-bs-slide-to": i,
                    "aria-label": "Slide " + (i + 1)
                }));
                let ci = $('<div></div>').addClass("carousel-item");
                if(pattern.test(urls[i])) {
                    ci.append($("<video></video>").attr({
                        "src": ".." + urls[i],
                        "controls": ""
                    }).addClass("d-block w-100 card-img-top"));
                } else {
                    ci.append($("<img>").attr("src", ".." + urls[i]).addClass("d-block w-100 card-img-top"));
                }
                carouselInner.append(ci);
                // create button to append 
                // create img to append
            }
            carouselI.children().first().addClass("active").attr("aria-current", "true");
            carouselInner.children().first().addClass("active");
            cSlide.append($("<button></button>").addClass("carousel-control-prev").attr({
                "type": "button",
                "data-bs-target": "#" + CId,
                "data-bs-slide": "prev"
            }).append($("<span></span>").addClass("carousel-control-prev-icon").attr("aria-hidden", "true"), 
            $("<span></span>").addClass("visually-hidden").append("Previous")),
                $("<button></button>").addClass("carousel-control-next").attr({
                "type": "button",
                "data-bs-target": "#" + CId,
                "data-bs-slide": "next"
            }).append($("<span></span>").addClass("carousel-control-next-icon").attr("aria-hidden", "true"), 
            $("<span></span>").addClass("visually-hidden").append("Next")));
        }
        //end carousel
        cardDiv.append($("<div></div>").addClass("card-footer posted-date").append(this.pDate.toLocaleDateString()));
        let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").addClass("card-text").append(this.desc.replaceAll(/\\n/g, "<br>")));
        cardDiv.append(cbody);        
        let wrapper = $("<div></div>").addClass("col").append(cardDiv);
        cbody.click(expandCard);
        let foot = $("<div></div>").addClass("card-footer read-more").append("read more");
        foot.click(expandCard);
        cardDiv.append(foot);
        cardDiv.append($('<a></a>').attr({
            "target" : "_blank",
            "href" : this.link
        }).addClass("cardLink bi bi-instagram"));
        return wrapper;
    }
}

class highlights {
    constructor(i, group, accessed, posted, link) {
        this.index = i;
        this.group = group;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
        this.link = link;
    }

    createCard(){
        const pattern = /mp4$/;
        let cardDiv = $(`<div></div>`).addClass("card h-card h-card-hidden");
        let url = HData[this.index-1];
        if(pattern.test(url)) {
            cardDiv.append($("<video></video>").attr({
                "src": "../images/stories/" + url,
                "controls": ""
            }).addClass("d-block w-100 card-img-top"));

        } else {
            cardDiv.append($("<img>").attr("src", "../images/stories/" + url).addClass("d-block w-100 card-img-top"));

        }
        let ctitle = $("<h4></h4>").addClass("card-title text-center").append('"' + this.group + '"');
        let cbody = $("<div></div>").addClass("card-footer posted-date").append(this.pDate.toLocaleDateString());
        cardDiv.append(ctitle, cbody);
        cardDiv.append($('<a></a>').attr({
            "target" : "_blank",
            "href" : this.link
        }).addClass("cardLink bi bi-instagram"));
        let wrapper = $("<div></div>").addClass("col").append(cardDiv);
        return wrapper;
    }
}

class pins {
    constructor(i, title, desc, accessed, posted, link) {
        this.index = i;
        this.title = title;
        this.desc = desc;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
        this.link = link;
    }

    createCard(){
        const pattern = /mp4$/;
        let cardDiv = $(`<div></div>`).addClass("card p-card p-card-hidden");
        let url = PinData[this.index-1];
        cardDiv.append($("<img>").attr("src", "../images/pins/" + url).addClass("d-block w-100 card-img-top"));
        let ctitle = $("<h5></h5>").addClass("card-header card-title text-center").append(this.title);
        let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").append(this.desc.replaceAll(/\\n/g, "<br>")));
        let cfoot = $("<div></div>").addClass("card-footer posted-date").append(this.pDate.toLocaleDateString());
        cardDiv.append(ctitle, cbody, cfoot);
        cardDiv.append($('<a></a>').attr({
            "target" : "_blank",
            "href" : this.link
        }).addClass("cardLink bi bi-pinterest"));
        let wrapper = $("<div></div>").addClass("col").append(cardDiv);
        return wrapper;
    }
}

class shorts {
    constructor(i, title, desc, accessed, posted, link) {
        this.index = i;
        this.title = title;
        this.desc = desc;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
        this.link = link;
    }

    createCard(){
        let cardDiv = $(`<div></div>`).addClass("card s-card card-hidden");
        cardDiv.append($("<video></video>").attr({
                        "src": "../images/shorts/" + this.index + ".mp4",
                        "controls": ""
                    }).addClass("d-block w-100 card-img-top"));
        let cfoot = $("<div></div>").addClass("card-footer posted-date").append(this.pDate.toLocaleDateString());
        let ctitle = $("<h6></h6>").addClass("card-header card-title text-center").append(this.title);
        let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").append(this.desc.replaceAll(/\\n/g, "<br>").replaceAll(/\\"/g, '"')));
        cbody.click(expandCard);
        let foot = $("<div></div>").addClass("card-footer read-more").append("read more");
        foot.click(expandCard);
        cardDiv.append(ctitle, cfoot, cbody, foot);
        cardDiv.append($('<a></a>').attr({
            "target" : "_blank",
            "href" : this.link
        }).addClass("cardLink bi bi-youtube"));
        let wrapper = $("<div></div>").addClass("col").append(cardDiv);
        return wrapper;
    }
}

class videos {
    constructor(i, title, desc, accessed, posted, link) {
        this.index = i;
        this.title = title;
        this.desc = desc;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
        this.link = link;
    }

    createCard(){
        if(this.index == 9) {
            return studycard(this);
        } else if (this.index == 16){
            return youtubeCard(this);
        }
        let cardDiv = $(`<div></div>`).addClass("card v-card card-hidden");
        cardDiv.append($("<video></video>").attr({
                        "src": "../images/youtube/" + this.index + ".mp4",
                        "controls": ""
                    }).addClass("d-block w-100 card-img-top"));
        let cfoot = $("<div></div>").addClass("card-footer posted-date").append(this.pDate.toLocaleDateString());
        let ctitle = $("<h6></h6>").addClass("card-header card-title text-center").append(this.title);
        let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").append(this.desc.replaceAll(/\\n/g, "<br>").replaceAll(/\\"/g, '"')));
        cbody.click(expandCard);
        let foot = $("<div></div>").addClass("card-footer read-more").append("read more");
        foot.click(expandCard);
        cardDiv.append(ctitle, cfoot, cbody, foot);
        cardDiv.append($('<a></a>').attr({
            "target" : "_blank",
            "href" : this.link
        }).addClass("cardLink bi bi-youtube"));
        let wrapper = $("<div></div>").addClass("col").append(cardDiv);
        return wrapper;
    }
}

let postnum = 0;
//iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
if($("#post-container").hasClass("insta")) {
    Papa.parse(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSXzA9ZHAVXMEjfUTS_JBtk5iz7X1i4auwWJHwErdmDYsuYeEcuL8h78sXxxiFvgtYWBWRt8wx8RHl2/pub?gid=0&single=true&output=csv`,
    {
        download: true,
        complete: function(results) {
            for(result of results.data) {
                const postItem = new iPost(Number(result.index), result.index, result.desc, result.accessed, result.posted, result.link);
                $("#post-container").prepend(postItem.createCard());
                postnum++;
            }
            bufferCards($("#post-container"));
            calcBuffer();
        },
        header: true
    }
)
}

//hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
if($("#post-container").hasClass("highlights")) {
    Papa.parse(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSXzA9ZHAVXMEjfUTS_JBtk5iz7X1i4auwWJHwErdmDYsuYeEcuL8h78sXxxiFvgtYWBWRt8wx8RHl2/pub?gid=637674340&single=true&output=csv`,
    {
        download: true,
        complete: function(results) {
            for(result of results.data) {
                const hItem = new highlights(Number(result.index), result.group, result.accessed, result.date, result.link);
                $("#post-container").prepend(hItem.createCard());
                postnum++;
            }
            bufferCards($("#post-container"));
            calcBuffer();
        },
        header: true
    }
    );
}

//pppppppppppppppppppppppppppppppppppppppppp
if($("#post-container").hasClass("pins")) {
    Papa.parse(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSXzA9ZHAVXMEjfUTS_JBtk5iz7X1i4auwWJHwErdmDYsuYeEcuL8h78sXxxiFvgtYWBWRt8wx8RHl2/pub?gid=1062566579&single=true&output=csv`,
    {
        download: true,
        complete: function(results) {
            for(result of results.data) {
                const pinItem = new pins(Number(result.index), result.title, result.desc, result.accessed, result.date, result.link);
                $("#post-container").prepend(pinItem.createCard());
                postnum++;
            }
            bufferCards($("#post-container"));
            calcBuffer();
        },
        header: true
    }
    );
}

//ssssssssssssssssssssssssssssssssssssssssss
if($("#post-container").hasClass("shorts")) {
    Papa.parse(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSXzA9ZHAVXMEjfUTS_JBtk5iz7X1i4auwWJHwErdmDYsuYeEcuL8h78sXxxiFvgtYWBWRt8wx8RHl2/pub?gid=1454037593&single=true&output=csv`,
    {
        download: true,
        complete: function(results) {
            for(result of results.data) {
                const shortsItem = new shorts(Number(result.index), result.title, result.description, result.accessed, result.date, result.link);
                $("#post-container").prepend(shortsItem.createCard());
                postnum++;
            }
            bufferCards($("#post-container"));
            calcBuffer();
        },
        header: true
    }
    );
}

//vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
if($("#post-container").hasClass("vids")) {
    Papa.parse(
    `https://docs.google.com/spreadsheets/d/e/2PACX-1vSXzA9ZHAVXMEjfUTS_JBtk5iz7X1i4auwWJHwErdmDYsuYeEcuL8h78sXxxiFvgtYWBWRt8wx8RHl2/pub?gid=2100894241&single=true&output=csv`,
    {
        download: true,
        complete: function(results) {
            for(result of results.data) {
                const vidsItem = new videos(Number(result.index), result.title, result.description, result.accessed, result.date, result.link);
                $("#post-container").prepend(vidsItem.createCard());
                postnum++;
            }
            bufferCards($("#post-container"));
            calcBuffer();
        },
        header: true
    }
    );
}



function expandCard () { 
    $(this).parent().toggleClass("card-hidden");
    if($(this).parent().hasClass("card-hidden")) {
        if($(this).parent().hasClass("insta-card") || $(this).parent().hasClass("v-card")) {
            $(this).parent().css("max-height", "450px");
        } else if ($(this).parent().hasClass("s-card")) {
            $(this).parent().css("max-height", "600px");
        }
        if($(this).hasClass("read-more")) {
            $(this).css("opacity", 1);
        } else {
            $(this).next().css("opacity", 1);
        }
    } else {
        $(this).parent().css("max-height", $(this).parent()[0].scrollHeight + "px");
        if($(this).hasClass("read-more")) {
            $(this).css("opacity", 0);
        } else {
            $(this).next().css("opacity", 0);
        }
    }
}


function calcBuffer () {
    let w = $(document).width();
    let n;
    $(".h-col").css("display", "initial");
    if(w < 576) {
        n = 1;
    } else if(w < 768) {
        n = 2;
    } else if(w < 992) {
        n = 3;
    } else {
        n = 4
    }
    if(postnum % n) {
        $(".h-col-" + (n-((postnum - 1) % n))).css("display", "none");
    } else {
        $(".h-col").css("display", "none");
    }
}

$(window).resize(calcBuffer);

$("#order-newest").click(function () { 
    $("#post-container").removeClass("reverse-chron");
});

$("#order-oldest").click(function () { 
    $("#post-container").addClass("reverse-chron");
});

function studycard(item) {
    let cardDiv = $(`<div></div>`).addClass("card v-card card-hidden");
            let cSlide = $(`<div></div>`).addClass("carousel slide card-img-top").attr("id", "studyC");
            cardDiv.append(cSlide);
            let carouselI = $(`<div></div>`).addClass("carousel-indicators");
            let carouselInner = $(`<div></div>`).addClass("carousel-inner");
            cSlide.append(carouselI, carouselInner);
            for(let i = 0; i < 5; i++) {
                carouselI.append($(`<button></button>`).attr({
                    "type": "button",
                    "data-bs-target": "#studyC",
                    "data-bs-slide-to": i,
                    "aria-label": "Slide " + (i + 1)
                }));
                let ci = $('<div></div>').addClass("carousel-item");
                if(i == 0) {
                    ci.append($(`<iframe src="https://www.youtube-nocookie.com/embed/XWoO_gGlrFg?si=ZkEd7OYyCX6JVaCA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`).addClass("d-block w-100 card-img-top"));
                } else {
                    ci.append($("<img>").attr("src", "../images/youtube/9/" + i + ".png").addClass("d-block w-100 card-img-top"));
                }
                carouselInner.append(ci);
            }
            carouselI.children().first().addClass("active").attr("aria-current", "true");
            carouselInner.children().first().addClass("active");
            cSlide.append($("<button></button>").addClass("carousel-control-prev").attr({
                "type": "button",
                "data-bs-target": "#studyC",
                "data-bs-slide": "prev"
            }).append($("<span></span>").addClass("carousel-control-prev-icon").attr("aria-hidden", "true"), 
            $("<span></span>").addClass("visually-hidden").append("Previous")),
                $("<button></button>").addClass("carousel-control-next").attr({
                "type": "button",
                "data-bs-target": "#studyC",
                "data-bs-slide": "next"
            }).append($("<span></span>").addClass("carousel-control-next-icon").attr("aria-hidden", "true"), 
            $("<span></span>").addClass("visually-hidden").append("Next")));
    let cfoot = $("<div></div>").addClass("card-footer posted-date").append(item.pDate.toLocaleDateString());
    let ctitle = $("<h6></h6>").addClass("card-header card-title text-center").append(item.title);
    let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").append(item.desc.replaceAll(/\\n/g, "<br>").replaceAll(/\\"/g, '"')));
    cbody.click(expandCard);
    let foot = $("<div></div>").addClass("card-footer read-more").append("read more");
    foot.click(expandCard);
    cardDiv.append(ctitle, cfoot, cbody, foot);        
    let wrapper = $("<div></div>").addClass("col").append(cardDiv);
    return wrapper;
}

function youtubeCard(item) {
    let cardDiv = $(`<div></div>`).addClass("card v-card card-hidden");
    cardDiv.append($(`<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/cpGbVhvVH5w?si=4DEpcd6VOd11xtgT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`).addClass("d-block w-100 card-img-top"));
    let cfoot = $("<div></div>").addClass("card-footer posted-date").append(item.pDate.toLocaleDateString());
    let ctitle = $("<h6></h6>").addClass("card-header card-title text-center").append(item.title);
    let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").append(item.desc.replaceAll(/\\n/g, "<br>").replaceAll(/\\"/g, '"')));
    cbody.click(expandCard);
    let foot = $("<div></div>").addClass("card-footer read-more").append("read more");
    foot.click(expandCard);
    cardDiv.append(ctitle, cfoot, cbody, foot);        
    let wrapper = $("<div></div>").addClass("col").append(cardDiv);
    return wrapper;
}

});