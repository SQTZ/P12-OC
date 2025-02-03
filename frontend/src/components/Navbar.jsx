import logo from '/src/assets/logo.svg';  // Chemin absolu depuis la racine

export default function Navbar() {
    return (
        <nav>
            <img src={logo} alt="SportSee" />
            <a href="#">Accueil</a>
            <a href="#">Profil</a>
            <a href="#">Réglage</a>
            <a href="#">Communauté</a>
        </nav>
    )
}