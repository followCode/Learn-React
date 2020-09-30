# Learn-React

## Installing create-react-app

npm install -g create-react-app

## Generating and Serving React Project

create-react-app project-name

npm start

## Configuring React Project to use Bootstrap

npm install bootstrap --save
npm install reactstrap --save
npm install react-popper --save

Next, open index.js file in the src folder and add the following line into the imports:

```import 'bootstrap/dist/css/bootstrap.min.css';```

## Adding a Navbar

Open App.js in the src folder and update it as follows:

```
import { Navbar, NavbarBrand } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
      </div>
    );
  }
}
```

