import React from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Varietals from '../../model/varietals';

const varietalSuggestions = Varietals().getVarietals().map(x => ({ label: x }));

function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {}, ref, ...other
  } = inputProps;

  return (
    <TextField
      fullWidth
      label="Varietal"
      InputProps={{
        inputRef: (node) => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => (part.highlight ? (
          <span key={String(index)} style={{ fontWeight: 500 }}>
            {part.text}
          </span>
        ) : (
          <strong key={String(index)} style={{ fontWeight: 300 }}>
            {part.text}
          </strong>
        )))}
      </div>
    </MenuItem>
  );
}


function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : varietalSuggestions.filter((suggestion) => {
      const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const styles = theme => ({
  root: {
    height: 40,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 100,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});


class VarietalsAutosuggest extends React.Component {
    state = {
      varietal: '',
      popper: '',
      suggestions: [],
    };

    handleSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value),
      });
    };

    handleSuggestionsClearRequested = () => {
      this.setState({
        suggestions: [],
      });
    };

    handleChange = name => (event, { newValue }) => {
      const { changeParentState } = this.props;
      this.setState({
        [name]: newValue,
      });
      if (name === 'varietal') {
        changeParentState(newValue);
      }
    };

    render() {
      const { classes } = this.props;
      const { varietal, suggestions } = this.state;
      const autosuggestProps = {
        renderInputComponent,
        suggestions,
        onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
      };

      return (
        <div className={classes.root}>
          <Autosuggest
            {...autosuggestProps}
            inputProps={{
              classes,
              placeholder: 'Varietal (start typing and we\'ll try to help)',
              value: varietal,
              onChange: this.handleChange('varietal'),
            }}
            theme={{
              container: classes.container,
              suggestionsContainerOpen: classes.suggestionsContainerOpen,
              suggestionsList: classes.suggestionsList,
              suggestion: classes.suggestion,
            }}
            renderSuggestionsContainer={options => (
              <Paper {...options.containerProps} square>
                {options.children}
              </Paper>
            )}
          />
        </div>
      );
    }
}


export default withStyles(styles)(VarietalsAutosuggest);
