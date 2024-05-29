/*
! Importaciones /////////////////////////////////////////////////////////////////////////////////////////////
* Primero, importar Meta y StoryObj para seguridad tipográfica y autocompletado en historias de TypeScript.
? A continuación, importe un componente. En este caso, el componente Botón.
*/
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Buttons";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
/*
! Meta ////////////////////////////////////////////////////////////////////////////////////////////////
* La exportación predeterminada, Meta, contiene metadatos sobre las historias de este componente. 
* El campo de título (opcional) controla dónde aparecen las historias en la barra lateral.
? title: 'Example/Button' => Button
*/
const meta = {
  title: "Example/Buttons",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

/*
! Story //////////////////////////////////////////////////////////////////////////////////////////////////
* Cada exportación con nombre es una historia. 
* Su contenido especifica cómo se renderiza la historia, además de otras opciones de configuración.
? export const Primary => Primary
*/ 
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
/*
! Args
* Args son entradas que se pasan al componente, que Storybook utiliza para renderizar el componente en diferentes estados. 
* En React, args = props. También especifican los valores de control iniciales para la historia.
? primary: true => false || true
? label: 'click' => Click
? background: 'red' => red
*/ 
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};



export const Warning: Story = {
  args: {
    primary: true,
    label: 'Delete now',
    backgroundColor: 'red',
  }
};
