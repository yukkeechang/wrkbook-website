import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import MSpinner from '../../../Shared/MSpinner';

export default class ViewPDF extends Component {
  constructor(props) {
    super(props);
    this.state={
      numPages: null,
      pageNumber: 1,
      pagesTomap: [],
    }
    console.log(this.props);

  }

  onDocumentLoad = ({ numPages }) => {
    let thingz = Array(numPages).fill().map((e,i)=>i+1);

    this.setState({ numPages, pagesTomap:thingz});
  }
  onDocumentRender = () => {
      let node = ReactDOM.findDOMNode(this.refs[1]);
  }
  pageClick(e){
    console.log(e);
    let node = ReactDOM.findDOMNode(this.refs[e]);
    for (let i = 1; i <= this.state.numPages; i++) {
      let removeclass = ReactDOM.findDOMNode(this.refs[i]);
      removeclass.classList.remove('active');
    }



    node.classList.toggle('active');
    this.setState({pageNumber:e});
  }
  leftClick(e){

  }
  rightClick(e){

  }


  render() {

      return(
        <div id="viewPDF">
          <Document
            className={this.props.className}
              file={this.props.linkOrData}
              loading={<MSpinner/>}
              onLoadSuccess={this.onDocumentLoad}
            >
              <Page className={this.props.className} onRenderSuccess={this.onDocumentRender} width={this.props.width} pageNumber={this.state.pageNumber} />
          </Document>

          <div style={{width:'100%'}}className="center-align row">
          <ul className="pagination">
            <li className="waves-effect" onClick={this.leftClick.bind(this)}><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            {
              this.state.pagesTomap.map((number,index)=>{
                return (
                  <li ref={number} key={index} className="waves-effect" onClick={this.pageClick.bind(this,number)}><a href="#!">{number}</a></li>
                )
              })
            }

            <li className="waves-effect" onClick={this.rightClick.bind(this)}><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
          </div>
        </div>
      )


  }
}
