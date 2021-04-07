import { ActionTypes, Tab } from "../../actions";

export interface IChooseSidebarTab {
  tab: Tab;
}

export type ChooseSidebarTabAction = {
  type: ActionTypes.CHOOSE_SIDEBAR_TAB;
  payload: Tab;
};

export const chooseSidebarTab = ({
  tab,
}: IChooseSidebarTab): ChooseSidebarTabAction => {
  return {
    type: ActionTypes.CHOOSE_SIDEBAR_TAB,
    payload: tab,
  };
};
