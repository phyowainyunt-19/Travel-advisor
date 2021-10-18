import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';

const Header = ({ onLoad, onPlaceChanged }) => {
    const classes = useStyles();

    // we need to find new lat and long of the new location
    // const lat = autoComplete.getPlace().geometry.location.lat();
    // const lng = autoComplete.getPlace().geometry.location.lng();

    // we need to pass these lat and lng to App.js and change the coordinates


    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar} style={{ backgroundColor: 'grey' }}>
                <Typography variant="h5" className={classes.title}>
                    Let's Explore
                </Typography>
                {/* simply a div where you can set flex and other properties */}
                {/* <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore new places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                    </Autocomplete>
                </Box> */}
            </Toolbar>
        </AppBar>

    )
}

export default Header
