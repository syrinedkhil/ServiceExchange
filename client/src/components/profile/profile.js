import React,{Component} from "react";
import './profile.scss';
import NavbarHeader from "../navbar/navbarHeader";
import Footer from "../Footer/footer";
import { Link } from 'react-router-dom';
import { getUser, getUserAds ,clearuserAds} from "../../actions";
import { connect } from 'react-redux';


class UserProfile extends React.Component{
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  componentWillMount(){
    this.props.dispatch(getUser());
    this.props.dispatch(getUserAds()); 
  }
 
  renderUSER= (user) => (
    user.userprofile ?
    <div>
            <NavbarHeader/>
            <div>
              <div className="UserPresentation">
                  <img src={user.userprofile.image} alt="John Doe" className="profile-image"/>
                  <h1 className="tag name">{user.userprofile.name} {user.userprofile.lastname}</h1>
                  
                </div>
              <main className="MainDescription">
                <div className="Bio">
                  <h2>About</h2>
                  <ul className="AboutList">
                    <li className="AboutListItems"><i class="fa fa-map-marker" aria-hidden="true"></i> Location:{user.userprofile.location}
                    </li>
                    <li className="AboutListItems"><i class="fa fa-phone" aria-hidden="true"></i><a href="tel:0000000"> Phone Number:{user.userprofile.number}</a> 
                    </li>
                    <li className="AboutListItems"><i class="fa fa-calendar" aria-hidden="true"></i> date of birth:{user.userprofile.date}
                    </li>
                    <li className="AboutListItems"><i class="fa fa-venus-mars" aria-hidden="true"></i> Gender:{user.userprofile.gender}
                    </li>
                    <li className="AboutListItems"><i class="fa fa-envelope" aria-hidden="true"></i> <a href={`mailto:${user.userprofile.email}`}>email:{user.userprofile.email}</a>
                    </li>
                    <li className="AboutListItems"><i class="fa fa-facebook-official" aria-hidden="true"></i><a href={user.userprofile.facebook} target="_blank">  facebook</a>
                    </li>
                    <li className="AboutListItems"><i class="fa fa-linkedin-square" aria-hidden="true"></i><a href={user.userprofile.linkedin} target="_blank">  linkedIn</a>
                    </li>
                  </ul>
                  <Link to="/userUpdate"> <button className=" UpdateBio" >Edit Information</button></Link>
                </div> 
                
                
                </main>
                
              
            </div>
           
    </div>
    :null
    )
    renderUserAd= (Ads) => (
      
      Ads.userAds ?  
            Ads.userAds.map( item => (
              
              <li class="card-01">
						                 <figure class="card-container">
							                <div class="bg"></div>
                                <span class="card"><h3 tabindex="0">{item.category}</h3></span>
                                <div className="anounce-image">
                                  <img src={item.image}></img>
                                  
                                  <Link className="Details ButtonDetails" to={`/details/${item._id}`}>show more</Link><br/>
                                  <Link to={`/delete/${item._id}`}> <button className=" delete" >Delete</button></Link>
                                  <Link  to={`/form/${item._id}`}><button className=" update">Update</button></Link>

                                </div>
                                
                             </figure>
					    </li>
              
              
              
                
            ))
      :null
      )
 
    render(){
      let user=this.props.user;
      let Ads=this.props.ads;
        return(
          <div>
          <div className="MainProfile">{this.renderUSER(user)}
           <div className="Publication">
                <div class="section section-cards" data-anim-scroll-group="cards">
	                <div class="section-content">
                  <div className='button-announcement'>
                      <Link to='/form' className='Annonce ProfileAnounce'>Add an announcement</Link>
                   </div>
		                <h2 class="headline">My anouncements:</h2>
		                <div class="cards-wrapper">
			                 <ul>
					                {this.renderUserAd(Ads)}
			                  </ul>
		                </div>
	                </div>
                </div>
                
                </div>
                
          </div>
          <Footer/>
            </div>
           
         
        )
    }
}
function mapStateToProps(state){
  return {
      user:state.user,
      ads:state.ads
  }
}

export default connect(mapStateToProps)(UserProfile)