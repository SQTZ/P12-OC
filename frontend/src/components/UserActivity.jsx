import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUserActivity, getUserMainData } from '../services/api';
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import caloriesIcon from '../assets/flamme.svg';
import proteinIcon from '../assets/chicken.svg';
import carbsIcon from '../assets/apple.svg';
import fatIcon from '../assets/cheeseburger.svg';

const MacroCard = ({ icon, value, unit, type, bgColor }) => {
    return (
        <div className="macro-card">
            <div className="macro-icon" style={{ backgroundColor: bgColor }}>
                <img src={icon} alt={type} />
            </div>
            <div className="macro-info">
                <h3>{value}{unit}</h3>
                <p>{type}</p>
            </div>
        </div>
    );
};

const UserActivity = () => {
    const { id } = useParams();
    const userId = parseInt(id);
    const [activityData, setActivityData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [activityResponse, userResponse] = await Promise.all([
                    getUserActivity(userId),
                    getUserMainData(userId)
                ]);

                setActivityData(activityResponse.sessions.map((session, index) => ({
                    name: index + 1,
                    kg: session.kilogram,
                    cal: session.calories
                })));
                setUserData(userResponse);
            } catch (error) {
                setError('Erreur lors de la récupération des données');
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (isNaN(userId) || userId < 0) {
        return <Navigate to="/user/12/activity" />;
    }

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    if (!activityData || !userData) return <div>Aucune donnée trouvée</div>;

    const formatNumber = (num) => {
        return num >= 1000 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : num;
    };

    const macros = [
        {
            icon: caloriesIcon,
            value: formatNumber(userData.keyData.calorieCount),
            unit: 'kCal',
            type: 'Calories',
            bgColor: 'rgba(255, 0, 0, 0.1)'
        },
        {
            icon: proteinIcon,
            value: userData.keyData.proteinCount,
            unit: 'g',
            type: 'Protéines',
            bgColor: 'rgba(74, 184, 255, 0.1)'
        },
        {
            icon: carbsIcon,
            value: userData.keyData.carbohydrateCount,
            unit: 'g',
            type: 'Glucides',
            bgColor: 'rgba(249, 206, 35, 0.1)'
        },
        {
            icon: fatIcon,
            value: userData.keyData.lipidCount,
            unit: 'g',
            type: 'Lipides',
            bgColor: 'rgba(253, 81, 129, 0.1)'
        }
    ];

    return (
        <div className="activity-page">
            <h1>Activité Quotidienne</h1>
            <div className="activity-content">
                <div className="activity-charts">
                    <div className="daily-activity">
                        <div className="daily-activity-header">
                            <h2>Activité quotidienne</h2>
                            <div className="legend-container">
                                <div className="legend-item">
                                    <span className="legend-dot black"></span>
                                    <span>Poids (kg)</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot red"></span>
                                    <span>Calories brûlées (kCal)</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart
                                data={activityData}
                                margin={{ top: 20, right: 0, left: 40, bottom: 20 }}
                                barGap={8}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                    dataKey="name" 
                                    tickLine={false}
                                    tick={{ fill: '#9B9EAC' }}
                                    dy={15}
                                />
                                <YAxis 
                                    yAxisId="kg"
                                    orientation="right" 
                                    tickLine={false}
                                    axisLine={false}
                                    tick={{ fill: '#9B9EAC' }}
                                    dx={15}
                                />
                                <YAxis 
                                    yAxisId="cal"
                                    orientation="left" 
                                    hide={true}
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#E60000' }}
                                    itemStyle={{ color: '#FFFFFF' }}
                                    formatter={(value, name) => [value, name === 'kg' ? 'kg' : 'Kcal']}
                                    labelStyle={{ display: 'none' }}
                                />
                                <Bar 
                                    yAxisId="kg"
                                    dataKey="kg" 
                                    fill="#282D30" 
                                    radius={[50, 50, 0, 0]}
                                    barSize={7}
                                />
                                <Bar 
                                    yAxisId="cal"
                                    dataKey="cal" 
                                    fill="#E60000" 
                                    radius={[50, 50, 0, 0]}
                                    barSize={7}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="macros-section">
                    <h2>Chiffres clés</h2>
                    <div className="macros-list">
                        {macros.map((macro, index) => (
                            <MacroCard key={index} {...macro} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

MacroCard.propTypes = {
    icon: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired
};

export default UserActivity; 