import './styles.css';

export default function HomePage() {

  return (
    <div className="homePage">
      <div className="homePage-greeting">Good afternoon Professor Thomas.</div>
      <img src="/images/pokedex-icon.png" alt="Pokedex" className="homePage-icon" />
    </div>
  );
}