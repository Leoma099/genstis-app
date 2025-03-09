function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var container = document.querySelector('.content-area');

    console.log('Sidebar before toggle:', sidebar.classList);

    if (sidebar.classList.contains('closed')) {
        sidebar.classList.remove('closed');
        container.style.marginLeft = '230px'; // Open the sidebar
    } else {
        sidebar.classList.add('closed');
        container.style.marginLeft = '0'; // Close the sidebar
    }

    console.log('Sidebar after toggle:', sidebar.classList);
}
