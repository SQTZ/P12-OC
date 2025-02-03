import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { getUserActivity } from '../services/api';
import PropTypes from 'prop-types';

const DailyActivity = ({ userId }) => {
    const [activityData, setActivityData] = useState(null);

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const data = await getUserActivity(userId);
                // Formater les données pour le graphique
                const formattedData = data.sessions.map((session, index) => ({
                    name: index + 1,
                    kg: session.kilogram,
                    cal: session.calories
                }));
                setActivityData(formattedData);
            } catch (error) {
                console.error('Error fetching activity data:', error);
            }
        };

        fetchActivity();
    }, [userId]);

    if (!activityData) return <div>Chargement...</div>;

    return (
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
    );
};

DailyActivity.propTypes = {
    userId: PropTypes.number.isRequired
};

export default DailyActivity; 