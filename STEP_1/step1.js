
        // let menuIcon = document.querySelector('.menuIcon');
        // let nav = document.querySelector('.overlay-menu');

        // menuIcon.addEventListener('click', () => {
        //     if (nav.style.transform != 'translateX(0%)') {
        //         nav.style.transform = 'translateX(0%)';
        //         nav.style.transition = 'transform 0.2s ease-out';
        //     } else { 
        //         nav.style.transform = 'translateX(-100%)';
        //         nav.style.transition = 'transform 0.2s ease-out';
        //     }
        // });


        // // Toggle Menu Icon ========================================
        // let toggleIcon = document.querySelector('.menuIcon');

        // toggleIcon.addEventListener('click', () => {
        //     if (toggleIcon.className != 'menuIcon toggle') {
        //         toggleIcon.className += ' toggle';
        //     } else {
        //         toggleIcon.className = 'menuIcon';
        //     }
        // });

var mobileFooterHide = function(id){
    $(document).ready(function(){
        $("#"+id).click(function(){
            var mq = window.matchMedia( "(min-width: 650px)" );
                    if (mq.matches) {
                    return;
                }
                if($("ul#"+id+" div").hasClass('disappear-phone')) {
                    $("ul#"+id+" div").removeClass("disappear-phone");
                    $("ul#"+id+" i").removeClass("fa-chevron-down");
                    $("ul#"+id+" i").addClass("fa-chevron-up");
                } else {
                    $("ul#"+id+" div").addClass("disappear-phone");
                    $("ul#"+id+" i").removeClass("fa-chevron-up");
                    $("ul#"+id+" i").addClass("fa-chevron-down");
                }                 
        });
    });
}


mobileFooterHide("citi-consumer-business");

mobileFooterHide("citi-institutional-business");

mobileFooterHide("citi-media");

mobileFooterHide("citi-relations");

mobileFooterHide("citi-about");

mobileFooterHide("citi-progress");