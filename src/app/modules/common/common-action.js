import { ACTION_COMMON } from "../../config/Constants";

export const showAndHideSidebar = (showHideNav) => {
  return {
    type: ACTION_COMMON.SHOW_HIDE_SIDEBAR,
    showHideNav
  };
};