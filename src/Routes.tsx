import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Ciudades } from "./pages/Ciudades/Ciudades";
import Home from "./features/Home/Home";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import * as data from "@/assets/data/ciudades.json";
import CityPage from "@/features/CityPage/CityPage";
import Servicios from "@/pages/Servicios/Servicios";
import Contacto from "@/pages/Contacto/Contacto";
import TrabajaNosotros from "@/pages/TrabajaNosotros/TrabajaNosotros";
import NuestroCompromiso from "@/pages/NuestroCompromiso/NuestroCompromiso";
import NuestraHistoria from "./pages/NuestraHistoria/NuestraHistoria";
import PoliticasDePrivacidad from "./pages/politicas-de-privacidad/PoliticasDePrivacidad";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(5),
    },
  })
);
const Routes = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Switch>
        <Route path="/servicios" component={Servicios} exact />
        <Route path="/ciudades" component={Ciudades} exact />
        <Route path="/" component={Home} exact />
        <Route path="/contacto" component={Contacto} exact />
        <Route path="/nuestro-compromiso" component={NuestroCompromiso} exact />
        <Route path="/trabaja-con-nosotros" component={TrabajaNosotros} exact />
        <Route path="/nuestra-historia" component={NuestraHistoria} exact />
        <Route
          path="/politicas-de-privacidad"
          component={PoliticasDePrivacidad}
          exact
        />
        {data.ciudades.map((ciudad) => (
          <Route
            path={ciudad.ficha}
            render={() => (
              <CityPage
                imagen={ciudad.imagen}
                introduction={ciudad.pageData?.introduction}
                servicios={ciudad.pageData?.servicios}
              />
            )}
            exact
          />
        ))}
        {/*TODO: Check JSON Schema type validation compatibility with TypeScript */}
      </Switch>
    </Grid>
  );
};

export { Routes };
