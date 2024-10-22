// scripts/custom.js

$(document).ready(function(){
    // Ensure that Cytoscape has been initialized
    if (typeof window.cy === 'undefined') {
        console.error('Cytoscape instance "cy" is not defined.');
        return;
    }

    var cy = window.cy; // Access the global Cytoscape instance

    // Get references to the search input and buttons
    var searchInput = document.getElementById('search-input');
    var searchButton = document.getElementById('search-button');
    var clearButton = document.getElementById('clear-button'); // If you added a clear button

    // Search Button Event Listener
    searchButton.addEventListener('click', function() {
        var query = searchInput.value.trim().toLowerCase();
        if (query === "") {
            cy.elements().removeClass('highlighted');
            return;
        }

        // Remove previous highlights
        cy.elements().removeClass('highlighted');

        // Find the node(s) with the matching 'shared_name'
        var targetNodes = cy.nodes().filter(function(ele){
            return ele.data('shared_name') && ele.data('shared_name').toLowerCase() === query;
        });

        if (targetNodes.length > 0) {
            // Highlight the node(s)
            targetNodes.addClass('highlighted');
            // Center the view on the node(s)
            cy.animate({
                fit: {
                    eles: targetNodes,
                    padding: 50
                },
                duration: 1000
            });
        } else {
            alert('No node found with the shared name: ' + searchInput.value);
        }
    });

    // Allow pressing 'Enter' to trigger search
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // Clear Button Event Listener (Optional)
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            searchInput.value = "";
            cy.elements().removeClass('highlighted');
        });
    }
});
