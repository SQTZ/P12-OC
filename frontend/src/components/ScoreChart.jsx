import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const ScoreChart = ({ score }) => {
    const scorePercentage = score * 100;
    const data = [
        { name: 'completed', value: scorePercentage },
        { name: 'remaining', value: 100 - scorePercentage }
    ];

    return (
        <div className="chart-card score-chart">
            <h2>Score</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={80}
                        startAngle={90}
                        endAngle={450}
                    >
                        <Cell fill="#FF0000" />
                        <Cell fill="transparent" />
                    </Pie>
                    <Pie
                        data={[{ value: 100 }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={70}
                        fill="#FFFFFF"
                    />
                    <text
                        x="50%"
                        y="45%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fontSize: '26px', fontWeight: 'bold' }}
                    >
                        {scorePercentage}%
                    </text>
                    <text
                        x="50%"
                        y="55%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        style={{ fontSize: '16px', fill: '#74798C' }}
                    >
                        de votre objectif
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

ScoreChart.propTypes = {
    score: PropTypes.number.isRequired
};

export default ScoreChart; 