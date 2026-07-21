document.addEventListener("DOMContentLoaded", function() {
    const addressForm = document.getElementById("addressForm");

    if (addressForm) {
        addressForm.addEventListener("submit", function(event) {
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

            // Validate Phone (Must not be empty, must be mostly numbers, min 10 chars)
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

            // Validate ZIP (Must not be empty, must be numbers)
            const zipRegex = /^[0-9]{4,6}$/;
            if (zip === "" || !zipRegex.test(zip)) {
                setError("group-zip");
                isValid = false;
            } else {
                removeError("group-zip");
            }

            // If not valid, prevent submission
            if (!isValid) {
                event.preventDefault();
            } else {
                // In a real app, we might save this data to localStorage or send it to a server.
                // For now, it will just submit and redirect to checkout.html as defined in the form action.
            }
        });
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
