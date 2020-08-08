import React, {useState} from 'react';
import {makeStyles, Checkbox, TextField} from "@material-ui/core";
import {CheckBoxOutlineBlank, CheckBox} from '@material-ui/icons';
import {Autocomplete} from "@material-ui/lab";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1, 1, 1),
        flex: '0 0 fit-content'
    },
    autocomplete: {
        marginTop: theme.spacing(1),
    }
}));

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

function Filters({title, value, d, size='normal'}) {
    const classes = useStyles();
    const [val, setVal] = useState('');

    const allFilters = d[`all${value}`];
    const filteredFilters = [];
    let moreCnt = 0;
    for (const optionalValue of allFilters) {
        if (optionalValue.includes(val)) {
            filteredFilters.push(optionalValue);
            moreCnt += 1;
        }
        if (moreCnt === 20) break;
    }


    return <div className={classes.root}>
        <Autocomplete
          className={classes.autocomplete}
          multiple
          options={filteredFilters}
          onChange={(e, newValue) => {d.updateFilter(value, newValue)}}
          disableCloseOnSelect
          renderOption={(option, { selected }) => (
            <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label={title} onChange={(e) => setVal(e.target.value)}/>
          )}
        />
    </div>
}

export default inject('d')(observer(Filters));
