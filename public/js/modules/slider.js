export const slider = () => {
    const mobileBanner = [
        {
            id: 1,
            image: "./public/assets/images/mobile-banner.png",
            alt: "Mobile Banner"
        },
        {
            id: 2,
            image: "./public/assets/images/mobile-banner.png",
            alt: "Mobile Banner"
        },
        {
            id: 3,
            image: "./public/assets/images/mobile-banner.png",
            alt: "Mobile Banner"
        }
    ];

    const desktopBanner = [
        {
            id: 1,
            image: "./public/assets/images/desktop-banner.png",
            alt: "Desktop Banner"
        },
        {
            id: 2,
            image: "./public/assets/images/desktop-banner.png",
            alt: "Desktop Banner"
        },
        {
            id: 3,
            image: "./public/assets/images/desktop-banner.png",
            alt: "Desktop Banner"
        }
    ];
    
    mobileBanner.forEach(function(item) {
        let slide = $('<div class="swiper-slide">');
        let img = $('<img>').attr('src', item.image).attr('alt', item.alt);
        slide.append(img);
        $('.mobileBanner .swiper-wrapper').append(slide);
    });

    desktopBanner.forEach(function(item){
        let slide = $('<div class="swiper-slide">');
        let img = $('<img>').attr('src', item.image).attr('alt', item.alt);
        slide.append(img);
        $('.desktopBanner .swiper-wrapper').append(slide);
    });
    
    let mobileSwiper = new Swiper('.mobileBanner', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    let desktopSwiper = new Swiper('.desktopBanner', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
}