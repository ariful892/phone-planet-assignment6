document.getElementById('search-btn').addEventListener('click', function () {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    searchInput.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showSearchResult(data.data));

});

const showSearchResult = phones => {

    const searchResult = document.getElementById('search-result');
    for (const phone of phones) {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mx-3">
            <img  src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
             <h5 class="card-title">${phone.phone_name}</h5>
                 <p class="card-text">${phone.brand}</p>
             </div>
             <button type="button" class="btn btn-primary w-25 text-start ms-3 mb-3">Details</button>
        </div>`;
        searchResult.appendChild(div);
    }
}