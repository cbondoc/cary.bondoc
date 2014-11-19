$(document).ready(function() {

    //textillate and boun.cejs code
    $('.tlt').textillate({
        in: {effect: 'splat'},
        out: {effect: 'foldUnfold', sync: true},
        loop: true
    });


    $("#google_map").hide();


    $('#fullpage').fullpage({
        verticalCentered: true,
        resize: true,
        sectionsColor: [''],
        anchors: ['who-am-i', 'what-i-did', 'google-map', 'contact-me'],
        scrollingSpeed: 700,
        easing: 'easeInBack',
        menu: '#menu',
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: [''],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        autoScrolling: true,
        scrollOverflow: true,
        css3: false,
        paddingTop: '',
        paddingBottom: '',
        normalScrollElements: '',
        normalScrollElementTouchThreshold: 5,
        keyboardScrolling: true,
        touchSensitivity: 15,
        continuousVertical: true,
        animateAnchor: true,
        sectionSelector: '.section',
        slideSelector: '.slide',
        //events
        onLeave: function(index, nextIndex, direction) {


            if (index === 1) {
                setTimeout(function() {
                    $("#google_map").hide();
                }, 650);
            }
            
            if (nextIndex === 1) {
                setTimeout(function() {
                    $("#google_map").hide();
                }, 650);
            }
            
            if (nextIndex === 2) {
                setTimeout(function() {
                    $("#google_map").hide();
                }, 650);
            }
            
            if (nextIndex === 3) {
                setTimeout(function() {
                    $("#google_map").show();
                }, 650);
            }
            
            if (nextIndex === 4) {
                setTimeout(function() {
                    $("#google_map").hide();
                }, 650);
            }

        },
        afterLoad: function(anchorLink, index) {


        },
        afterRender: function() {


        },
        afterResize: function() {
        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {

        },
        onSlideLeave: function(anchorLink, index, slideIndex, direction) {
        }
    });



});


