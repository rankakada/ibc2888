import {translation} from './modules/translation.js';

$(document).ready(function() {
    translation();
    // URL Parameter Handling
    const urlParams = new URLSearchParams(window.location.search);
    const fid = urlParams.get('fid');
    if (fid) localStorage.setItem('fid', fid);
});
