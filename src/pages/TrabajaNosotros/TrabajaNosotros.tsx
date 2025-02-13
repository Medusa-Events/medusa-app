import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { Container, Button, Grid, Typography } from "@mui/material";
import * as yup from "yup";

import Box, { BoxProps } from "@mui/material/Box";

import axios from "axios";
import qs from "qs";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        p: 1,
        m: 1,
        borderRadius: 1,
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

const contactSchema = yup.object({
  nombre: yup.string().required("Es obligatorio"),
  email: yup
    .string()
    .email("Dirección de correo invalida")
    .required("Es obligatorio"),
  telefono: yup
    .string()
    .min(9, "Revise que el número esté escrito correctamente")
    .max(15, "Revise que el número esté escrito correctamente"),
  consulta: yup.string().required(),
  compania: yup.string().required(),
});
const TrabajaNosotros = () => {
  const handleSubmit = async (formValues: any) => {
    const data = {
      ...formValues,
    };

    try {
      await axios({
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url: "/",
      });
    } catch (e: any) {
      throw new Error(e);
    }
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="div" gutterBottom>
        Contacto para colaboraciones comerciales
      </Typography>

      <Box sx={{ display: "grid" }}>
        <Formik
          initialValues={{
            "bot-field": "",
            "form-name": "TrabajaConNosotros",
            nombre: "",
            email: "",
            telefono: "",
            propuesta: "",
            compania: "",
          }}
          validationSchema={contactSchema}
          onSubmit={(values) => {
            handleSubmit({ ...values });
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <Form name="trabaja-con-nosotros" data-netlify="true">
            <Field type="hidden" name="bot-field" />
            <Field type="hidden" name="form-name" />
            <Item>
              <Field
                color="secondary"
                component={TextField}
                name="nombre"
                type="text"
                label="Nombre (persona de contacto)"
                htmlFor="nombre"
                fullWidth
              />
            </Item>
            <Item>
              <Field
                component={TextField}
                name="email"
                type="email"
                label="email"
                htmlFor="email"
                fullWidth
              />
            </Item>
            <Item>
              <Field
                component={TextField}
                name="compania"
                type="text"
                label="Compañía"
                htmlFor="Compañía"
                fullWidth
              />
            </Item>
            <Item>
              <Field
                component={TextField}
                name="telefono"
                type="tel"
                label="telefono"
                htmlFor="telefono"
                fullWidth
              />
            </Item>
            <Item>
              <Field
                component={TextField}
                name="propuesta"
                type="text"
                label="propuesta"
                htmlFor="propuesta"
                multiline
                fullWidth
              />
            </Item>
            <Button type="submit">Enviar</Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default TrabajaNosotros;
