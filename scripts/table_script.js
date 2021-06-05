
// Next id for adding a new Song
var nextId = 1;
// ID of Song currently editing
var activeId = 0;

function generateSongInput() {
    var table = document.getElementById("songTable");
    var argslist = []
    var mp = ""
    var sg = ""
    for (var i = 1, row; row = table.rows[i]; i++) {
        mp = encodeURI(row.cells[1].innerHTML)
        sg = encodeURI(songs_dict_nice_id[row.cells[2].innerHTML])
        argslist.push(sg+"="+mp)
    }
    var linkToSheet = document.getElementById("linkToSheet");
    linkToSheet.setAttribute("href", "Folha.html?"+argslist.join("&"));
    linkToSheet.innerHTML = "Link to Sheet";

}

function songDisplay(ctl) {
  var row = $(ctl).parents("tr");
  var cols = row.children("td");

  activeId = $($(cols[0]).children("button")[0]).data("id");
  $("#SongSection").val($(cols[1]).text());
  $("#SearchSongInput").val($(cols[2]).text());

  // Change Update Button Text
  $("#updateButton").text("Update");
}

function songUpdate() {
  if ($("#updateButton").text() == "Update") {
    songUpdateInTable(activeId);
  }
  else {
    songAddToTable();
  }

  // Clear form fields
  formClear();

  // Focus to song name field
  $("#SearchSongInput").focus();
}

// Add song to <table>
function songAddToTable() {
  // First check if a <tbody> tag exists, add one if not
  if ($("#songTable tbody").length == 0) {
    $("#songTable").append("<tbody></tbody>");
  }

  // Append song to table
  $("#songTable tbody").append(
    songBuildTableRow(nextId));

  // Increment next ID to use
  nextId += 1;
}

// Update song in <table>
function songUpdateInTable(id) {
  // Find Song in <table>
  var row = $("#songTable button[data-id='" + id + "']")
            .parents("tr")[0];

  // Add changed song to table
  $(row).after(songBuildTableRow(id));
  // Remove original song
  $(row).remove();

  // Clear form fields
  formClear();

  // Change Update Button Text
  $("#updateButton").text("Add");
}

// Build a <table> row of Song data
function songBuildTableRow(id) {
  var ret =
  "<tr>" +
    "<td>" +
      "<button type='button' " +
              "onclick='songDisplay(this);' " +
              "class='btn btn-default' " +
              "data-id='" + id + "'>" +
              "<span class='glyphicon glyphicon-edit' />" +
      "</button>" +
    "</td>" +
    "<td>" + $("#SongSection").val() + "</td>" +
    "<td>" + $("#SearchSongInput").val() + "</td>" +
    "<td>" +
      "<button type='button' " +
              "onclick='songDelete(this);' " +
              "class='btn btn-default' " +
              "data-id='" + id + "'>" +
              "<span class='glyphicon glyphicon-remove' />" +
      "</button>" +
    "</td>" +
  "</tr>"

  return ret;
}

// Delete song from <table>
function songDelete(ctl) {
  $(ctl).parents("tr").remove();
}

    // Clear form fields
    function formClear() {
      $("#SearchSongInput").val("");
      $("#SongSection").val("");
      $("#url").val("");
    }