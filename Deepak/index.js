const checkInBtn = document.getElementById('checkInBtn');
const checkOutBtn = document.getElementById('checkOutBtn');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');

// Access Camera for photo capture
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing the camera: ", err);
    });

// Get current location
function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            callback(position.coords.latitude, position.coords.longitude);
        }, error => {
            alert("Error fetching location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Capture photo
function capturePhoto() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
}

// Handle Check-In
checkInBtn.addEventListener('click', () => {
    getLocation((latitude, longitude) => {
        const photoData = capturePhoto();
        sendDataToServer('check-in', latitude, longitude, photoData);
    });
});

// Handle Check-Out
checkOutBtn.addEventListener('click', () => {
    getLocation((latitude, longitude) => {
        sendDataToServer('check-out', latitude, longitude);
    });
});

// Send data to server
function sendDataToServer(action, latitude, longitude, photoData = null) {
    const data = {
        user_id: 1, // Replace with actual user ID
        action: action,
        latitude: latitude,
        longitude: longitude,
        photo: photoData
    };

    fetch('http://localhost:5000/check-in-out', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}