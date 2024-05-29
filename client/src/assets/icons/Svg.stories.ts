import type { Meta, StoryObj } from "@storybook/react";
import Svg from "./Svg";
import _color from "../../styles/main/global/_color";
import { SvgType } from "./svgType";

const meta: Meta<typeof Svg> = {
  title: "assets/icons/Svg",
  component: Svg,
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "El tipo de icono",
      control: {
        type: "select",
      },
      options: Object.values(SvgType),
    },
    height: {
      description: "selecciona el alto",
      control: { type: "number" },
    },
    width: {
      description: "selecciona el ancho",
      control: { type: "number" },
    },
    color: {
      description: "Selecciona el color deseado",
      control: {
        type: "color",
        presetColors: Object.values(_color).reduce((acc: string[], item) => {
          Object.values(item).map((e) => {
            return (acc = [...acc, e]);
          });
          return acc;
        }, []),
        disable: false
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: SvgType.User,
    color: _color.font.font_accent,
    width: 24,
    height: 24,
  },
};
