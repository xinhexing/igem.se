// Reload reset page position

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', function() {

    function loadJSON(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error loading JSON:', error));
    }

    function createElementsFromTeamData(data) {

        const divCurrentTeamCard = document.getElementById('current-team-card');
        const divPastTeamCards = document.getElementById('past-team-cards');
        const divGalleryCarousel = document.getElementById('gallery-carousel');
        const divTeamLogoCarousel = document.getElementById('team-logo-carousel');

        data.forEach(function(teamDict, index) {
            
            // Team card
            const divCard = document.createElement('div');
            divCard.id = teamDict.year;
            divCard.className = 'team-card';
            divCard.style.backgroundColor = teamDict.card_color || '#ffffff';
            divCard.style.color = teamDict.text_color || '#000000';
            if (index == 0) {divCurrentTeamCard.appendChild(divCard);
            } else {divPastTeamCards.appendChild(divCard);}
            
            const divTop = document.createElement('div');
            divTop.className = 'row center';
            divCard.appendChild(divTop);

            // Logo
            const logoImg = document.createElement('img')
            logoImg.id = 'logo';
            logoImg.className = 'center';
            logoImg.src = teamDict.project_logo_img || 'images/igem_official_black_full.png';
            logoImg.alt = teamDict.title + ' logo';
            divTop.appendChild(logoImg);
            
            const divTopRight = document.createElement('div');
            divTopRight.className = 'center'
            divTop.appendChild(divTopRight)
            
            // Title
            const title = document.createElement('h2')
            title.id = 'title';
            title.textContent = teamDict.year + ": " + teamDict.title || 'TBD';
            divTopRight.appendChild(title);
            
            // Wiki
            const wikiLink = document.createElement('a');
            wikiLink.id = 'wiki';
            wikiLink.className = 'center';
            wikiLink.href = teamDict.wiki || '';
            wikiLink.target = '_blank';
            divTopRight.appendChild(wikiLink);
            const wikiButton = document.createElement('button');
            wikiButton.textContent = 'Wiki';
            wikiButton.style.backgroundColor = teamDict.wiki_bg_color || '#000000'
            wikiButton.style.color = teamDict.wiki_text_color || '#ffffff';
            wikiLink.appendChild(wikiButton)
            
            // Description
            const description = document.createElement('p');
            description.id = 'description';
            description.textContent = teamDict.description;
            divCard.appendChild(description)
            
            // Awards
            if ('awards' in teamDict) {
                const divAwards = document.createElement('div');
                divAwards.id = 'awards';
                divCard.appendChild(divAwards);
                const titleAwards = document.createElement('h3');
                titleAwards.textContent = 'Awards';
                divAwards.appendChild(titleAwards)
                const divAwardsList = document.createElement('div');
                divAwardsList.className = 'row wrap';
                divAwards.appendChild(divAwardsList)
                teamDict.awards.forEach(award => {
                    const p = document.createElement('p');
                    p.textContent = award;
                    divAwardsList.appendChild(p)
                });
            }

            // Nominations
            if ('nominations' in teamDict) {
                const divNominations = document.createElement('div');
                divNominations.id = 'nominations';
                divCard.appendChild(divNominations);
                const titleNominations = document.createElement('h3');
                titleNominations.textContent = 'Nominations';
                divNominations.appendChild(titleNominations)
                const divNominationsList = document.createElement('div');
                divNominationsList.className = 'row wrap';
                divNominations.appendChild(divNominationsList)
                teamDict.nominations.forEach(award => {
                    const p = document.createElement('p');
                    p.textContent = award;
                    divNominationsList.appendChild(p)
                });
            }
            
            // Members
            if ('members' in teamDict) {
                const divMembers = document.createElement('div');
                divMembers.id = 'members';
                divCard.appendChild(divMembers);
                const titleMembers = document.createElement('h3');
                titleMembers.textContent = 'Members';
                divMembers.appendChild(titleMembers)
                const divMembersList = document.createElement('div');
                divMembersList.className = 'row wrap';
                divMembers.appendChild(divMembersList)
                teamDict.members.forEach(member => {
                    const p = document.createElement('p');
                    p.textContent = member;
                    divMembersList.appendChild(p)
                });
            }

            // Team image
            if ('team_img' in teamDict) {
                const divTeamImg = document.createElement('div');
                divTeamImg.className = 'carousel-cell';
                divGalleryCarousel.appendChild(divTeamImg);
                const teamImg = document.createElement('img');
                teamImg.src = teamDict.team_img;
                teamImg.alt = 'iGEM Stockholm ' + teamDict.year + ' team image';
                divTeamImg.appendChild(teamImg);
                const caption = document.createElement('p');
                caption.className = 'caption';
                caption.textContent = 'iGEM Stockholm ' + teamDict.year;
                divTeamImg.appendChild(caption);
            }

            // Team logo
            if ('team_logo_img' in teamDict) {
                const divTeamLogo = document.createElement('div');
                divTeamLogo.className = 'carousel-cell';
                divTeamLogoCarousel.appendChild(divTeamLogo);
                const teamLogoImg = document.createElement('img');
                teamLogoImg.src = teamDict.team_logo_img;
                teamLogoImg.alt = 'iGEM Stockholm ' + teamDict.year + ' logo';
                divTeamLogo.appendChild(teamLogoImg);
            }
        }); 

        new Flickity(divGalleryCarousel, {
            wrapAround: true,
            autoPlay: true,
        });
        
        new Flickity(divTeamLogoCarousel, {
            fade: true,
            autoPlay: 2000,
            prevNextButtons: false,
            pageDots: false,
            draggable: false,
        });
    }

    loadJSON('teams.json', createElementsFromTeamData);


});


// Countdown

function countdown(elementId, date) {
    const element = document.getElementById(elementId);
    const second = 1000, minute = second * 60, hour = minute * 60, day = hour * 24;
    const target = new Date(date).getTime()
    var interval = setInterval(function() {
        const now = new Date().getTime(), distance = target - now;
        if(distance < 0) {clearInterval(interval); return;}
        element.getElementsByClassName('days')[0].innerText = Math.floor(distance / (day)),
        element.getElementsByClassName('hours')[0].innerText = Math.floor((distance % (day)) / (hour)),
        element.getElementsByClassName('minutes')[0].innerText = Math.floor((distance % (hour)) / (minute)),
        element.getElementsByClassName('seconds')[0].innerText = Math.floor((distance % (minute)) / second);
    }, 1000);
}


// Section scroll

function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const sectionLinks = document.querySelectorAll('.section-link');
    const topMargin = -vh(30);
    function highlightSectionLink() {
        let fromTop = window.scrollY + topMargin;
        sections.forEach(section => {
            if (section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop) {
                sectionLinks.forEach(link => {
                    link.classList.remove('section-highlight');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('section-highlight');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightSectionLink);
});


// Dropdown menu functionality

// Deselect all checkboxes when document loads
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {checkbox.checked = false;});
});

// Resize all dropdown menus when window size changes
window.addEventListener('resize', function () {
    const toggles = document.querySelectorAll('.dropdown-toggle');
    toggles.forEach(toggle => resizeMenu(findDropdownMenu(toggle), toggle.checked))
});

// Connect toggles to dropdown menu signals
document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.dropdown-toggle');
    toggles.forEach(function(toggle) {
        toggle.addEventListener('change', function () {        
            const menu = findDropdownMenu(toggle)
            resizeMenu(menu, toggle.checked)
        });
    });
});

function resizeMenu(menu, value) {
    var height = menu.scrollHeight;
    var duration = calculateTransitionDuration(height);
    menu.style.transition = `max-height ${duration}s`;
    if (value)  {menu.style.maxHeight = height + 'px';}
    else        {menu.style.maxHeight = 0;}
}

function findDropdownMenu(element) {
    let sibling = element.nextElementSibling;
    while (sibling) {
        if (sibling.classList.contains('dropdown-menu')) {return sibling;}
        sibling = sibling.nextElementSibling;
    }
    return null;
}

function calculateTransitionDuration(height) {
    const baseDuration = 0.2;
    const factor = 0.0005;
    return baseDuration + (height * factor);
}


// Close top navigation menu when user clicks elsewhere

document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById("nav-top-menu");
    const checkbox = document.getElementById("nav-top-checkbox");
    document.addEventListener('click', function(event){ 
        if (menu.offsetHeight && !menu.contains(event.target)){
            checkbox.checked = false;
            resizeMenu(menu, false);
        }
    });
});