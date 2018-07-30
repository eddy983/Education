/* Next quick report page */
function showNextForm() {
  $("#First-Div").css("display", "none");
  $("#Second-Div").css("display", "block");
};

/* Back to the top */
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/* Tabs */
$(".tab_content").hide();
$(".tab_content:first").show();

/* if in tab mode */
$("ul.tabs li").click(function() {
  $(".tab_content").hide();
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).fadeIn();

  $("ul.tabs li").removeClass("active");
  $(this).addClass("active");

  $(".tab_drawer_heading").removeClass("d_active");
  $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");
});
/* if in drawer mode */
$(".tab_drawer_heading").click(function() {
  $(".tab_content").hide();
  var d_activeTab = $(this).attr("rel");
  $("#" + d_activeTab).fadeIn();

  $(".tab_drawer_heading").removeClass("d_active");
  $(this).addClass("d_active");

  $("ul.tabs li").removeClass("active");
  $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});

/* Extra class "tab_last" 
	   to add border to right side
	   of last tab */
$("ul.tabs li")
  .last()
  .addClass("tab_last");

/* Pagination Js */

// Add active class to the current button (highlight it)
var header = document.getElementById("myDIV");
var btns = header.getElementsByClassName("btns");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("actives");
    current[0].className = current[0].className.replace(" actives", "");
    this.className += " actives";
  });
}

/* Search */
//this is only for demonstration of different fly-in directions

var changeClass = function(name) {
  $("#search")
    .removeAttr("class")
    .addClass(name);
};

/* Dropdowns */
var elements = $(document).find("select.quick-report__dropdowns--drop-down");
for (var i = 0, l = elements.length; i < l; i++) {
  var $select = $(elements[i]),
    $label = $select.parents(".quick-report__dropdowns--drop").find("label");

  $select.select2({
    allowClear: false,
    placeholder: $select.data("placeholder"),
    minimumResultsForSearch: 0,
    theme: "bootstrap",
    width: "100%" // https://github.com/select2/select2/issues/3278
  });

  // Trigger focus
  $label.on("click", function(e) {
    $(this)
      .parents(".quick-report__dropdowns--drop")
      .find("select")
      .trigger("focus")
      .select2("focus");
  });

  // Trigger search
  $select.on("keydown", function(e) {
    var $select = $(this),
      $select2 = $select.data("select2"),
      $container = $select2.$container;

    // Unprintable keys
    if (
      typeof e.which === "undefined" ||
      $.inArray(e.which, [
        0,
        8,
        9,
        12,
        16,
        17,
        18,
        19,
        20,
        27,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        44,
        45,
        46,
        91,
        92,
        93,
        112,
        113,
        114,
        115,
        116,
        117,
        118,
        119,
        120,
        121,
        123,
        124,
        144,
        145,
        224,
        225,
        57392,
        63289
      ]) >= 0
    ) {
      return true;
    }

    // Opened dropdown
    if ($container.hasClass("select2-container--open")) {
      return true;
    }

    $select.select2("open");

    // Default search value
    var $search = $select2.dropdown.$search || $select2.selection.$search,
      query =
        $.inArray(e.which, [13, 40, 108]) < 0
          ? String.fromCharCode(e.which)
          : "";
    if (query !== "") {
      $search.val(query).trigger("keyup");
    }
  });

  // Format, placeholder
  $select.on("select2:open", function(e) {
    var $select = $(this),
      $select2 = $select.data("select2"),
      $dropdown = $select2.dropdown.$dropdown || $select2.selection.$dropdown,
      $search = $select2.dropdown.$search || $select2.selection.$search,
      data = $select.select2("data");

    // Above dropdown
    if ($dropdown.hasClass("select2-dropdown--above")) {
      $dropdown.append($search.parents(".select2-search--dropdown").detach());
    }

    // Placeholder
    $search.attr(
      "placeholder",
      data[0].text !== "" ? data[0].text : $select.data("placeholder")
    );
  });
}
