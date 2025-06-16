import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

/**
 * Composant qui affiche un graphique circulaire représentant le score de l'utilisateur
 * @param {number} score - Score entre 0 et 1 représentant la progression de l'utilisateur
 */
const ScoreChart = ({ score }) => {
    // Conversion du score en pourcentage
    const scorePercentage = score * 100;
    
    // Données pour le graphique : partie complétée et partie restante
    const data = [
        { name: 'completed', value: scorePercentage },
        { name: 'remaining', value: 100 - scorePercentage }
    ];

    return (
        <div className="chart-card score-chart">
            <h2>Score</h2>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    {/* Anneau externe représentant la progression */}
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

// Validation des props
ScoreChart.propTypes = {
    score: PropTypes.number.isRequired
};

export default ScoreChart; 