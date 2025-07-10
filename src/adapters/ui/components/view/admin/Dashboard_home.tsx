import React from 'react';
import { IonIcon } from '@ionic/react';
import { cartOutline, cashOutline, peopleOutline, phonePortraitOutline } from 'ionicons/icons';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css'
import useDashboardStats from '../../../hook/useDashboardStats';

const Dashboard_Home: React.FC = () => {
    const {
        ventasHoy,
        totalPedidos,
        totalClientes,
        totalProductos,
        ventasMensuales,
        productosMasVendidos
    } = useDashboardStats();

    return (
        <div className='dashboard-home-statistics'>
            <h1 className='title-dashboard-statistics'>Menu Estadistico</h1>
            <div className='dashboard-content-container'>
                <div className='dashboard-stats-Cards'>
                    <div className='stats-item'>
                        <div className='stats-icon-change'>
                            <IonIcon className='stats-icon' icon={cashOutline} />
                        </div>
                        <p className='stats-value'>S/.{ventasHoy.toLocaleString()}</p>
                        <h3 className='stats-title'>Ventas Hoy</h3>
                    </div>
                    <div className='stats-item'>
                        <div className='stats-icon-change'>
                            <IonIcon className='stats-icon' icon={cartOutline} />
                        </div>
                        <p className='stats-value'>{totalPedidos}</p>
                        <h3 className='stats-title'>Pedidos</h3>
                    </div>
                    <div className='stats-item'>
                        <div className='stats-icon-change'>
                            <IonIcon className='stats-icon' icon={peopleOutline} />
                        </div>
                        <p className='stats-value'>{totalClientes}</p>
                        <h3 className='stats-title'>Clientes</h3>
                    </div>
                    <div className='stats-item'>
                        <div className='stats-icon-change'>
                            <IonIcon className='stats-icon' icon={phonePortraitOutline} />
                        </div>
                        <p className='stats-value'>{totalProductos}</p>
                        <h3 className='stats-title'>Productos</h3>
                    </div>
                </div>

                <div className='dashboard-diagrams-grid'>
                    <div className='statistics-diagram-BI'>
                        <h3 className='title-diagram-statistics'>Ventas Mensuales</h3>
                        <ResponsiveContainer>
                            <AreaChart data={ventasMensuales}>
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="ventas" stroke="#3B82F6" fill="#93C5FD" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className='statistics-diagram-BI'>
                        <h3 className='title-diagram-statistics'>Productos más vendidos</h3>
                        <ResponsiveContainer>
                            <BarChart data={productosMasVendidos}>
                                <XAxis dataKey="nombre" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="ventas" fill="#10B981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard_Home;