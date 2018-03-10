
var originals = [ "Steph Curry" , "Michael Jordan" , "Klay Thompson" , "Draymond Green" , "Kevin Durant" , "Russell Westbrook"]

// clears the previous buttons, then creates an individual button for each of the indexes of the originals array (which can be added to)
        const ogButtons = () => {
            $("#buttonHolder").empty()
            for ( let i = 0 ; i < originals.length ; i++ ) {
                $("#buttonHolder").append(`<button class = "btn btn-md mt-2 mx-2 gifButtons">${originals[i]}</button> \n`)
            }}

// takes user input from the gifHere text form and adds it to the array of buttons, then calls the button making function. prevents a button from being created on empty string
        $("#addGif").on("click" , function(event) {
            event.preventDefault()
            var addGif = $("#gifHere").val()
            if ( addGif === "" ) {
                alert("You didn't write anything bozo!")
            } else {
                originals.push(addGif)
                ogButtons()
            }
                $("#gifHere").val("")
        })

// when any of the query gif buttons are clicked, generate 25 gifs related to that query
        $("#buttonHolder").on("click" , ".gifButtons" , function(event) {
            event.preventDefault()
            $("#gifDump").empty()
            var queryGif = $(this).text()
            var queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=zi9M3A782sRljdHyAC5XeD6Uzdb5jEtl&q=${queryGif}&limit=25&offset=0&rating=R&lang=en`
            $.ajax({
                url : queryUrl ,
                method : "GET" 
            }).then( function (result) {
                for ( let i = 0 ; i < result.data.length ; i++ ) {
                    $("#gifDump").append(`<li class = "list" ><img src = "${result.data[i].images.original_still.url}" 
                            data-still = "${result.data[i].images.original_still.url}" 
                            data-animate = "${result.data[i].images.original.url}" 
                            data-state = "still" height = "450px" width = "450px" class = "gif"><p class = "rating" >Rating : ${result.data[i].rating} </p></li>`)
                }
            })
        })

// when any of the gifs are clicked on, swap its state between still/animated
        $("#gifDump").on("click" , ".gif" , function() {
            const state = $(this).attr("data-state")
            if ( state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
        
        ogButtons()
