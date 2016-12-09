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
            var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + input + "&srprop=snippet&callback=?";

            $.getJSON(url, function (data) {
                if (data.query.search.length > 0)
                {
                    $.each(data.query.search, function (i, item) {
                        var desc = item.snippet;

                        var row = '<a href="https://en.wikipedia.org/wiki/' + item.title +
                            '" target="_blank" class="list-group-item"><h4 class="list-group-item-heading">' + item.title +
                            '</h4><p class="list-group-item-text">' + desc + '</p></a>';
                        content.append(row);
                    }); //loop
                }
                else
                {
                    alert("No results for this query!")
                }
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

