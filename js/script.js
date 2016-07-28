$(document).ready(function () {

    // Select all elements with data-toggle="tooltips" in the document
    $('[data-toggle="tooltip"]').tooltip();

    var content = $('#content');
    centerInputGroup();

    $('#searchBox').keypress(function (e) {
        if (e.which == 13) {
            $('#btnSearch').trigger('click');
        }
    });

    $('#btnSearch').click(function () {
        var input = $('#searchBox').val();

        content.html('');
        if (input != null && input != "") {
            var url = "https://en.wikipedia.org/w/api.php?action=query&generator=allpages&gaplimit=11&gapfilterredir=nonredirects&gapfrom=" + input + "&format=json&callback=?";

            $.getJSON(url, function (data) {
                $.each(data.query.pages, function (i, item) {

                    var url2 = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=2&exintro=&explaintext=&titles=' + this.title + "&format=json&callback=?";
                    var desc;
                    $.getJSON(url2, function (innerData) {
                        desc = innerData.query.pages[item.pageid].extract;

                        var row = '<a href="https://en.wikipedia.org/?curid=' + item.pageid +
                        '" target="_blank" class="list-group-item"><h4 class="list-group-item-heading">' + item.title +
                        '</h4><p class="list-group-item-text">' + desc + '</p></a>';
                        content.append(row);
                    }); //json                 
                }); //loop
            }); //json

            pullTopInputGroup();
        } else
            centerInputGroup();
    }); //click

    var doit;
    window.onresize = function () {
        clearTimeout(doit);
        doit = setTimeout(centerInputGroup, 300);
    };


    function centerInputGroup() {
        if (content.is(':empty')) {
            center = $(window).height() / 2.5 - $('.form-group').height() / 2;

            $('.form-group').animate({
                top: center
            }, 500);
        }
    }
    function pullTopInputGroup() {
        $('.form-group').animate({
            top: 0
        }, 500);
    }
});

