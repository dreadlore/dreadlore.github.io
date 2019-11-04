console.log("Build-it-visible app running")

let visibility = false;
const toggleVisibility = () => {
  visibility = !visibility;
  renderApp();
};
// const appObj = {
//   details: false
// };

// const onOpenDetails = () => {
//   visibility ? visibility = false : visibility = true;
//   appObj.details ? appObj.details = false : appObj.details = true;
//   renderApp();
// };

const renderApp = () => {
  const jsx = (
    <div>
      <h1>Visibility Toggle App</h1>
      {/* <button onClick={onOpenDetails}
      >
        {visibility ? 'Hide Details' : 'Show Details' }
      </button>
      {appObj.details && <p>Here are details</p>} */}
      <button onClick={toggleVisibility}>
        {visibility ? 'Hide Details' : 'Show Details' }
      </button>
      {visibility && 
        <div>
          <p>Here are the details REVEALED!</p>
        </div>
      }
    </div>
  );

  ReactDOM.render(jsx, document.getElementById("app"));
};

renderApp();