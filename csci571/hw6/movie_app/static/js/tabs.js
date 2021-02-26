// var tabButtons = document.querySelectorAll(".buttonContainer button");
// var tabPanels = document.querySelectorAll(".tabPanel"); 

// function showPanel(panelIndex) {
//     tabPanels.forEach(function (node) {
//         node.style.display = "none";
//     });
//     tabPanels[panelIndex].style.display = "block";
// }

// by default show first panel on loading the webpage
// showPanel(0);

function showTabs() {
    document.querySelectorAll(".tabs__button").forEach(button => {
        button.addEventListener("click", () => {
            const sideBar = button.parentElement;
            const tabsContainer = sideBar.parentElement;
            const tabNumber = button.dataset.forTab;
            const tabToActivate = tabsContainer.querySelector(`.tabs__content[data-tab="${tabNumber}"]`);

            console.log(sideBar);
            console.log(tabsContainer);
            console.log(tabNumber);
            console.log(tabToActivate);

            sideBar.querySelectorAll(".tabs__button").forEach(button => {
                button.classList.remove("tabs__button--active");
            });

            tabsContainer.querySelectorAll(".tabs__content").forEach(tab => {
                tab.classList.remove("tabs__content--active");
            });

            button.classList.add("tabs__button--active");
            tabToActivate.classList.add("tabs__content--active");

        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    showTabs();

    document.querySelectorAll(".tabs").forEach(tabsContainer => {
        tabsContainer.querySelector(".tabs__sidebar .tabs__button").click();
    })

});
