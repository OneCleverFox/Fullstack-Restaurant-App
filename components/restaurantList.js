import { gql, useQuery } from '@apollo/client';
import Dishes from "./dishes"
import { useContext, useState } from 'react';


import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  Container,
  Row,
  Col
} from "reactstrap";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState()
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart)
  const GET_RESTAURANTS = gql`
  query {
    restaurants {
      data {
        id
        attributes {
          name
          description
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  // console.log(`Query Data: ${data.restaurants.data}`)
  


  let searchQuery = data.restaurants.data.filter((res) => {
    return res.attributes.name.toLowerCase().includes(props.search)
  }) || [];

  let restaurantId = searchQuery[0] ? searchQuery[0].id : null;

// *** debugging console logs ***
  //console.log("restaurantId from restaurantList.js : ", restaurantId);  
  //console.log("searchQuery from restaurantList.js: ", searchQuery);
  //console.log("resid:", searchQuery.map((res) => res.id));


  // defined renderer for Dishes
  const renderDishes = (restaurantId) => {
    return <Dishes restaurantId={restaurantId} search={props.search} />;
  };


  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={`http://localhost:1337${res.attributes.image.data[0].attributes.url}`}         


          />
          <CardBody>
            <CardText>{res.attributes.description}</CardText>
          </CardBody>
          <div className="card-footer">

            <Button color="info" onClick={() => setRestaurantID(res.id)}>
                  {res.attributes.name}
            </Button>

          </div>
        </Card>
      </Col>
    ))
  
    return (

      <Container>
        <Row xs='3'>
          {restList}
        </Row>

        <Row xs='3'>
        <Dishes restaurantId={restaurantId} search={props.search} />
        </Row>

      </Container>

    )
  } else {
    return <h1> No Restaurants Found</h1>
  }
}

export default RestaurantList