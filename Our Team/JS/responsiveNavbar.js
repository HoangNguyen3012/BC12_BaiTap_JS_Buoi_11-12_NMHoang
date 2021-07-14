const getEle = function(id) {
    return document.getElementById(id);
};
const addClassToID = function(id, className) {
    document.getElementById(id).classList.add(className);
};
const removeClassFromID = function(id, className) {
    document.getElementById(id).classList.remove(className);
};
const addMarginToTag = function(tagID, margin) {
    for (var i = 0; i < document.getElementsByTagName(tagID).length; i++) {
        document.getElementsByTagName(tagID)[i].style.marginLeft = margin;
    };
};
const removeMarginFromTag = function(tagID, margin) {
    for (var i = 0; i < document.getElementsByTagName(tagID).length; i++) {
        document.getElementsByTagName(tagID)[i].style.marginLeft = margin;
    };
};
const hideSideBar = function() {
    removeMarginFromTag('header',"inherit");
    removeMarginFromTag('section',"inherit");
    removeMarginFromTag('footer',"inherit");
    removeMarginFromTag('footer',"inherit");
    getEle('navbarSupportedContent').style.left = '-200px';
    getEle('btnShowSideBar').style.display = 'block';
    getEle('btnHideSideBar').style.display = 'none';
    getEle('logo__small').style.display = 'block';
    getEle('logo__big').style.display = 'none';
};

window.onscroll = function () { scrollToShowNavbar() };

function scrollToShowNavbar() {
    if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
        addClassToID("navbarMain", "navbar__onscroll");
        addClassToID("navbarContainer", "fixed-top");
        getEle('logo__small').style.display = 'none';
        // getEle("navbarContainer").style.maxWidth = "100%";
        // alert('200');
    }

    else {
        removeClassFromID("navbarMain", "navbar__onscroll");
        removeClassFromID("navbarContainer", "fixed-top");
        getEle('logo__small').style.display = 'block';
        // alert('Nthi')
    };
};
getEle('btnShowSideBar').addEventListener('click', function() {
    addMarginToTag('header',"200px");
    addMarginToTag('section',"200px");
    addMarginToTag('footer',"200px");
    getEle('navbarSupportedContent').style.left = '0px';
    getEle('btnHideSideBar').style.display = 'block';
    this.style.display = 'none';
    getEle('logo__small').style.display = 'none';
    getEle('logo__big').style.display = 'block';
});

getEle('btnHideSideBar').addEventListener('click', hideSideBar);

window.onresize = function() {
    if(window.innerWidth >= 1200) {
        hideSideBar();
    };
    // console.log(window.innerWidth);
};
