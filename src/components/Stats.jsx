import Icon from './Icon.jsx';
import { Reveal } from './ui.jsx';
import { STATS } from '../data/site.js';

export default function Stats({ className = '' }) {
  return (
    <ul className={`stats ${className}`}>
      {STATS.map((s, i) => (
        <Reveal as="li" key={s.value} className="stat" delay={i * 80}>
          <Icon name={s.icon} size={28} className="stat__icon" />
          <p className="stat__value">{s.value}</p>
          <p className="stat__label">{s.label}</p>
        </Reveal>
      ))}
    </ul>
  );
}
