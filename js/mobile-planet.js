document.getElementById('search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    //clear input feild
    searchInput.value = '';

    // if search feild is empty
    if (searchText == '') {
        const itemNotFound = document.getElementById('item-not-found');
        itemNotFound.style.display = 'none';
        const emptyField = document.getElementById('empty-feild');
        emptyField.style.display = 'block';
    }
    //load phone data
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showSearchResult(data.data));
    }

});

//show search result
const showSearchResult = phones => {

    //remove previous search result if it is exist
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    //remove previous detailed item if it is exist
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';

    // if item is missing
    if (phones.length == 0) {
        const emptyField = document.getElementById('empty-feild');
        emptyField.style.display = 'none';
        const itemNotFound = document.getElementById('item-not-found');
        itemNotFound.style.display = 'block';
    }

    //if item exist
    else {
        //removing not found message if it is exist
        document.getElementById('item-not-found').style.display = 'none';
        document.getElementById('empty-feild').style.display = 'none';


        const totalItem = phones.length;
        if (totalItem > 20) {
            phones = phones.slice(0, 20);
        }
        for (const phone of phones) {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card mx-3 text-center">
                <img  src="${phone.image}" class="card-img-top img-fluid w-75 mx-auto" alt="...">
                <div class="card-body">
                 <h5 class="card-title ">${phone.phone_name}</h5>
                     <p class="card-text ">${phone.brand}</p>
                 </div>
                 <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-primary w-50 mx-auto mb-3">Details</button>
            </div>`;
            searchResult.appendChild(div);
        }
    }
}

// load phone details
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetail(data.data));
};


// show phone details
const showPhoneDetail = details => {

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${details.image}" class="card-img-top w-50 img-fluid mx-auto my-3" alt="...">`;
    const div2 = document.createElement('div');
    div2.innerHTML = `
            <h5 class="card-title my-0">${details.name}</h5>
    `;
    if (details.releaseDate.length != 0) {
        const p = document.createElement('p');
        p.innerHTML = `
        ${details.releaseDate}
        `;
        div2.appendChild(p);
    }
    else {
        const p = document.createElement('p');
        p.innerText = 'No release date found';
        div2.appendChild(p);
    }

    const div3 = document.createElement('div');
    div3.classList.add('card-body');
    div3.innerHTML = `
        <p class="card-text my-0">${details.mainFeatures.memory}</p>
        <p class="card-text my-1">${details.mainFeatures.storage}</p>
        <p class="card-text my-1">${details.mainFeatures.displaySize}</p>
        <p class="card-text my-1">${details.mainFeatures.chipSet}</p>
        <p class="card-text my-1">${details.mainFeatures.sensors}</p>
        
    `;
    // add phone others info
    if (details.hasOwnProperty('others')) {
        const div4 = document.createElement('div');

        div4.innerHTML = `
            <p class="card-text my-0">${details.others.WLAN}</p>
            <p class="card-text my-0"> ${details.others.Bluetooth}</p>
            <p class="card-text my-0">${details.others.USB}</p>
            <p class="card-text my-0">GPS - ${details.others.GPS}</p>
            <p class="card-text my-0">Radio - ${details.others.Radio}</p>
            <p class="card-text">NFC - ${details.others.NFC}</p>
            
        `;
        div3.appendChild(div4);
    }

    div.appendChild(div2);
    div.appendChild(div3);
    phoneDetails.appendChild(div);
    phoneDetails.style.backgroundColor = 'rgb(231, 231, 248);';
};