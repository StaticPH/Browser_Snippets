/* Remove both attributes and classes likely used to prevent selecting page content */
document.querySelectorAll('[unselectable]').forEach(ele => ele.removeAttribute('unselectable'));
document.querySelectorAll('.unselectable').forEach(ele => ele.classList.remove('unselectable'));

/* Remove any document-scope event handlers likely to be used to prevent selecting page content */
document.ondragstart = document.oncontextmenu = document.body.onselectstart = document.onclick = document.body.onmousedown = document.onmousedown = document.onkeydown = document.onselectstart = null;
/* Remove any window-scope event handlers likely to be used to prevent selecting page content */
window.onload = null;

/* Undefine the names of known methods used to block the selection of some part of the page content */
wccp_pro_is_passive = disableSelection = disable_copy_ie = disableEnterKey = disable_copy = wccp_free_iscontenteditable = undefined;
nocontext = undefined; // Consider also onlongtouch, touchend, touchstart, elemtype, timer, touchduration

/* Remove known DOM elements associated with some method for preventing selection of page content */
document.querySelectorAll('#wpcp_disable_selection , #wpcp_disable_Right_Click , #wpcp_css_disable_selection').forEach(ele => ele.remove());

/* Specify that the document body should allow text selection */
document.head.insertAdjacentHTML('beforeend','<style>body{ user-select:text; }</style>');
