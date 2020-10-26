import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}){
    if(dish!=null){
      return(
          <Card key={dish.id}>
              <CardImg top width = "100%" src={baseUrl + dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle><h5>{dish.name}</h5></CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
          </Card>
      );
    }
    else{
      return(
        <div></div>
      );
    }
}



function RenderComments({comments, addComment, dishId}){
    if(comments != null){
        var comm= comments.map((comment) => {
          var d = new Date(comment.date);
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return(
              <ListGroupItem  key ={comment.id} className="border-0">
                  <p>{comment.comment}<br/>
                  -- {comment.author}, {months[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</p>
              </ListGroupItem>

            );
        });
        return(
          <React.Fragment>
            <ListGroup>
              {comm}
            </ListGroup>
            <CommentForm dishId = {dishId} addComment = {addComment}/>
          </React.Fragment>
        );
    }
    else {
      return(
        <div></div>
      );
    }
}


class CommentForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  handleSubmit(values) {
      this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
      //event.preventDefault();
  }
  render(){
    return(
      <React.Fragment>
        <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
              <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                    <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating</Label>
                        <Col md={12}>
                          <Control.select model=".rating" id="rating" md={12}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                          </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="name" md={12}>Your Name</Label>
                        <Col md={12}>
                            <Control.text model=".name" id="name" name="name"
                                placeholder="Your Name"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".name"
                                show="touched"
                                messages={{
                                    required: 'Required ',
                                    minLength: 'Must be greater than 3 characters ',
                                    maxLength: 'Must be 15 characters or less '
                               }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment" md={12}>Comment</Label>
                        <Col md={12}>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                rows="6"
                                className="form-control" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{size:10}}>
                            <Button type="submit" color="primary">
                            Submit
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
class DishDetail extends Component{

  constructor(props){
    super(props);
 }
  render(){
    if (this.props.isLoading) {
           return(
               <div className="container">
                   <div className="row">
                       <Loading />
                   </div>
               </div>
           );
       }
       else if (this.props.errMess) {
           return(
               <div className="container">
                   <div className="row">
                       <h4>{this.props.errMess}</h4>
                   </div>
               </div>
           );
       }

      else if (this.props.dish!=null){
        return(
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={this.props.dish}/>
                </div>
                <div className="col col-md">
                  <RenderComments comments={this.props.comments}
                    addComment = {this.props.addComment}
                    dishId = {this.props.dish.id}
                  />
                </div>
              </div>
            </div>
        );
     }
  };
}

export default DishDetail;
