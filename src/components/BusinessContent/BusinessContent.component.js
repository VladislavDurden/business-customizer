import { useEffect, useState } from "react";
import { usePrevious } from '../../hooks/customHooks';
import { ConnectProvider, Connect } from 'react-connect-lines';
import PartnersCard from "../PartnersCard/PartnersCard.component";

import "./BusinessContent.styles.scss";

const businessTypes = {
  small: 'Small Business',
  med: 'Medium Business',
  enter: 'Enterprise',
};

const partnersCollection = [
  {title: "Sapling", subtitle: "HR Management", group: 1, id: "partner-Sapling"},
  {title: "Workday", subtitle: "HR Management", group: 1, id: "partner-Workday"},
  {title: "Xero", subtitle: "Employers Base", group: 1, id: "partner-Xero"},
  {title: "Rippling", subtitle: "Salary Management", group: 2, id: "partner-Rippling"},
  {title: "Expensify", subtitle: "HR Management", group: 2, id: "partner-Expensify"},
  {title: "Zenefits", subtitle: "HR Management", group: 2, id: "partner-Zenefits"},
];

const BusinessContent = () => {
  const windowSizeForLines = 950;
  const [isLinesShown, setIsLinesShown] = useState(window.innerWidth > windowSizeForLines);

  const [activeType, setActiveType] = useState(businessTypes.small);
  const prevType = usePrevious(activeType);

  //default partners for different business types
  const [businessPartners, setBusinessPartners] = useState({
    [businessTypes.small]: ["partner-Zenefits"],
    [businessTypes.med]: ["partner-Expensify", "partner-Rippling"],
    [businessTypes.enter]: ["partner-Xero", "partner-Workday", "partner-Sapling"],
  });
  const [activePartners, setActivePartners] = useState(businessPartners[activeType]);

  const lineColor = (id) => activePartners.includes(id) ? "#9D71FD" : "#D7CFFD";

  const renderHeaderButtons = () =>
    Object.values(businessTypes).map((business, id) => {
      return(
        <button
          className={`BusinessContent__typeButton${business === activeType
            ? ' BusinessContent__typeButton--active'
            : ''}`}
          onClick={() => setActiveType(business)}
          key={`${business}-${id}`}
        >
          {business}
        </button>
      );
    });

  const renderCardGroup = (cardGroup, groupId) => {
    const partnersGroup = cardGroup.filter((partner) => partner.group === groupId);

    return partnersGroup.map((card) =>
      <Connect id={card.id} key={card.id}>
        <div
          className="BusinessContent__partner-card-wrapper"
          onClick={() => setActivePartners((prevPartners) => {
            activePartners.includes(card.id)
              ? prevPartners = prevPartners.filter((partnerId) => partnerId !== card.id)
              : prevPartners = [...prevPartners, card.id]
            return prevPartners;
          })}>
          <PartnersCard
            title={card.title}
            subtitle={card.subtitle}
            initial={activePartners.includes(card.id)}
          />
        </div>
      </Connect>);
  };

  // toggle lines to partners when screen changed
  useEffect(() => {
    window.onresize = () => setIsLinesShown(window.innerWidth > windowSizeForLines);
  }, []);

  // set actual cards when type of business changed
  useEffect(() => {
    setActivePartners(businessPartners[activeType]);
  }, [activeType, businessPartners]);

  // set partners for prev business when changed to prevent data loss
  useEffect(() => {
    setBusinessPartners({
      ...businessPartners,
      [prevType]: activePartners
    });
  }, [prevType, businessPartners, activePartners])

  return(
    <ConnectProvider>
      <div className="BusinessContent">
        <div className="BusinessContent__header">
          {renderHeaderButtons()}
        </div>
        <div className="BusinessContent__content-wrapper">
          <div className="BusinessContent__cards-group" id="left-group">
            {renderCardGroup(partnersCollection, 1)}
          </div>
          <Connect
            id="middle-group"
            connectWith={isLinesShown ? [
              {id: 'partner-Sapling', color: lineColor('partner-Sapling'), stroke: 'solid'},
              {id: 'partner-Workday', color: lineColor('partner-Workday'), stroke: 'solid'},
              {id: 'partner-Xero', color: lineColor('partner-Xero'), stroke: 'solid'},
              {id: 'partner-Rippling', color: lineColor('partner-Rippling'), stroke: 'solid'},
              {id: 'partner-Expensify', color: lineColor('partner-Expensify'), stroke: 'solid'},
              {id: 'partner-Zenefits', color: lineColor('partner-Zenefits'), stroke: 'solid'},
            ] : []}
          >
            <div className="BusinessContent__main-content">
              <div className="BusinessContent__main-logo" />
              <div className="BusinessContent__title">Lauren Robson</div>
              <div className="BusinessContent__subtitle">HR Director</div>
              <div className="BusinessContent__description">
                “I want to lower PTO liability and keep my employees happy. I want to lower PTO liability.”
              </div>
            </div>
          </Connect>
          <div className="BusinessContent__cards-group" id="right-group">
            {renderCardGroup(partnersCollection, 2)}
          </div>
        </div>
      </div>
    </ConnectProvider>
  );
};

export default BusinessContent;