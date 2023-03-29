import { log } from 'console'
import React from 'react'

function useGetUserLocation() {

    const getCurrentLocation = async() => {
    return new Promise((resolve, reject) => {
            if(navigator.geolocation) {
                console.log("available")
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position)
                    resolve(position)
                }, (error) => {
                    reject(error)
                },
                {timeout:10000}
                )
            }else{
                console.log('not supported')
            }
            
    })}

return {getCurrentLocation}

}

export default useGetUserLocation