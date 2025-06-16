import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import { getUserAverageSessions } from '../services/api';
import PropTypes from 'prop-types';

/**
 * Composant pour créer un curseur personnalisé qui affiche une ombre sur le graphique
 * lors du survol des données
 */
const CustomCursor = ({ points }) => {
    if (!points || points.length === 0) return null;
    
    const { x } = points[0];
    return (
        <Rectangle
            fill="#000000"
            opacity={0.1}
            x={x}
            y={0}
            width={258}
            height={263}
        />
    );
};

/**
 * Mapping des numéros de jours (1-7) vers leurs abréviations en français
 * 1 = Lundi, 2 = Mardi, etc.
 * Utilisé pour l'affichage des labels sur l'axe X du graphique
 */
const dayMapping = {
    1: 'L',
    2: 'M',
    3: 'M',
    4: 'J',
    5: 'V',
    6: 'S',
    7: 'D'
};

/**
 * Composant AverageSessions qui affiche un graphique linéaire des durées moyennes
 * des sessions d'entraînement par jour de la semaine
 * @param {number} userId - L'ID de l'utilisateur dont on veut afficher les données
 */
const AverageSessions = ({ userId }) => {
    const [sessionsData, setSessionsData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserAverageSessions(userId);
                // Transformation des données brutes en format adapté pour le graphique
                // Conversion des numéros de jours en abréviations (L, M, M, etc.)
                const formattedData = data.sessions.map(session => ({
                    name: dayMapping[session.day],
                    value: session.sessionLength
                }));
                setSessionsData(formattedData);
            } catch (error) {
                console.error('Error fetching sessions data:', error);
            }
        };

        fetchData();
    }, [userId]);

    if (!sessionsData) return <div>Chargement...</div>;

    return (
        <div className="chart-card average-sessions">
            <h2>Durée moyenne des<br />sessions</h2>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={sessionsData}
                    margin={{ top: 80, right: 15, left: 15, bottom: 15 }}
                    onMouseMove={(e) => {
                        if (e && e.activeTooltip) {
                            const chartContainer = document.querySelector('.average-sessions');
                            const tooltipX = e.activeCoordinate.x;
                            chartContainer.style.background = `linear-gradient(to right, #FF0000 ${tooltipX}px, #E60000 ${tooltipX}px)`;
                        }
                    }}
                    onMouseLeave={() => {
                        const chartContainer = document.querySelector('.average-sessions');
                        chartContainer.style.background = '#FF0000';
                    }}
                >
                    <XAxis 
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                        dy={10}
                        padding={{ left: 5, right: 5 }}
                    />
                    <YAxis 
                        hide={true}
                        domain={['dataMin - 30', 'dataMax + 30']}
                    />
                    <Tooltip
                        cursor={<CustomCursor />}
                        contentStyle={{ 
                            backgroundColor: '#FFFFFF',
                            padding: '7px'
                        }}
                        itemStyle={{ 
                            color: '#000000',
                            fontSize: '8px',
                            padding: '0'
                        }}
                        formatter={(value) => [`${value} min`]}
                        labelStyle={{ display: 'none' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="rgba(255, 255, 255, 0.6)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ 
                            r: 4, 
                            fill: '#FFFFFF',
                            strokeWidth: 8,
                            stroke: 'rgba(255, 255, 255, 0.3)'
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

AverageSessions.propTypes = {
    userId: PropTypes.number.isRequired
};

CustomCursor.propTypes = {
    points: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    )
};

export default AverageSessions; 