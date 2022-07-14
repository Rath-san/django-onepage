function Paginator(element, results, showAll = true) {
    let onSite = results;
    let startElement = 0;
    let endElement = onSite;
    let $rootDiv = element;
    let $products = $rootDiv.find(".product");
    let resultsNumber = Math.ceil($products.length / onSite);

    let showPage = function (showAll) {
        let line = $products.slice(startElement, endElement).show(200);

        for (var i = 0; i < line.length; i++) {
            const $img = $(line[i]).find("img")[1];


            if ($img.getAttribute("data-src")) {
                $img.setAttribute("src", $img.getAttribute("data-src"));
                $img.removeAttribute("data-src");
            }
        }

        $("html, body").animate({
            //scrollTop: $(window).scrollTop() + $($products[0]).height()
        });

        if (
            startElement > $products.length ||
            $rootDiv.find(".product:hidden").length == 0
        ) {
            $rootDiv.find(".load-more").hide();
            $rootDiv.find(".hide-products").show();
            return;
        }

        if (showAll) {
            startElement += onSite;
            endElement += $products.length;
        } else {
            startElement += onSite;
            endElement += onSite;
        }
    };

    let hidePage = function (showAll) {
        let line = $products.slice(startElement, endElement).hide(600);

        $("html, body").animate(
            {
                scrollTop:
                    $(line[0]).offset().top - $($products[0]).height() * 3,
            },
            200
        );

        if (
            startElement > $products.length ||
            $rootDiv.find(".product:hidden").length == 0
        ) {
            $rootDiv.find(".hide-products").hide();
            $rootDiv.find(".load-more").show();
            return;
        }

        if (showAll) {
            startElement = onSite;
            endElement = $products.length;
        } else {
            startElement -= onSite;
            endElement -= onSite;
        }
    };

    $rootDiv.find(".load-more").on("click", (e) => {
        e.preventDefault();
        showPage((showAll = showAll));
    });

    $rootDiv.find(".hide-products").on("click", (e) => {
        e.preventDefault();
        hidePage((showAll = showAll));
    });

    $rootDiv.find(".hide-products").hide();
    showPage(showAll);
}

export default Paginator;
