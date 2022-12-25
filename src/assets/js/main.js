let s,
    App = {
        selector: 'body',
        settings: {
            productSlider: document.querySelector("#productSlider")
        },
        init: function () {
            s = this.settings;
            this.swiper();
            const colorSelector = document.querySelectorAll(".product--color-selector");
            colorSelector.forEach((colorSelectorItem)=>{
                colorSelectorItem.querySelectorAll("label").forEach((item)=>{
                    item.addEventListener("click", function (){
                        let labelEl = this.parentElement.querySelectorAll("label");
                        labelEl.forEach((labelElItem) =>{
                            labelElItem.classList.remove("selected")
                        })
                        this.classList.add("selected")
                    })
                })
            })
        },
        swiper: function () {
            const swiper = new Swiper(s.productSlider, {
                slidesPerView: "auto",
                spaceBetween: 32,
                breakpoints: {
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 32,
                    },
                    320: {
                        slidesPerView: "auto",
                        spaceBetween: 12,
                    }
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
            return swiper;
        }
    }

document.addEventListener("DOMContentLoaded", function () {
    App.init();
});
