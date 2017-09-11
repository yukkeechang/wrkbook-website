import React from 'react';

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    const {user, isPro} = props
    if(isPro) {
      this.state = {
        phone: user.profile.phone,
        email: user.emails[0].address
      }
    } else {
        this.state = {
        phone: user.profile.phone,
        email: user.emails[0].address,
        webPage: user.profile.employerData.webPage
      }
      }
    }


  render() {
    let user = this.props.user;
    let phone = user.profile.phone;
    let email = user.emails[0].address;

    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <h5>Contact</h5>
            <div className="row">
              <div className="col s12" style={{ marginBottom: 10 }}>
                Phone number: {phone}
              </div>
              <div className="col s12">
                Email: {email}
              </div>
              {
                !this.props.isPro
                ?
                <div className="col s12">
                  Website: {this.state.webPage}
                </div>
                :
                null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}


//Social media buttons
// <div className="col s12 social-media-div">
//   <a href="https://www.facebook.com/">
//     <img
//       src="/images/facebook.png"
//       style={{ borderRadius: "50%", marginRight: 10 }}
//     />
//   </a>
//   <a href="https://www.instagram.com/">
//     <img
//       src="/images/instagram.png"
//       style={{ borderRadius: "50%" }}
//     />
//   </a>
// </div>
