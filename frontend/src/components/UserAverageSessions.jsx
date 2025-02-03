import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUserAverageSessions } from '../services/api';
import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

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

const UserAverageSessions = () => {
    const { id } = useParams();
    const userId = parseInt(id);
    const [sessionsData, setSessionsData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserAverageSessions(userId);
                const formattedData = data.sessions.map(session => ({
                    name: days[session.day - 1],
                    value: session.sessionLength
                }));
                setSessionsData(formattedData);
            } catch (error) {
                setError('Erreur lors de la récupération des données de sessions');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    // Vérification de l'ID valide
    if (isNaN(userId) || userId < 0) {
        return <Navigate to="/user/12/average-sessions" />;
    }

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!sessionsData) return <div>Aucune donnée de sessions trouvée</div>;

    const averageSessionLength = Math.round(
        sessionsData.reduce((acc, curr) => acc + curr.value, 0) / sessionsData.length
    );

    return (
        <div className="average-sessions-page">
            <h1>Durée moyenne des sessions</h1>
            <div className="sessions-stats">
                <div className="session-stat">
                    <h3>Durée moyenne</h3>
                    <p>{averageSessionLength} min</p>
                </div>
            </div>
            <div className="chart-container">
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
            </div>
        </div>
    );
};

export default UserAverageSessions; 