import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Document, Page } from 'react-pdf/build/entry.noworker';
import MSpinner from '../../../../Shared/MSpinner';

import ViewPDF from './ViewPdf';
export default class SingleCertifcate extends Component {
  constructor(props) {
    super(props);
    this.state={
      numPages: null,
      pageNumber: 1,
    }

  }
  componentDidMount(){
    let imageThings = ReactDOM.findDOMNode(this.refs.imageCert);
    $(imageThings).ready(function(){
      $('.materialboxed').materialbox();
    });
  }


  render() {


    if (this.props.isPDF) {
        let link= "/cfs/files/pdfs/" + this.props.imageID;
      return(
        <div className="materialboxed">
          <ViewPDF className="materialboxed" linkOrData={link} width={250}/>
        </div>
      )
    }else{
        let link= "/cfs/files/images/" + this.props.imageID;
      return(
        <img ref="imageCert" className="materialboxed" style={{height:'100%',width:'100%',objectFit:'contain'}} src={link} />
      );
    }

  }
}
