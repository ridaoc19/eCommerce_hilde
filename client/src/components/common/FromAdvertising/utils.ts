import { RefObject, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IContextData } from "../../../hooks/useContext";
import useMediaQuery from "../../../hooks/useMediaQuery";
import useModalConfirm from "../../../hooks/useModalConfirm/useModalConfirm";
import useMutationAdvertising from "../../../hooks/useMutationAdvertising";
import { IAdvertising } from "../../../interfaces/advertising.interface";
import { RequestMapAdvertising, RouteAdvertising } from "../../../services/advertising/advertisingRequest";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import FormAdvertisingButton from "./FormAdvertisingButton";
import FormAdvertisingForm from "./FormAdvertisingForm";
import FormAdvertisingList from "./FormAdvertisingList";
import './formAdvertising.scss';

export const react = {
  useEffect,
  useState,
  RouteAdvertising
}

interface InitialStateFormAdvertising {
  change: RequestMapAdvertising[RouteAdvertising.AdvertisingCreate]['requestData'];
  error: Omit<RequestMapAdvertising[RouteAdvertising.AdvertisingCreate]['requestData'], 'image_desktop' | 'image_phone' | 'image_tablet'> & { image_desktop: string, image_phone: string, image_tablet: string };
  advertising_id: string;
  status: "save" | "edit" | "delete"
}

interface FormAdvertisingProps {
  advertising: Partial<IContextData['advertising']['advertisingContextState']>;
  location: IAdvertising.TotalLocation;
  componentMount?: RefObject<HTMLDivElement>;
  title: string
}

export type {
  FormAdvertisingProps,
  InitialStateFormAdvertising
};

export const RouterDom = {
  useLocation
}

export const Components = {
  ErrorMessage,
  FormAdvertisingButton,
  FormAdvertisingForm,
  FormAdvertisingList,
  useMutationAdvertising,
  useModalConfirm,
  useMediaQuery
}
