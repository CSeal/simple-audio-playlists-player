type TActionsCreater = (type: string) => (payload?: any) => {
  type: string,
  payload?: any
};

export const actionsCreater: TActionsCreater = type => payload => ({
  type,
  payload
});
