

function useGetUserLocation() {

    const getCurrentLocation = async() => {
    return new Promise((resolve, reject) => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve(position)
                }, (error) => {
                    reject(error)
                },
                {timeout:10000}
                )
            }else{
            }
            
    })}

return {getCurrentLocation}

}

export default useGetUserLocation