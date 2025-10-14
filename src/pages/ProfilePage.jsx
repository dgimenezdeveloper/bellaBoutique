import React from 'react';

const ProfilePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Mi Perfil</h1>
      <p className="mt-4">
        Esta es tu página de perfil. Solo puedes verla si has iniciado sesión.
      </p>
      {/* Aquí mostrar información del usuario, historial de pedidos, etc. */}
    </div>
  );
};

export default ProfilePage;