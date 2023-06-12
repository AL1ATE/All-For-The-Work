$(document).ready(function() {
    $("#enToRuBtn, #ruToEnBtn").click(function() {
    $(this).addClass("active").siblings().removeClass("active");
    });
    $("form").submit(function(event) {
        event.preventDefault();

        let textToTranslate = $("#inputText").val().trim();
        let translationOutput = $("#translationOutput");

        if (textToTranslate.length === 0) {
            alert("Пожалуйста введите текст!");
            return;
        }

        let direction = $(".language-selector .active").attr("id");
        let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${direction === "enToRuBtn" ? "en" : "ru"}&tl=${direction === "enToRuBtn" ? "ru" : "en"}&dt=t&q=${textToTranslate}`;

        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function(data) {
                let translation = "";

                for (let i = 0; i < data[0].length; i++) {
                    translation += data[0][i][0];
                }

                translationOutput.text(translation);
            },
            error: function(error) {
                console.log("Error: " + error.status);
            }
        });
    });
});

function autoExpand(textarea) {
    // Reset height to auto to allow for text resizing
    textarea.style.height = "auto";
    
    // Calculate the height required for the content
    var height = textarea.scrollHeight;
    
    // If the calculated height is less than the minimum height, set the height to the minimum height
    if (height < parseInt(textarea.style.minHeight)) {
      height = parseInt(textarea.style.minHeight);
    }
    
    // If the calculated height is greater than the maximum height, set the height to the maximum height
    if (height > parseInt(textarea.style.maxHeight)) {
      height = parseInt(textarea.style.maxHeight);
    }
    
    // Set the textarea height to the calculated height
    textarea.style.height = height + "px";
  }