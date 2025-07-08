import React from 'react';
import { IonIcon } from '@ionic/react';
import { cartOutline, cashOutline, peopleOutline, phonePortraitOutline } from 'ionicons/icons';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css'

const Dashboard_Home: React.FC = () => {
    const salesData = [
        { mes: 'Ene', ventas: 45000, pedidos: 120 },
        { mes: 'Feb', ventas: 52000, pedidos: 145 },
        { mes: 'Mar', ventas: 48000, pedidos: 135 },
        { mes: 'Abr', ventas: 61000, pedidos: 165 },
        { mes: 'May', ventas: 55000, pedidos: 150 },
        { mes: 'Jun', ventas: 67000, pedidos: 180 }
    ];

    const weeklyData = [
        { dia: 'Lun', ventas: 8500 },
        { dia: 'Mar', ventas: 12000 },
        { dia: 'Mié', ventas: 9800 },
        { dia: 'Jue', ventas: 15600 },
        { dia: 'Vie', ventas: 18200 },
        { dia: 'Sáb', ventas: 22400 },
        { dia: 'Dom', ventas: 19800 }
    ];

    return (
        <div className='dashboard-home-statistics'>
            <h1 className='title-dashboard-statistics'>Menu Estadistico</h1>
            <div className='dashboard-content-container'>
                <div className='dashboard-stats-Cards'>
                    <div className='stats-item'>
                        <div className='stats-icon-change'>
                            <IonIcon className='stats-icon' icon={cashOutline} />
                            <strong className='stats-change'>+8.2%</strong>
                        </div>
                        <p className='stats-value'>$12,540</p>
                        <h3 className='stats-title'>Ventas Hoy</h3>
                    </div>
                    <div className='stats-item'>
                        <div className='stats-icon-change'>
                            <IonIcon className='stats-icon' icon={cartOutline} />
                            <strong className='stats-change'>+12.5%</strong>
                        </div>
                        <p className='stats-value'>34</p>
                        <h3 className='stats-title'>Pedidos</h3>
                    </div>
                    <div className='stats-item'>
                        <div className='stats-icon-change'>
                            <IonIcon className='stats-icon' icon={peopleOutline} />
                            <strong className='stats-change'>+3.1%</strong>
                        </div>
                        <p className='stats-value'>1,248</p>
                        <h3 className='stats-title'>Clientes</h3>
                    </div>
                    <div className='stats-item'>
                        <div className='stats-icon-change'>
                            <IonIcon className='stats-icon' icon={phonePortraitOutline} />
                            <strong className='stats-change'>+5.8%</strong>
                        </div>
                        <p className='stats-value'>156</p>
                        <h3 className='stats-title'>Productos</h3>
                    </div>
                </div>

                <div className='dashboard-diagrams-grid'>
                    <div className='statistics-diagram-BI'>
                        <h3 className='title-diagram-statistics'>Ventas Mensuales</h3>
                        <ResponsiveContainer>
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id='colorSales' x1="0" y1="0" x2="0" y2="1">
                                        <stop offset='5%' stopColor='#3B82F6' stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="mes" stroke="#666" fontSize={12} />
                                <YAxis stroke="#666" fontSize={12} />
                                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ventas']} />
                                <Area type="monotone" dataKey="ventas" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='statistics-diagram-BI'>
                        <h3 className='title-diagram-statistics'>Productos más vendidos</h3>
                        <ResponsiveContainer>
                            <BarChart data={weeklyData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="dia" stroke="#666" fontSize={12} />
                                <YAxis stroke="#666" fontSize={12} />
                                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ventas']} />
                                <Bar dataKey="ventas" fill="#10B981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_Home;