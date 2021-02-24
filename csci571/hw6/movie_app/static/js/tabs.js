var tabButtons = document.querySelectorAll(".buttonContainer button");
var tabPanels = document.querySelectorAll(".tabPanel"); 

function showPanel(panelIndex) {
    tabPanels.forEach(function (node) {
        node.style.display = "none";
    });
    tabPanels[panelIndex].style.display = "block";

    // tabPanels[panelIndex].style.display = "flex";
    // tabPanels[panelIndex].style.flex = "1";


}

// by default show first panel on loading the webpage
showPanel(0);