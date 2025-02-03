import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import { getUserAverageSessions } from '../services/api';
import PropTypes from 'prop-types';

const CustomCursor = ({ points }) => {
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

CustomCursor.propTypes = {
    points: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number
        })
    ).isRequired
};

const AverageSessions = ({ userId }) => {
    const [sessionsData, setSessionsData] = useState(null);
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserAverageSessions(userId);
                // Étendre les données sur 10 jours
                const extendedData = Array(10).fill().map((_, index) => {
                    if (index < data.sessions.length) {
                        // Pour les 7 premiers jours, utiliser les vraies données
                        return {
                            name: (index + 1).toString(),
                            value: data.sessions[index].sessionLength
                        };
                    } else {
                        // Pour les 3 derniers jours, utiliser des données simulées
                        // basées sur la moyenne des sessions existantes
                        const avgLength = Math.round(
                            data.sessions.reduce((acc, curr) => acc + curr.sessionLength, 0) / 
                            data.sessions.length
                        );
                        return {
                            name: (index + 1).toString(),
                            value: avgLength
                        };
                    }
                });
                setSessionsData(extendedData);
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

export default AverageSessions; 