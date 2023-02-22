import * as contrains from './Constrains';

// ACTION => REDUCER

export const all_data = (payload: any) => ({
  type: contrains.ALL_DATA,
  payload,
});

export const doc_counter = (payload: number) => ({
  type: contrains.DOC_COUNTER,
  payload,
});

export const deposit_action = (payload: string) => ({
  type: contrains.DEPOSIT,
  payload,
});
export const payment_type = (payload: string) => ({
  type: contrains.PAYMENT_TYPE,
  payload,
});
export const prepare_work_days = (payload: number) => ({
  type: contrains.PREPAREWORKDAYS,
  payload,
});
export const start_work_days = (payload: number) => ({
  type: contrains.STARTWORKDAYS,
  payload,
});
export const poduction_days = (payload: number) => ({
  type: contrains.PRODUCTOINDAYS,
  payload,
});

export const offer_contract = (payload: string[]) => ({
  type: contrains.OFFERCONTRACT,
  payload,
});

export const offer_check = (payload: string[]) => ({
  type: contrains.OFFERCHECK,
  payload,
});

export const deposit_type = (payload: string) => ({
  type: contrains.DEPOSIT_TYPE,
  payload,
});

export const period_percent = (payload: string[]) => ({
  type: contrains.PERIOD_PERCENT,
  payload,
});

export const period_thb = (payload: string[]) => ({
  type: contrains.PERIOD_THB,
  payload,
});
export const finished_day = (payload: number) => ({
  type: contrains.FINISHEDDAY,
  payload,
});
export const adjust_day = (payload: number) => ({
  type: contrains.ADJUST_DAYS,
  payload,
});
export const installed_day = (payload: number) => ({
  type: contrains.INSTALLEDDAY,
  payload,
});
export const waranty = (payload: number) => ({
  type: contrains.WARANTY,
  payload,
});
export const sign_date = (payload: string) => ({
  type: contrains.SIGN_DATE,
  payload,
});
export const servay_date = (payload: string) => ({
  type: contrains.SERVAY_DATE,
  payload,
});

export const sign_date_stamp = (payload: number) => ({
  type: contrains.SIGN_DATE_STAMP,
  payload,
});
export const servay_date_stamp = (payload: number) => ({
  type: contrains.SERVAY_DATE_STAMP,
  payload,
});

export const sign_address = (payload: string) => ({
  type: contrains.SIGN_ADDRESS,
  payload,
});

export const project_name = (payload: string) => ({
  type: contrains.PROJECT_NAME,
  payload,
});

export const client_name = (payload: string) => ({
  type: contrains.CLIENT_NAME,
  payload,
});
export const client_address = (payload: string) => ({
  type: contrains.CLIENT_ADDRESS,
  payload,
});
export const client_tel = (payload: string) => ({
  type: contrains.CLIENT_TEll,
  payload,
});
export const client_tax = (payload: string) => ({
  type: contrains.CLIENT_TAX,
  payload,
});

export const service_list = (payload: object[]) => ({
  type: contrains.ADD_SERVICES_LIST,
  payload,
});

export const start_service_list = (payload: object[]) => ({
  type: contrains.START_SERVICE_LIST,
  payload,
});
// COMPONENTS  => ACTION

export const docCounter = (payload: number) => {
  return (dispatch: any) => {
    dispatch(doc_counter(payload));
  };
};

export const allData = (payload: object) => {
  return (dispatch: any) => {
    dispatch(all_data(payload));
  };
};
// contracts-page1
export const dePosit = (payload: string) => {
  return (dispatch: any) => {
    dispatch(deposit_action(payload));
  };
};
export const paymentType = (payload: string) => {
  return (dispatch: any) => {
    dispatch(payment_type(payload));
  };
};
export const prepareWorkDays = (payload: number) => {
  return (dispatch: any) => {
    dispatch(prepare_work_days(payload));
  };
};

export const startWorkDays = (payload: number) => {
  return (dispatch: any) => {
    dispatch(start_work_days(payload));
  };
};

export const productionDays = (payload: number) => {
  return (dispatch: any) => {
    dispatch(poduction_days(payload));
  };
};

export const offerContract = (payload: string[]) => {
  return (dispatch: any) => {
    dispatch(offer_contract(payload));
  };
};

export const offerCheck = (payload: string[]) => {
  return (dispatch: any) => {
    dispatch(offer_check(payload));
  };
};

export const depositType = (payload: string) => {
  return (dispatch: any) => {
    dispatch(deposit_type(payload));
  };
};

export const periodPercent = (payload: string[]) => {
  return (dispatch: any) => {
    dispatch(period_percent(payload));
  };
};
export const periodTHB = (payload: string[]) => {
  return (dispatch: any) => {
    dispatch(period_thb(payload));
  };
};
export const finisehdDay = (payload: number) => {
  return (dispatch: any) => {
    dispatch(finished_day(payload));
  };
};
export const adjustDay = (payload: number) => {
  return (dispatch: any) => {
    dispatch(adjust_day(payload));
  };
};
export const installedDay = (payload: number) => {
  return (dispatch: any) => {
    dispatch(installed_day(payload));
  };
};
export const waranTy = (payload: number) => {
  return (dispatch: any) => {
    dispatch(waranty(payload));
  };
};
export const signDate = (payload: string) => {
  return (dispatch: any) => {
    dispatch(sign_date(payload));
  };
};
export const servayDate = (payload: string) => {
  return (dispatch: any) => {
    dispatch(servay_date(payload));
  };
};

export const signDateStamp = (payload: number) => {
  return (dispatch: any) => {
    dispatch(sign_date_stamp(payload));
  };
};
export const servayDateStamp = (payload: number) => {
  return (dispatch: any) => {
    dispatch(servay_date_stamp(payload));
  };
};

export const signAddress = (payload: string) => {
  return (dispatch: any) => {
    dispatch(sign_address(payload));
  };
};

export const projectName = (payload: string) => {
  return (dispatch: any) => {
    dispatch(project_name(payload));
  };
};
export const clientName = (payload: string) => {
  return (dispatch: any) => {
    dispatch(client_name(payload));
  };
};
export const clientAddress = (payload: string) => {
  return (dispatch: any) => {
    dispatch(client_address(payload));
  };
};
export const clientTel = (payload: string) => {
  return (dispatch: any) => {
    dispatch(client_tel(payload));
  };
};
export const clientVat = (payload: string) => {
  return (dispatch: any) => {
    dispatch(client_tax(payload));
  };
};
export const serviceList = (payload: object[]) => {
  return (dispatch: any) => {
    dispatch(service_list(payload));
  };
};

export const startServiceList = (payload: object[]) => {
  return (dispatch: any) => {
    dispatch(start_service_list(payload));
  };
};