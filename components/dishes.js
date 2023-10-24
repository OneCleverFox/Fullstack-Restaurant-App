import {useRouter} from "next/router"
import {gql,useQuery} from '@apollo/client';
import {useState, useContext} from 'react'
import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col} from "reactstrap";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

function Dishes({restId, search}){
  const [restaurantID, setRestaurantID] = useState()
  const {addItem} = useContext(AppContext)



const GET_RESTAURANT_DISHES = gql`
  query{
    restaurants {
      data {
        id
        attributes {
          name
          dishes {
            data {
              id
              attributes {
                name
                description
                price
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
      }
    }
  }
`;

const router = useRouter();



  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId},
  });

console.log('restId:', restId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.restaurants || data.restaurants.data.length === 0) {
    return <p>No data found</p>;
  }

  const restaurant = data.restaurants.data.find((res) => res.id === restId);

  if (restaurant){

    return (
      <>
          {restaurant.attributes.dishes.data
  .filter((dish) => dish.attributes.name.toLowerCase().includes(search.toLowerCase()))
  .map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 150, width: 150, objectFit: 'cover' }}
                src={res.attributes.image.data[0].attributes.url
                  ? `${API_URL}${res.attributes.image.data[0].attributes.url}`
                  : `${router.basePath}`}
/>
                <CardBody>
                  <CardTitle>{res.attributes.name}</CardTitle>
                  <CardText>{res.attributes.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick = {()=> addItem(res)}
                  >
                    + Add To Cart
                  </Button>
                  
                </div>
              </Card>
            </Col>
          ))}
        </>
        )}
        
        else{
          return <h1>Select your Favorite Restaurant</h1>
        }
    }
    
    export default Dishes