import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class ProfComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value:1,
    };
  }
  handleChange = (event, index, value) => this.setState({value});

  render(){
    return(
      <MuiThemeProvider>
        <div style={{display:'flex', flexDirection:'column'}}>
          <div>
            <LinearProgress mode="determinate" value='10'/>
            <h1>Select the type and number of professional(s)</h1>
          </div>
          <div style={{display:'flex', flexDirection:'row'}}>
            <div>
              <h2>Select</h2>
              <Checkbox
                label="Painter"
                id='painter'/>
              <Checkbox
                label="Demolitioner"
                id='demolitioner'/>
              <Checkbox
                label="Glazer"
                id='glazer'/>
              <Checkbox
                label="Masonry/Stone worker"
                id='masonry'/>
              <Checkbox
                label="Concrete Finisher"
                id='concrete'/>
              <Checkbox
                label="Plumber"
                id='plumber'/>
              <Checkbox
                label="Electrician"
                id='electric'/>
              <Checkbox
                label="Heat/Air Conditioning worker"
                id='ac'/>
            </div>
            <div>
              <DropDownMenu
                value={this.state.value}
                onChange={this.handleChange}
                style={{width:"200"}}
                autoWidth={false}>
                <MenuItem value={1} primaryText="1" />
                <MenuItem value={2} primaryText="2" />
                <MenuItem value={3} primaryText="3" />
                <MenuItem value={4} primaryText="4" />
                <MenuItem value={5} primaryText="5" />
                <MenuItem value={6} primaryText="6" />
                <MenuItem value={7} primaryText="7" />
                <MenuItem value={8} primaryText="8" />
                <MenuItem value={9} primaryText="9" />
              </DropDownMenu>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
