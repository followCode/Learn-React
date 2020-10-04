import React , {Component} from 'react';
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDishId: null
    };
  }

  onDishSelect(dishId) {
      this.setState({ selectedDishId: dishId});
  }


  render() {
    return (
      <React.Fragment>
      <Header />
          <Menu dishes ={this.state.dishes} onClick={(dishId)=> this.onDishSelect(dishId)}/>
          <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDishId)[0]} />
      <Footer />
      </React.Fragment>
   );
  }
}

export default Main;
