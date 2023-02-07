import { useState, useEffect } from "react";
import Toggle from 'react-toggle';

import "react-toggle/style.css"
import "./PartnersCard.styles.scss";

const PartnersCard = (props) => {
  const { title, subtitle, initial = false } = props;
  const [isActive, setIsActive] = useState(initial);

  useEffect(() => {
    setIsActive(initial);
  }, [initial]);

  return(
    <div className={`PartnersCard${isActive ? ' PartnersCard--active' : ''}`}>
      <div className="PartnersCard__info">
        <div className="PartnersCard__logo" />
        <div className="PartnersCard__description">
          <div className="PartnersCard__title">{title}</div>
          <div className="PartnersCard__subtitle">{subtitle}</div>
        </div>
      </div>
      <div className="PartnersCard__handler">
        <Toggle
          id={`${title}-partner-toggle`}
          checked={isActive}
          readOnly={true}
          icons={false}
          className="PartnersCard__checkbox"
        />
      </div>
    </div>
  )
};

export default PartnersCard;