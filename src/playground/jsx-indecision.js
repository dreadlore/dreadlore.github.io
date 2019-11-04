console.log("app is running!");

// JSX

const appObj = {
  title: 'Indecision App',
  subtitle: 'A Udemy Project',
  options: []
};

const appRoot = document.getElementById('app');

const onFormSubmit = (e) => {
  e.preventDefault();
  
  const option = e.target.elements.option.value;
  if (option) {
    appObj.options.push(option);
    e.target.elements.option.value = '';
    renderApp();
  }
};

const onRemoveAll = () => {
  appObj.options = [];
  renderApp();
};

const onMakeDecision = () => {
  const randomNum = Math.floor(Math.random() * appObj.options.length);
  const option = appObj.options[randomNum];
  // console.log(option);
};

const renderApp = () => {
  const template = (
    <div>
      <h1>{appObj.title}</h1>
      {appObj.subtitle && <p>{appObj.subtitle}</p>}
      <p>{appObj.options.length > 0 ? 'Here are your options' : 'No options'}
        </p>
      {/* <p>{appObj.options.length}
        </p> */}
      <button disabled={appObj.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={onRemoveAll}>Remove All</button>
      <ol>
        {appObj.options.map( (opt) => {
              return <li key={opt}>-> {opt}</li>
            }
          )
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text"
          name="option"
          />
        <button>Add Option</button>
        </form>    
    </div>
  );

  ReactDOM.render(template, appRoot);
};

renderApp();