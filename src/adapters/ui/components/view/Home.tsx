import React from "react";
import { IonIcon } from '@ionic/react';
import { cartOutline, star } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
    return (
        <main className="bg-white min-h-screen text-gray-800">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white p-10 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Potencia tu día con la mejor tecnología</h1>
                <p className="text-lg md:text-xl mb-6">Explora nuestra colección de celulares y accesorios premium.</p>
                <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
                    Explorar ahora
                </button>
            </section>

            {/* Categorías */}
            <section className="py-10 px-4 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Celulares', 'Accesorios', 'Ofertas'].map((categoria) => (
                    <div key={categoria} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
                        <img
                            src={`/assets/${categoria.toLowerCase()}.jpg`}
                            alt={categoria}
                            className="w-32 h-32 object-cover mb-4 rounded-full"
                        />
                        <h2 className="text-xl font-semibold mb-2">{categoria}</h2>
                        <button className="text-blue-600 font-medium hover:underline">Ver más</button>
                    </div>
                ))}
            </section>

            {/* Productos Populares */}
            <section className="bg-gray-100 py-10 px-4 md:px-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Productos Populares</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
                            <img
                                src={`/assets/producto${i}.jpg`}
                                alt={`Producto ${i}`}
                                className="w-24 h-24 object-cover mb-4 rounded"
                            />
                            <h3 className="text-lg font-semibold">Producto {i}</h3>
                            <div className="flex items-center text-yellow-400 mb-2">
                                {Array.from({ length: 5 }).map((_, j) => (
                                    <IonIcon icon={star} key={j} />
                                ))}
                            </div>
                            <p className="text-green-600 font-bold mb-2">$199</p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                <IonIcon icon={cartOutline} className="mr-2" />
                                Añadir
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonios */}
            <section className="py-10 px-4 md:px-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Nuestros Clientes</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl shadow p-4 flex-1">
                            <p className="italic">“Excelente calidad y servicio rápido. Muy recomendable.”</p>
                            <div className="flex items-center mt-4">
                                <img
                                    src={`/assets/avatar${i}.jpg`}
                                    alt="Cliente"
                                    className="w-10 h-10 rounded-full mr-2"
                                />
                                <span className="font-medium">Cliente {i}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>© 2025 SmartStore. Todos los derechos reservados.</p>
            </footer>
        </main>
    );
};

export default Home;