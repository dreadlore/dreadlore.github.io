class Indecision extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: []
    };
  }

  // LIFE-CYCLE METHODS
  // FETCHING DATA
  componentDidMount() {
    // CATCH INVALID JSON
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      // DO NADA, DON'T SET STATE IF e (ERROR)
    }  
  }
  // SAVING
  componentDidUpdate(prevProps, prevState) {
    // ONLY SAVE IF state.options CHANGES
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() {
    console.log('unmounted');
  }
  handleDeleteOption(optionToDelete) {
    // NEED THIS () W/IN ARROW FUNCTION OR ELSE return IS STATIC
    // USING SHORTHAND SYNTAX, OTHERWISE WOULD HAVE { return { ...// }}
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToDelete !== option)
    }));
  }
  handleRemoveAll() {
    this.setState((prevState) => ({ options: [] }));
    // USING FUNCTION BODY TO return
    // this.setState((prevState) => {
    //   return {
    //     options: []
    //   };
    // });
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
// BEST CODE PRACTICES
  handleAddOption(option) {
    if (!option) {
      return 'ERROR: Please enter a valid option.';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'ERROR: This option already exists! Try again.';
    }
    // BEST TO NOT MESS DIRECTLY W/ prevState, THUS DO NO USE push()
    this.setState((prevState) => (
        { options: prevState.options.concat(option) }
      ));
  }
  render() {
    const subtitle = 'Experience life in digital hands.';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options}
          handleDeleteOption={this.handleDeleteOption}
          handleRemoveAll={this.handleRemoveAll}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
};

// DO NOT NEED TO SET default IF PULLING FROM localStorage/database
// Indecision.defaultProps = {
//   options: []
// };

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
};

const Action = function(props) {
  return (
    <div>
      <button 
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >What should I do?
      </button>
    </div>
  );
};

const Options = (props) => {
    return (
      <div>
        {props.options.length === 0 && <p>Add an option to get started.</p>}
        <button onClick={props.handleRemoveAll}>Remove all</button>
        {
          props.options.map((option) => (
              <Option key={option} 
                optionText={option} 
                handleDeleteOption={props.handleDeleteOption}
              />
            )
          )
        }
      </div>
    );
};

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button 
        onClick={(e) => {
          props.handleDeleteOption(props.optionText);
        }}
      >Remove</button>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text"
            name="option"
          ></input>
          <button>Add option</button>
        </form>
      </div>
    );
  }
};

ReactDOM.render(<Indecision />, document.getElementById('app'));
// SHOVING options props INTO DEFAULT AS AN ARRAY
// ReactDOM.render(<Indecision options={['this', 'that']} />, document.getElementById('app'));