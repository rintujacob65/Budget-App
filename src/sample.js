

class IndecisionApp extends React.Component {

    constructor(props) {
        super(props);
        this.handleDleteOptions = this.handleDleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDleteOption = this.handleDleteOption.bind(this);
        this.state = {
            options: []
        };
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => ({ options}))
            }
        }

        catch(e) {
            //Do noting at all
        }

       
    }
    componentDidUpdate(prevProps, prevState) {
       if(prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
       }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleDleteOptions() {
        this.setState(() => ({ options: []}));
    }

    handleDleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options:prevState.options.filter((option) => optionToRemove !== option)
        }))
    }

    handlePick() { 
        const randomNum = Math.floor(Math.random() * this.state.options.length); 
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleAddOption(option) {
        if(!option) {
            return 'Enter valid value to add item';
        }
        else if(this.state.options.indexOf(option) > -1 ) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({
            options:prevState.options.concat(option)
         }));
    }

    render() {
        const subtitle = '!!Put your life in the hands of a computer';
       
        return (
            <div>
                <Header  subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0} 
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options} 
                    handleDleteOptions={this.handleDleteOptions}
                    handleDleteOption={this.handleDleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

// IndecisionApp.defaultProps = {
//     options: []
// };

//Header Stateless Functional Component
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


// class Header extends React.Component {
//     render() {
//         return (
//             <div>
//                 <h1>  {this.props.title}  </h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }

//Action Stateless Functional Component
const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
};

// class Action extends React.Component {
//    render() {
//         return (
//             <div>
//                 <button 
//                     onClick={this.props.handlePick}
//                    disabled = {!this.props.hasOptions}
//                 >
//                         What should I do?
//                 </button>
//             </div>
//         );
//     }
// }

const Options = (props) => {
    return (
        <div>
            <button
                onClick={props.handleDleteOptions}
            >
              Remove All
            </button>

            {
                props.options.length === 0 && <p>Please add an option to get started! </p>
            }

            {
                props.options.map((option) => (
                    <Option 
                        key={option} 
                        optionText={option}
                        handleDleteOption={props.handleDleteOption}
                    />
                ))
            }
        </div>
    );
};

// class Options extends React.Component {
  
//     render() {
//         return ( 
//             <div>
//                 <button onClick={this.props.handleDleteOptions}>Remove All</button>
//                 {
//                     this.props.options.map((option) => <Option key={option} optionText={option} />)
//                 }
//             </div>
//         );
//     }

// }

const Option =(props) => {
    return(
        <div>
            {
                props.optionText
            }
            <button
                onClick={(e) => {
                    props.handleDleteOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    )
};

// class Option extends React.Component {
//     render() {
//         return (
//             <div>
//                 {this.props.optionText}
//             </div>
//         )
//     }
// }

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    
    handleAddOption(e) {
        e.preventDefault(); //form page refresh
      
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));

        if(!error) {
            e.target.elements.option.value = '' ;
        }
    }

    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

// const User = (props) => {
//     return (
//         <div>
//             <p> Name: {props.name}</p>
//             <p>Age: {props.age}</p>
//         </div>
//     );
// };

ReactDOM.render(<IndecisionApp options={['Option one','Option Two']}/>, document.getElementById('app'));