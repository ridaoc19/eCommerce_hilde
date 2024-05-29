import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";
import { SvgType } from "../../../assets/icons/svgType";
import { ButtonType } from "./button.type";

const meta: Meta<typeof Button> = {
  title: "components/common/Buttons",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    id: {
      description: "ID único del botón en el DOM.",
      control: { type: "text" },
    },
    className: {
      description: "Clase CSS adicional para personalizar el estilo del botón.",
      control: { type: "text" },
    },
    text: {
      description: "Texto o componente React a mostrar dentro del botón.",
      control: { type: "text" },
    },
    disabled: {
      description: "Deshabilita el botón si está establecido en `true`.",
      control: { type: "boolean" },
    },
    handleClick: {
      description: "Función que se ejecuta cuando se hace clic en el botón.",
    },
    type: {
      description: "Estilo visual del botón.",
      control: {
        type: "select",
      },
      options: Object.values(ButtonType),
    },
    value: {
      description: "Valor asociado al botón.",
      control: { type: "text" },
    },
    svgRight: {
      description: "Tipo de icono SVG que se mostrará a la derecha del texto.",
      control: { type: "select" },
      options: Object.values(SvgType),
    },
    svgLeft: {
      description:
        "Tipo de icono SVG que se mostrará a la izquierda del texto.",
      control: { type: "select" },
      options: Object.values(SvgType),
    },
    other_attributes: {
      description:
        "Otras propiedades HTML estándar que se pueden aplicar al botón.",
      control: { type: "object" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "hola",
    id: "",
    type: ButtonType.Dark,
    handleClick: () => {},
    svgRight: SvgType.Desktop,
    svgLeft: SvgType.ArrowBottom,
  },
};
