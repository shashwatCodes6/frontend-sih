function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (res) => {
            resolve({
              latitude: res.coords.latitude,
              longitude: res.coords.longitude,
            });
          },
          (err) => {
            reject(err.message);
          }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
  
  export { getLocation };