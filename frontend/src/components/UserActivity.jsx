import { useParams, Navigate } from 'react-router-dom';
import DailyActivity from './DailyActivity';
import MacrosList from './MacrosList';

/**
 * Composant UserActivity : Affiche l'activité quotidienne de l'utilisateur
 * Utilise les composants DailyActivity et MacrosList
 */
const UserActivity = () => {
    const { id } = useParams();
    const userId = parseInt(id);

    // Redirection vers un utilisateur par défaut si l'ID n'est pas valide
    if (isNaN(userId) || userId < 0) {
        return <Navigate to="/user/12/activity" />;
    }

    return (
        <div className="activity-page">
            <h1>Activité Quotidienne</h1>
            <div className="activity-content">
                <div className="activity-charts">
                    <DailyActivity userId={userId} />
                </div>
                <div className="macros-section">
                    <h2>Chiffres clés</h2>
                    <MacrosList userId={userId} />
                </div>
            </div>
        </div>
    );
};

export default UserActivity; 