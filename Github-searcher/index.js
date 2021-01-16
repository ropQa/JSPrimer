console.log("index.js: loaded");

/**
 * 
 * @param {*} userId : Github user ID
 */
function fetchUserInfo(userId) {
    fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
        .then(response => {
            console.log(response.status);

            // Http Error handling
            if (!response.ok) {
                console.error("Error response", response);
            } else {
                // Http OK
                return response.json().then(userInfo => {
                    console.log(userInfo);
                });
            }
        }).catch(error => {
            console.error(error);
        });
}