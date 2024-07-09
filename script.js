// Reload reset page position

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});


// Create team cards

document.addEventListener('DOMContentLoaded', function() {

    function loadJSON(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error loading JSON:', error));
    }

    function createElementsFromData(data) {
        data.forEach(function(teamDict, index) {
            
            // Team card
            const divCard = document.createElement('div');
            divCard.id = teamDict.year;
            divCard.className = 'team-card';
            if ('card_color' in teamDict) {divCard.style.backgroundColor = teamDict.card_color}
            if ('text_color' in teamDict) {divCard.style.color = teamDict.text_color}
            if (index == 0) {
                document.getElementById('current-team-card').appendChild(divCard);
            } else {
                document.getElementById('past-team-cards').appendChild(divCard);
            }
            
            const divTop = document.createElement('div');
            divTop.className = 'row center';
            divCard.appendChild(divTop);

            // Logo
            const logoImg = document.createElement('img')
            logoImg.id = 'logo';
            logoImg.className = 'center';
            logoImg.src = teamDict.img;
            logoImg.alt = teamDict.alt;
            divTop.appendChild(logoImg);
            
            const divTopRight = document.createElement('div');
            divTopRight.className = 'center'
            divTop.appendChild(divTopRight)
            
            // Title
            const title = document.createElement('h2')
            title.id = 'title';
            title.textContent = teamDict.year + ": " + teamDict.title;
            divTopRight.appendChild(title);
            
            // Wiki
            const wikiLink = document.createElement('a');
            wikiLink.id = 'wiki';
            wikiLink.className = 'center';
            wikiLink.href = teamDict.wiki;
            wikiLink.target = '_blank';
            divTopRight.appendChild(wikiLink);
            const wikiButton = document.createElement('button');
            wikiButton.textContent = 'Wiki';
            if ('wiki_bg_color' in teamDict) {wikiButton.style.backgroundColor = teamDict.wiki_bg_color}
            if ('wiki_text_color' in teamDict) {wikiButton.style.color = teamDict.wiki_text_color}
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
        });
    }

    loadJSON('teams.json', createElementsFromData);
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