window.addEventListener('load', () => {
    document.querySelector('.loading').classList.add('display-none');

    let moreContentButtons = document.querySelectorAll('.load-more-content-buttons');
    moreContentButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            btn.classList.toggle('half-radius');
            btn.nextElementSibling.classList.toggle('close');
        });
    });
    
    function loremIpsumContent() {
        let contentDivs = document.querySelectorAll('.content');
    
        contentDivs.forEach(div => {
            div.innerHTML = `
            Loading more content to test player viewability:
        
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
            `;
        });
    }
    
    loremIpsumContent();
});





/* Save for later



let moreContentButtons = document.querySelectorAll('.load-more-content-buttons');
moreContentButtons.forEach(btn => {
    btn.addEventListener('click', e => {
        //both buttons
        btn.classList.toggle('half-radius');
        btn.nextElementSibling.classList.toggle('close');

        /* //only for player guide button

        //html
        <section class="more-content-sections">
            <button class="load-more-content-buttons">Open player guide</button>
            <div class="content close">Content from other.js to reduce html file content. </div>
        </section>

        //css
        .half-radius {
            border-radius: 3px 3px 0 0;
        }

        //js
        if (btn.innerHTML.includes('player guide')) {
            if (btn.classList.contains('half-radius')) btn.innerHTML = 'Close player guide';
                else btn.innerHTML = 'Open player guide';
        }*\/
    });
});
*/
