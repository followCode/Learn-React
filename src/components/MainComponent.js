import React , {Component} from 'react';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders, postFeedback } from '../redux/ActionCreaters';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// this just maps the redux store's state to props
const mapStateToProps = state => {
  return {
    dishes: state.dishes, //these will be available as props in main component
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchComments : () => {dispatch(fetchComments())},
  fetchLeaders: () => {dispatch(fetchLeaders())},
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (fname, lname, telnum, email, agree, contactType, message) => dispatch(postFeedback(fname, lname, telnum, email, agree, contactType, message))
});

class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

  }

  render() {
    const HomePage =() => {
      return(
        <Home
            dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
            promosLoading={this.props.promotions.isLoading}
            promosErrMess={this.props.promotions.errMess}
            promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            leadersLoading={this.props.leaders.isLoading}
            leadersErrMess={this.props.leaders.errMess}
            leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment} />
      );
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />} />
                <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/contactus' component={() => <Contact postFeedback = {this.props.postFeedback}/>} />
                <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
   );
  }
}

// inorder to use the redux store state in this component...we need to connect them :
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
