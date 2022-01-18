import React, {useContext, useEffect} from 'react';
import { AppContext } from '../../../context/AppContext';

export const UserCords = () => {
    const { userCords, setUserCords } = useContext(AppContext);

    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Available");
        } else {
            console.log("Not Available");
        }
        return () => {
            // cleanup
        }
    }, [])

    
    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.watchPosition(position => {
                setUserCords({lon: position.coords.longitude, lat: position.coords.latitude});
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
            })
        }
        return () => {
            // cleanup
        }
    }, [])

    const handleUserCords = () => {
        setUserCords()
    }

    return (
        <div>
            <h1>lon: {userCords.lon}</h1>
            <h1>lat: {userCords.lat}</h1>
        </div>
    )
}
