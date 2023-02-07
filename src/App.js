import BusinessContent from './components/BusinessContent/BusinessContent.component'

import './App.scss';

function App() {
  return (
    <div className="BusinessCustom">
      <div className="BusinessCustom__main-wrapper">
        <div className="BusinessCustom__title">Easy Turn-Key Integration</div>
        <div className="BusinessCustom__description">
          Increase job satisfaction, improve engagement, decrease burnout and lower payroll liability
          by reimagining what employees can do with their PTO.
        </div>
        <BusinessContent />
      </div>
    </div>
  );
}

export default App;
