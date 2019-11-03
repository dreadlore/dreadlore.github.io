// visibility - render, constructor, handleToggleVisibility
// visibility - false

console.log("Build-it-visible app running")

class VisibilityToggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility: false
    };
  }

  handleToggleVisibility() {
    // USUALLY, YOU WOULD USE prevState BUT IT'S CERTAINLY FUNNIER TO USE butthole IN THIS CONTEXT (PUN INTENDED)
    this.setState((butthole) => {
      return {
        visibility: !butthole.visibility
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Visibility Toggle App</h1>
        <button onClick={this.handleToggleVisibility}>
          {this.state.visibility ? 'Hide Details' : 'Show Details' }
        </button>
        {this.state.visibility && 
          <div>
            <p>Here are the details REVEALED!</p>
          </div>
        }
      </div>
    );
  }
};
ReactDOM.render(<VisibilityToggle />, document.getElementById("app"));