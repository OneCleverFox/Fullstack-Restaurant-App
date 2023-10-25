import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useContext } from "react";
import AppContext from "./context";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

function Dishes({ restaurantId }) {
  const { addItem } = useContext(AppContext);

  const router = useRouter();

  if (restaurantId !=3) {
    // Wenn eine Restaurant-ID ausgewählt ist, führe die spezifische Abfrage aus
    const GET_RESTAURANT_DISHES = gql`
      query GetRestaurantDishes($restaurantId: ID!) {
        restaurant(id: $restaurantId) {
          data {
            attributes {
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

    const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
      variables: { restaurantId: restaurantId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const dishes = data.restaurant.data.attributes.dishes.data;

    return (
      <Row>
        {dishes.map((dish) => (
          <Col key={dish.id} xs="6" sm="4">
            <Card>
              <CardImg
                top
                style={{ height: 150, width: 150, objectFit: "cover" }}
                src={
                  dish.attributes.image.data[0].attributes.url
                    ? `${API_URL}${dish.attributes.image.data[0].attributes.url}`
                    : `${router.basePath}`
                }
              />
              <CardBody>
                <CardTitle>{dish.attributes.name}</CardTitle>
                <CardText>{dish.attributes.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  outline
                  color="primary"
                  onClick={() => addItem(dish)}
                >
                  + Add To Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  } else {
    // Wenn keine Restaurant-ID ausgewählt ist, zeige alle Gerichte von allen Restaurants
    const GET_ALL_RESTAURANTS = gql`
      query GetAllRestaurants  {
        restaurants {
          data {
            id
            attributes {
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

    const { loading, error, data } = useQuery(GET_ALL_RESTAURANTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const dishes = data.restaurants.data
      .map((res) => res.attributes.dishes.data)
      .reduce((acc, curr) => acc.concat(curr), []);

    return (
      <Row>
        {dishes.map((dish) => (
          <Col key={dish.id} xs="6" sm="4">
            <Card>
              <CardImg
                top
                style={{ height: 150, width: 150, objectFit: "cover" }}
                src={
                  dish.attributes.image.data[0].attributes.url
                    ? `${API_URL}${dish.attributes.image.data[0].attributes.url}`
                    : `${router.basePath}`
                }
              />
              <CardBody>
                <CardTitle>{dish.attributes.name}</CardTitle>
                <CardText>{dish.attributes.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  outline
                  color="primary"
                  onClick={() => addItem(dish)}
                >
                  + Add To Cart
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default Dishes;
