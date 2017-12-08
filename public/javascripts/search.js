function submitSearch() {
    $.ajax({
        method: "POST",
        url: "/search/searchString",
        data: {
            searchString: $("#searchString").val,
            searchIn: $("#searchIn").val,
            language: $("#language").val
        }
    }).done(function(response) {

    });
}