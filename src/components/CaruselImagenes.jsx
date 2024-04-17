import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

// Definir el contexto de usuario
const UserContext = React.createContext(null);

// Componente que provee el contexto
const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Realizar una solicitud HTTP con axios para obtener los datos del usuario
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
};

const UserInfo = () => {
    const userData = useContext(UserContext);

    console.log("La data es ", userData)

    return (
        <Carousel className="w-full sm:max-w-md px-10">
            <CarouselContent className = "-ml-2 md:-ml-4">
                {userData && userData.map((data, index) => (
                    <CarouselItem key={index} className = "">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    <img src={data.image} alt={data.alt} className="" />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export function CarouselDemo() {
    return (
        <UserProvider>
            <UserInfo />
        </UserProvider>
    );
}
