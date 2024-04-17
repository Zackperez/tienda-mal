import ButtonShad from '@/components/ButtonShad.jsx';
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

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
    <div className='flex flex-col gap-y-12 mt-10 items-center sm:flex-row sm:flex-wrap sm:gap-x-10 sm:justify-center'>
      {userData ? (
        userData.map((data) => (
          <div className="flex flex-col bg-white w-80 sm:min-h-[500px] justify-around sm:w-72 pb-5 gap-y-5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-sm" key={data.id}>
            <figure className='grid justify-center'>
              <a href=""><img className="max-w-60 h-56 object-contain" src={data.image} alt={data.title} /></a>
            </figure>
            <div className="grid gap-5 px-5">
              <a href=""><p className="text-lg text-start">{data.title}</p></a>
              <p className="text-xl font-sm font-semibold">${data.price}</p>  
              <div className='text-end'>
              <ButtonShad texto = "Añadir al carrito"/>
              </div>
            </div>
          </div>
        ))
      ) : (
        <img src='/loading.svg'/>
      )}
    </div>
  );
};


export default function Producto() {

  return (
    <UserProvider>
      <UserInfo />
    </UserProvider>
  )
}
