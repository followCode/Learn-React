import React from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';


function RenderDish({dish}){
    if(dish!=null){
      return(
          <Card key={dish.id}>
              <CardImg top width = "100%" src={dish.image} alt={dish.name} />
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


function CheckDish({dish}){
    if(dish!=null){
      return(
        <div>
          <h4>Comments</h4>
            <RenderComments comments= {dish.comments} />
        </div>
      );
    }
    else{
      return(
        <div></div>
      );
    }
}


function RenderComments({comments}){
    if(comments != null){
        var comm= comments.map((comment) => {
          var d = new Date(comment.date);
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return(
              <ListGroupItem  key ={comment.id} className="border-0">
                  <p>{comment.comment}<br/><br/>
                  -- {comment.author}, {months[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</p>
              </ListGroupItem>

            );
        });
        return(
          <ListGroup>
            {comm}
          </ListGroup>
        );
    }
    else {
      return(
        <div></div>
      );
    }
}

function DishDetail(props){
    return(
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish}/>
            </div>
            <div className="col col-md">
              <CheckDish dish={props.dish}/>
            </div>
          </div>
        </div>
    );
}

export default DishDetail;
