// import { is_cached } from './utils'
(() => {
    // Lazy images
    const images = document.querySelectorAll(".img-lazy");

    const lazyLoad = (target) => {
        const io = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    // console.log(entry);
                    if (entry.isIntersecting) {
                        const img = entry.target.querySelector("img");
                        const placeholder =
                            entry.target.querySelector(".placeholder");
                        img.onload = () => {
                            img.style.opacity = 1;
                            placeholder.style.opacity = 0;
                        };

                        const sources = [
                            ...Array.from(entry.target.querySelectorAll("[data-src]")),
                            ...Array.from(
                                entry.target.querySelectorAll("[data-srcset]")
                            ),
                        ];
                        sources.forEach((s) => {
                            if (s.src || s.srcset) return;
                            if (s.dataset.srcset) {
                                s.srcset = s.dataset.srcset;
                            }
                            if (s.dataset.src) {
                                s.src = s.dataset.src;
                            }
                        });

                        observer.disconnect();
                    }
                });
            },
            {
                rootMargin: "100%",
            }
        );

        io.observe(target);
    };

    images.forEach(lazyLoad);
})();

const headerComp = () => {
    const header = document.querySelector(".header");
    const headerImages = Array.from(header.querySelectorAll("img"));

    const imagesresolved = Promise.all(
        headerImages.map(
            (image) =>
                new Promise((res, rej) => {
                    image.onload = () => {
                        res();
                    };
                })
        )
    );

    imagesresolved.then(() => {
        header.classList.add("animated-in");
    });

    headerImages.forEach((img, index) => {
        img.src = img.dataset.src;
        img.srcset = img.dataset.srcset;
    });
};

headerComp();
