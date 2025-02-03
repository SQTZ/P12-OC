import { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { getUserPerformance } from '../services/api';
import PropTypes from 'prop-types';

const PerformanceRadar = ({ userId }) => {
    const [performanceData, setPerformanceData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserPerformance(userId);
                const formattedData = data.data.map(item => ({
                    subject: data.kind[item.kind],
                    value: item.value
                }));
                setPerformanceData(formattedData);
            } catch (error) {
                console.error('Error fetching performance data:', error);
            }
        };

        fetchData();
    }, [userId]);

    if (!performanceData) return <div>Chargement...</div>;

    return (
        <div className="chart-card performance-radar">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="65%" 
                    data={performanceData}
                >
                    <PolarGrid radialLines={false} />
                    <PolarAngleAxis 
                        dataKey="subject" 
                        tick={{ fill: '#FFFFFF', fontSize: 12 }}
                    />
                    <Radar 
                        name="Performance" 
                        dataKey="value" 
                        fill="#FF0101" 
                        fillOpacity={0.7} 
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

PerformanceRadar.propTypes = {
    userId: PropTypes.number.isRequired
};

export default PerformanceRadar; 