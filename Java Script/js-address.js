document.addEventListener("DOMContentLoaded", function() {
    const addressForm = document.getElementById("addressForm");

    if (addressForm) {
        addressForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Cegah default submit
            
            let isValid = true;

            // Get form fields
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const address = document.getElementById("address").value.trim();
            const city = document.getElementById("city").value.trim();
            const zip = document.getElementById("zip").value.trim();

            // Validate Name
            if (name === "") {
                setError("group-name");
                isValid = false;
            } else {
                removeError("group-name");
            }

            // Validate Phone
            const phoneRegex = /^[0-9+\-\s]{10,}$/;
            if (phone === "" || !phoneRegex.test(phone)) {
                setError("group-phone");
                isValid = false;
            } else {
                removeError("group-phone");
            }

            // Validate Address
            if (address === "") {
                setError("group-address");
                isValid = false;
            } else {
                removeError("group-address");
            }

            // Validate City
            if (city === "") {
                setError("group-city");
                isValid = false;
            } else {
                removeError("group-city");
            }

            // Validate ZIP
            const zipRegex = /^[0-9]{4,6}$/;
            if (zip === "" || !zipRegex.test(zip)) {
                setError("group-zip");
                isValid = false;
            } else {
                removeError("group-zip");
            }

            // If valid, save to localStorage and redirect
            if (isValid) {
                const addressData = {
                    name: name,
                    phone: phone,
                    address: address,
                    city: city,
                    zip: zip
                };
                
                localStorage.setItem('shippingAddress', JSON.stringify(addressData));
                
                // Redirect back to cart
                window.location.href = 'cart.html';
            }
        });
    }

    // Pre-fill form if address exists
    const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    if (savedAddress) {
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');
        const addressInput = document.getElementById('address');
        const cityInput = document.getElementById('city');
        const zipInput = document.getElementById('zip');
        
        if (nameInput) nameInput.value = savedAddress.name || '';
        if (phoneInput) phoneInput.value = savedAddress.phone || '';
        if (addressInput) addressInput.value = savedAddress.address || '';
        if (cityInput) cityInput.value = savedAddress.city || '';
        if (zipInput) zipInput.value = savedAddress.zip || '';
    }

    function setError(groupId) {
        const group = document.getElementById(groupId);
        if (group) {
            group.classList.add("error");
        }
    }

    function removeError(groupId) {
        const group = document.getElementById(groupId);
        if (group) {
            group.classList.remove("error");
        }
    }
});