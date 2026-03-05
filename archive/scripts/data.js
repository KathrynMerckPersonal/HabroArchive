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
    constructor(i, folder, desc, accessed, posted) {
        this.index = i;
        this.folder = folder;
        this.desc = desc;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
    }

    createCard(){
        const pattern = /mp4$/;
        const CId = "carousel" + this.folder;
        let cardDiv = $(`<div></div>`).addClass("card insta-card insta-card-hidden");
        
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
        let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").addClass("card-text").append(this.desc));
        cardDiv.append(cbody);        
        let wrapper = $("<div></div>").addClass("col").append(cardDiv);
        cbody.click(expandCard);
        let foot = $("<div></div>").addClass("card-footer read-more").append("read more");
        foot.click(expandCard);
        cardDiv.append(foot);
        return wrapper;
    }
}

class highlights {
    constructor(i, group, accessed, posted) {
        this.index = i;
        this.group = group;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
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
            console.log( "../images/stories/" + url);
        } else {
            cardDiv.append($("<img>").attr("src", "../images/stories/" + url).addClass("d-block w-100 card-img-top"));
            console.log( "../images/stories/" + url);

        }
        let ctitle = $("<h4></h4>").addClass("card-title text-center").append('"' + this.group + '"');
        let cbody = $("<div></div>").addClass("card-footer posted-date").append(this.pDate.toLocaleDateString());
        cardDiv.append(ctitle, cbody);        
        let wrapper = $("<div></div>").addClass("col").append(cardDiv);
        return wrapper;
    }
}

class pins {
    constructor(i, title, desc, accessed, posted) {
        this.index = i;
        this.title = title;
        this.desc = desc;
        this.accessed = accessed;
        this.posted = posted;
        this.pDate = new Date(posted);
        this.chron = this.pDate.valueOf();
    }

    createCard(){
        const pattern = /mp4$/;
        let cardDiv = $(`<div></div>`).addClass("card p-card p-card-hidden");
        let url = PinData[this.index-1];
        cardDiv.append($("<img>").attr("src", "../images/pins/" + url).addClass("d-block w-100 card-img-top"));
        console.log( "../images/pins/" + url);
        let ctitle = $("<h5></h5>").addClass("card-header card-title text-center").append(this.title);
        let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").append(this.desc));
        let cfoot = $("<div></div>").addClass("card-footer posted-date").append(this.pDate.toLocaleDateString());
        cardDiv.append(ctitle, cbody, cfoot);        
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
        const pattern = /mp4$/;
        let cardDiv = $(`<div></div>`).addClass("card p-card p-card-hidden");
        let url = PinData[this.index-1];
        cardDiv.append($("<img>").attr("src", "../images/pins/" + url).addClass("d-block w-100 card-img-top"));
        console.log( "../images/pins/" + url);
        let ctitle = $("<h5></h5>").addClass("card-header card-title text-center").append(this.title);
        let cbody = $("<div></div>").addClass("card-body").append($("<p></p>").append(this.desc));
        let cfoot = $("<div></div>").addClass("card-footer posted-date").append(this.pDate.toLocaleDateString());
        cardDiv.append(ctitle, cbody, cfoot);        
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
                const postItem = new iPost(Number(result.index), result.index, result.desc, result.accessed, result.posted);
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
                const hItem = new highlights(Number(result.index), result.group, result.accessed, result.date);
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
                const pinItem = new pins(Number(result.index), result.title, result.desc, result.accessed, result.date);
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


function expandCard () { 
    $(this).parent().toggleClass("insta-card-hidden");
    if($(this).parent().hasClass("insta-card-hidden")) {
        $(this).parent().css("max-height", "450px");
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
        console.log(n, postnum, (postnum - 1) % n);
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

});